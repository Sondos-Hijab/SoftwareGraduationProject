const { promisify } = require("util");
const con = require("../config/config");
const multerConfig = require("../config/multerConfig");
const { getUserByField } = require("../HelperObjects/user");
const { getAdminByField } = require("../HelperObjects/admin");

const queryAsync = promisify(con.query).bind(con);

const addChatMessage = (io, socketConnections) => async (req, res) => {
  const { userName, businessName, sender } = req.body;
  const text = req.body.text || null;
  let photo = null;

  if (!businessName || !userName || !sender) {
    return res.status(400).json({
      error: "businessName, userName and sender are required fields",
      statusCode: "400",
    });
  }

  // Check if at least text or photo is provided
  if (!text && !req.file) {
    return res.status(400).json({
      error: "Either text or photo must be provided",
      statusCode: "400",
    });
  }

  // Handle photo if provided
  if (req.file) {
    photo = req.file.buffer;
  }

  try {
    // Fetch the user and admin details from the database by name
    const userResult = await getUserByField("name", userName);
    const adminResult = await getAdminByField("name", businessName);

    if (!userResult || !adminResult) {
      return res.status(404).json({
        error: "User or Business not found",
        statusCode: "404",
      });
    }

    const user_id = userResult.userID;
    const admin_id = adminResult.adminID;

    // Insert chat message into the database
    const insertResult = await queryAsync(
      "INSERT INTO chat (user_id, userName, admin_id, businessName, text, photo, sender) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user_id, userName, admin_id, businessName, text, photo, sender]
    );

    const chatID = insertResult.insertId;

    // Fetch the created_at timestamp
    const chatResult = await queryAsync(
      "SELECT created_at FROM chat WHERE chatID = ?",
      [chatID]
    );

    const created_at = chatResult[0].created_at;

    const newMessage = {
      chatID,
      user_id,
      userName,
      admin_id,
      businessName,
      text,
      photo,
      sender,
      created_at,
    };

    // Emit the new message to the specific user and business
    const userSocket = socketConnections[userName];
    const businessSocket = socketConnections[businessName];

    io.to(userSocket).emit("newChatMessage", newMessage);
    io.to(businessSocket).emit("newChatMessage", newMessage);

    return res.status(200).json({
      message: "Chat message added successfully",
      chatID,
      created_at,
      statusCode: "200",
    });
  } catch (error) {
    console.error("Error adding chat message:", error);
    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = (io, socketConnections) => [
  multerConfig.single("photo"),
  addChatMessage(io, socketConnections),
];

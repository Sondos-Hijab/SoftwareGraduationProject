const { promisify } = require("util");
const con = require("../config/config");
const multerConfig = require("../config/multerConfig");
const { getUserByField } = require("../HelperObjects/user");
const { getAdminByField } = require("../HelperObjects/admin");
const { analyzeSentiment } = require("../HelperObjects/analyzeSentiment");

const queryAsync = promisify(con.query).bind(con);
const addFeedback = (io, socketConnections) => async (req, res) => {
  const user = req.user;
  const userName = user.name;

  try {
    // Check if required fields are provided in the request
    const { businessName, text, rate1, rate2, rate3 } = req.body;
    if (!businessName || !text) {
      return res.status(400).json({
        error: "businessName, and text are required fields",
        statusCode: "400",
      });
    }

    const resultForAnalyzation = await analyzeSentiment(text);

    // Round the sentiment values to two decimal places
    const roundedSentiment = {
      neg: Number(resultForAnalyzation.neg.toFixed(2)),
      neu: Number(resultForAnalyzation.neu.toFixed(2)),
      pos: Number(resultForAnalyzation.pos.toFixed(2)),
    };

    const { neg, neu, pos } = roundedSentiment;

    // Check if a file is provided in the request
    let picture = null;
    if (req.file) {
      // 'picture' is the field name in the form-data
      picture = req.file.buffer;
    }

    // Fetch the user by name from the user table
    const userResult = await getUserByField("name", userName);

    if (!userResult) {
      return res.status(404).json({
        error: "User not found",
        statusCode: "404",
      });
    }

    const user_id = userResult.userID;

    // Fetch the admin by name from the business table
    const adminResult = await getAdminByField("name", businessName);

    if (!adminResult) {
      return res.status(404).json({
        error: "Business not found",
        statusCode: "404",
      });
    }

    const admin_id = adminResult.adminID;

    // Add the feedback to the database using queryAsync
    await queryAsync(
      "INSERT INTO feedback (userName, user_id, businessName, admin_id, text, picture, rate1, rate2, rate3, negative, positive, neutral) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userName,
        user_id,
        businessName,
        admin_id,
        text,
        picture,
        rate1,
        rate2,
        rate3,
        neg,
        pos,
        neu,
      ]
    );

    // Send socket message to admin
    const message = {
      userName,
      text,
      rate1,
      rate2,
      rate3,
      neg,
      pos,
      neu,
    };
    if (adminResult.socketId && io && socketConnections) {
      io.to(adminResult.socketId).emit("newFeedback", message);
    }

    return res.status(200).json({
      message: "Feedback added successfully",
      statusCode: "200",
    });
  } catch (error) {
    console.error("Error adding feedback:", error);
    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = (io, socketConnections) => [
  multerConfig.single("picture"),
  addFeedback(io, socketConnections),
];

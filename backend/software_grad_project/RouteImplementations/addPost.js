const { promisify } = require("util");
const con = require("../config/config");
const multerConfig = require("../config/multerConfig");
const { getAdminByField } = require("../HelperObjects/admin");

const queryAsync = promisify(con.query).bind(con);

const addPost = (io, socketConnections) => async (req, res) => {
  const user = req.user;
  const name = user.name;


  try {
    // Check if required fields are provided in the request
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({
        error: "Description is a required field",
        statusCode: "400",
      });
    }

    // Check if a file is provided in the request
    let picture = null;
    if (req.file) {
      // 'picture' is the field name in the form-data
      picture = req.file.buffer;
    }

    // Fetch the true name from the admin table
    const trueNameResult = await getAdminByField("name", name);

    const admin_id = trueNameResult.adminID;

    // Add the post to the database using queryAsync
    const result = await queryAsync(
      "INSERT INTO post (admin_id, name, description, picture) VALUES (?, ?, ?, ?)",
      [admin_id, name, description, picture]
    );

    const message = {
      admin_id,
      name,
      description,
      picture,
    };

    const postId = result.insertId; // ID of the newly inserted post

    // Emit a message to all connected users who follow the business associated with the new post
    const followersQuery = await queryAsync(
      "SELECT user_id FROM follow WHERE businessName = ? AND admin_id = ?",
      [name, admin_id]
    );

    if (followersQuery.length > 0) {
      const followersIds = followersQuery.map((follower) => follower.user_id);
      followersIds.forEach((userId) => {
        const userSocket = socketConnections[userId];
        if (userSocket && io) {
          io.to(userSocket).emit("newPost", message);
        }
      });
    }

    return res.status(200).json({
      message: "Post added successfully",
      postId,
      statusCode: "200",
    });
  } catch (error) {
    console.error("Error adding post:", error);
    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = (io, socketConnections) => [
  multerConfig.single("picture"),
  addPost(io, socketConnections),
];

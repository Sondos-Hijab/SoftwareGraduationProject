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

    if (!trueNameResult) {
      return res.status(404).json({
        error: "Admin not found",
        statusCode: "404",
      });
    }

    const admin_id = trueNameResult.adminID;

    // Add the post to the database using queryAsync
    const result = await queryAsync(
      "INSERT INTO post (admin_id, name, description, picture) VALUES (?, ?, ?, ?)",
      [admin_id, name, description, picture]
    );

    const postId = result.insertId;

    // Retrieve the newly added post details along with the business picture
    const postResult = await queryAsync(
      `SELECT post.*, business.picture AS businessPicture
       FROM post
       INNER JOIN business ON post.admin_id = business.adminID
       WHERE post.postID = ?`,
      [postId]
    );

    if (postResult.length === 0) {
      return res.status(500).json({
        error: "Post retrieval failed",
        statusCode: "500",
      });
    }

    const newPost = postResult[0];

    // Emit a message to all connected users who follow the business associated with the new post
    const followersQuery = await queryAsync(
      "SELECT userName FROM follow WHERE businessName = ? AND admin_id = ?",
      [name, admin_id]
    );

    if (followersQuery.length > 0) {
      const followerNames = followersQuery.map((follower) => follower.userName);
      followerNames.forEach((followerName) => {
        const userSocket = socketConnections[followerName];
        if (userSocket && io) {
          io.to(userSocket).emit("newPost", newPost);
        }
      });
    }

    return res.status(200).json({
      message: "Post added successfully",
      postId: newPost.postID.toString(),
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

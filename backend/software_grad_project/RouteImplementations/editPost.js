const { promisify } = require("util");
const con = require("../config/config");
const { getAdminByField } = require("../HelperObjects/admin");

const queryAsync = promisify(con.query).bind(con);

const editPost = async (req, res, next) => {
  const user = req.user;
  const { postID, description } = req.body;

  try {
    // Retrieve adminID from the business table using the adminName
    const admin = await getAdminByField("name", user.name);

    if (!admin) {
      return res.status(404).json({
        error: "Admin not found",
        statusCode: "404",
      });
    }

    // Check if the post belongs to the authenticated user
    const existingPost = await queryAsync(
      "SELECT * FROM post WHERE postID = ? AND admin_id = ?",
      [postID, admin.adminID]
    );

    // If the post does not exist or does not belong to the authenticated user
    if (existingPost.length === 0) {
      return res.status(404).json({
        error: "Post not found or does not belong to the authenticated user",
        statusCode: "404",
      });
    }

    // Update the data if description is provided in the request
    if (!description) {
      return res.status(400).json({
        error: "Description is required for updating the post",
        statusCode: "400",
      });
    }

    // Update the description in the database
    await queryAsync("UPDATE post SET description = ? WHERE postID = ? AND admin_id = ?", [
      description,
      postID,
      admin.adminID,
    ]);

    return res.status(200).json({
      message: "Post description updated successfully",
      statusCode: "200",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      statusCode: "500",
    });
  }
};

module.exports = {
  editPost,
};

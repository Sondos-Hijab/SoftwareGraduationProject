const { promisify } = require("util");
const con = require("../config/config");
const multerConfig = require("../config/multerConfig");
const { getAdminByField } = require("../HelperObjects/admin");

const queryAsync = promisify(con.query).bind(con);

const addPost = async (req, res) => {
  const user = req.user;

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
    const trueNameResult = await getAdminByField("name", user.name);

    const admin_id = trueNameResult.adminID;

    // Add the post to the database using queryAsync
    const result = await queryAsync(
      "INSERT INTO post (admin_id, name, description, picture) VALUES (?, ?, ?, ?)",
      [admin_id, user.name, description, picture]
    );

    const postId = result.insertId; // ID of the newly inserted post

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

module.exports = [multerConfig.single("picture"), addPost];

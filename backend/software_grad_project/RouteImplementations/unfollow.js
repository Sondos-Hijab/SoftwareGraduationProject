const { promisify } = require("util");
const con = require("../config/config");
const { getUserByField } = require("../HelperObjects/user");
const { getAdminByField } = require("../HelperObjects/admin");

const queryAsync = promisify(con.query).bind(con);

const unfollow = async (req, res) => {
  const user = req.user;
  const userName = user.name;

  try {
    // Check if required fields are provided in the request
    const { businessName } = req.body;
    if (!businessName) {
      return res.status(400).json({
        error: "businessName is a required field",
        statusCode: "400",
      });
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

    // Check if the follow relationship exists
    const followResult = await queryAsync(
      "SELECT * FROM follow WHERE userName = ? AND user_id = ? AND businessName = ? AND admin_id = ?",
      [userName, user_id, businessName, admin_id]
    );

    // If no follow relationship found, return an error
    if (followResult.length === 0) {
      return res.status(404).json({
        error: "Follow relationship not found",
        statusCode: "404",
      });
    }

    // Delete the follow relationship from the database using queryAsync
    await queryAsync(
      "DELETE FROM follow WHERE userName = ? AND user_id = ? AND businessName = ? AND admin_id = ?",
      [userName, user_id, businessName, admin_id]
    );

    return res.status(200).json({
      message: "Unfollow done successfully",
      statusCode: "200",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = unfollow;

const { promisify } = require("util");
const con = require("../config/config");
const { getUserByField } = require("../HelperObjects/user");
const { getAdminByField } = require("../HelperObjects/admin");

const queryAsync = promisify(con.query).bind(con);

const follow = async (req, res) => {
  const user = req.user;
  const userName = user.name;

  try {
    // Check if required fields are provided in the request
    const { businessName } = req.body; // Corrected to access businessName property
    if (!businessName) {
      return res.status(400).json({
        error: "businessName is required field",
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
    const adminResult = await getAdminByField("name", businessName); // Corrected to search by businessName

    if (!adminResult) {
      return res.status(404).json({
        error: "Business not found",
        statusCode: "404",
      });
    }

    const admin_id = adminResult.adminID;

    // Add the follow to the database using queryAsync
    await queryAsync(
      "INSERT INTO follow (userName, user_id, businessName, admin_id) VALUES (?, ?, ?, ?)",
      [userName, user_id, businessName, admin_id]
    );

    return res.status(200).json({
      message: "follow done successfully",
      statusCode: "200",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      error: "Internal server error or you already followed this business",
      statusCode: "500",
    });
  }
};

module.exports = follow;

const { getUserProfileByField } = require("../HelperObjects/profile");
const con = require('../config/config'); // Import your database connection
const { promisify } = require('util');

const queryAsync = promisify(con.query).bind(con);

const followers = async (req, res) => {
  try {
    const { businessName } = req.query;
    if (!businessName) {
      return res.status(400).json({
        error: "Business name is required in query parameters",
        statusCode: "400",
      });
    }

    // Using SQL query to fetch followers based on businessName
    const followersQuery = `
      SELECT f.userName, f.user_id, uProfile.picture
      FROM follow f
      JOIN userprofile uProfile ON f.userName = uProfile.name
      WHERE f.businessName = ?
    `;

    const followers = await queryAsync(followersQuery, [businessName]);

    return res.status(200).json({
      followers,
      message: "Followers information retrieved successfully",
      statusCode: "200",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = followers;

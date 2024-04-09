const { getUserProfileByField } = require("../HelperObjects/profile");
const con = require('../config/config'); // Import your database connection
const { promisify } = require('util');

const queryAsync = promisify(con.query).bind(con);

const following = async (req, res) => {
  try {
    const { userName } = req.query;
    if (!userName) {
      return res.status(400).json({
        error: "User name is required in query parameters",
        statusCode: "400",
      });
    }

    // Using SQL query to fetch followers based on userName
    const followersQuery = `
      SELECT f.businessName, b.picture
      FROM follow f
      JOIN business b ON f.businessName = b.name
      WHERE f.userName = ?
    `;

    const followers = await queryAsync(followersQuery, [userName]);

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

module.exports = following;

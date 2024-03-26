const { getUserProfileByField } = require("../HelperObjects/profile");
const con = require('../config/config'); // Import your database connection
const { promisify } = require('util');

const queryAsync = promisify(con.query).bind(con);

const followersNumber = async (req, res) => {
  try {
    const { businessName } = req.query;
    if (!businessName) {
      return res.status(400).json({
        error: "Business name is required in query parameters",
        statusCode: "400",
      });
    }

    // Using SQL query to count followers based on businessName
    const followersCountQuery = `
      SELECT COUNT(*) AS followerCount
      FROM follow
      WHERE businessName = ?
    `;

    const [result] = await queryAsync(followersCountQuery, [businessName]);

    // Extract the follower count from the result
    const followerCount = result ? result.followerCount : 0;

    return res.status(200).json({
      followerCount,
      message: "Number of followers retrieved successfully",
      statusCode: "200",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = followersNumber;

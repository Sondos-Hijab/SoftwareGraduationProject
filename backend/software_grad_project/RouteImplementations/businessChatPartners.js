const { promisify } = require('util');
const con = require('../config/config'); // Import your database connection

const queryAsync = promisify(con.query).bind(con);

const businessChatPartners = async (req, res) => {
  try {
    const { businessName } = req.query;
    if (!businessName) {
      return res.status(400).json({
        error: "Business name is required in query parameters",
        statusCode: "400",
      });
    }

    // Using SQL query to fetch distinct user names and their photos based on businessName
    const chatPartnersQuery = `
      SELECT DISTINCT c.userName, up.picture
      FROM chat c
      JOIN userprofile up ON c.user_id = up.user_id
      WHERE c.businessName = ?
    `;

    // Count the number of distinct chat partners
    const chatPartnersCountQuery = `
      SELECT COUNT(DISTINCT c.userName) AS numChatPartners
      FROM chat c
      WHERE c.businessName = ?
    `;

    const [chatPartners, chatPartnersCount] = await Promise.all([
      queryAsync(chatPartnersQuery, [businessName]),
      queryAsync(chatPartnersCountQuery, [businessName])
    ]);

    return res.status(200).json({
      chatPartners: {
        count: chatPartnersCount[0].numChatPartners,
        data: chatPartners
      },
      message: "Chat partners information retrieved successfully",
      statusCode: "200",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = businessChatPartners;

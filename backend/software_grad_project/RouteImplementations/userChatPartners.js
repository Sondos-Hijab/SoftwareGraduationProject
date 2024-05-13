const { promisify } = require('util');
const con = require('../config/config'); // Import your database connection

const queryAsync = promisify(con.query).bind(con);

const userChatPartners = async (req, res) => {
  try {
    const { userName } = req.query;
    if (!userName) {
      return res.status(400).json({
        error: "User name is required in query parameters",
        statusCode: "400",
      });
    }

    // Using SQL query to fetch distinct business names and their photos based on userName
    const chatPartnersQuery = `
      SELECT DISTINCT c.businessName, b.picture
      FROM chat c
      JOIN business b ON c.businessName = b.name
      WHERE c.userName = ?
    `;

    // Count the number of distinct chat partners
    const chatPartnersCountQuery = `
      SELECT COUNT(DISTINCT c.businessName) AS numChatPartners
      FROM chat c
      WHERE c.userName = ?
    `;

    const [chatPartners, chatPartnersCount] = await Promise.all([
      queryAsync(chatPartnersQuery, [userName]),
      queryAsync(chatPartnersCountQuery, [userName])
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

module.exports = userChatPartners;

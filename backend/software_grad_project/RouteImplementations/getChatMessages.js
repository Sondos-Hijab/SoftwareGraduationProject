const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const getChatMessages = async (req, res) => {
  try {
    const userName = req.query.userName; // Accessing userName from URL query string
    const businessName = req.query.businessName; // Accessing businessName from URL query string

    // Ensure userName and businessName are provided in the URL query string
    if (!userName || !businessName) {
      return res.status(400).json({
        error: 'User name and business name are required in the URL query string',
        statusCode: '400',
      });
    }

    // Fetch user profile picture
    const userProfile = await queryAsync(`
      SELECT picture
      FROM userprofile
      WHERE user_id = (
        SELECT userID
        FROM user
        WHERE name = ?
      )`, [userName]);

    // Fetch business profile picture
    const businessProfile = await queryAsync(`
      SELECT picture
      FROM business
      WHERE name = ?
    `, [businessName]);

    // Fetch all chat messages between the user and business
    const chatMessages = await queryAsync(`
      SELECT *
      FROM chat
      WHERE userName = ? AND businessName = ?
    `, [userName, businessName]);

    return res.status(200).json({
      chatMessages,
      userProfilePicture: userProfile[0]?.picture,
      businessPicture: businessProfile[0]?.picture,
      message: 'Chat messages retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = getChatMessages;

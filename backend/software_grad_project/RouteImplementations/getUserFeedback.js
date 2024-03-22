const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const getUserFeedback = async (req, res) => {
  try {
    const userName = req.query.userName; // Accessing userName from URL query string

    // Ensure userName is provided in the URL query string
    if (!userName) {
      return res.status(400).json({
        error: 'User name is required in the URL query string',
        statusCode: '400',
      });
    }

    // Fetch feedback from the database for the specified userName
    const feedback = await queryAsync(`
      SELECT feedback.*, userprofile.picture AS userProfilePicture
      FROM feedback
      INNER JOIN userprofile ON feedback.user_id = userprofile.user_id
      WHERE feedback.userName = ?`, [userName]);

    return res.status(200).json({
      feedback,
      message: 'Feedback retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = getUserFeedback;

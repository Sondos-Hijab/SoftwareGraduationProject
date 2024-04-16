const { promisify } = require('util');
const con = require('../config/config');
const { getUserByField } = require('../HelperObjects/user');

const queryAsync = promisify(con.query).bind(con);

const filterFeedbackByName = async (req, res) => {
  try {
    const { userName, businessName } = req.query; // Accessing userName and businessName from URL query string

    // Ensure userName and businessName are provided in the URL query string
    if (!userName || !businessName) {
      return res.status(400).json({
        error: 'User name and business name are required in the URL query string',
        statusCode: '400',
      });
    }

    // Check if user exists
    const user = await getUserByField('name', userName);
    if (!user) {
      return res.status(404).json({
        error: 'User not found in the database',
        statusCode: '404',
      });
    }

    // Fetch feedback from the database for the specified userName and businessName
    const feedback = await queryAsync(`
      SELECT feedback.*, userprofile.picture AS userProfilePicture
      FROM feedback
      INNER JOIN userprofile ON feedback.user_id = userprofile.user_id
      INNER JOIN business ON feedback.admin_id = business.adminID
      WHERE feedback.userName = ? AND business.name = ?`, [userName, businessName]);

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

module.exports = filterFeedbackByName;

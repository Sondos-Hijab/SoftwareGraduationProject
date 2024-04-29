const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const getBusinessFeedbackByType = async (req, res) => {
  try {
    const { businessName , type } = req.query; // Accessing name and type from URL query string

    // Ensure name and type are provided in the URL query string
    if (!businessName || !type) {
      return res.status(400).json({
        error: 'Business name and type are required in the URL query string',
        statusCode: '400',
      });
    }

    // Check if the provided type is valid (positive, negative, or neutral)
    let feedbackType = '';
    switch (type.toLowerCase()) {
      case 'positive':
        feedbackType = 'positive';
        break;
      case 'negative':
        feedbackType = 'negative';
        break;
      case 'neutral':
        feedbackType = 'neutral';
        break;
      default:
        return res.status(400).json({
          error: 'Invalid feedback type. Please specify positive, negative, or neutral.',
          statusCode: '400',
        });
    }

    // Fetch feedback from the database for the specified name and type
    const feedback = await queryAsync(`
      SELECT feedback.*, userprofile.picture AS userProfilePicture
      FROM feedback
      INNER JOIN userprofile ON feedback.user_id = userprofile.user_id
      WHERE feedback.businessName = ? AND feedback.${feedbackType} > 0.5`, [businessName]);

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

module.exports = getBusinessFeedbackByType;

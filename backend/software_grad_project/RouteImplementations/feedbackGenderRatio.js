const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const feedbackGenderRatio = async (req, res) => {
  try {
    const { businessName } = req.query;

    // Ensure businessName is provided in the URL query string
    if (!businessName) {
      return res.status(400).json({
        error: 'Business name is required in the URL query string',
        statusCode: '400',
      });
    }

    // Fetch total number of feedback entries for the specified business
    const feedbackResult = await queryAsync(`
      SELECT COUNT(*) AS totalFeedback
      FROM feedback
      WHERE businessName = ?`, [businessName]);

    const totalFeedback = feedbackResult[0].totalFeedback || 0;

    // Fetch number of male feedback entries for the specified business
    const maleFeedbackResult = await queryAsync(`
      SELECT COUNT(*) AS maleFeedback
      FROM feedback
      INNER JOIN user ON feedback.user_id = user.userID
      WHERE feedback.businessName = ? AND user.gender = 0`, [businessName]);

    const maleFeedback = maleFeedbackResult[0].maleFeedback || 0;
    const femaleFeedback = totalFeedback - maleFeedback;

    // Calculate male percentage
    const malePercentage = totalFeedback === 0 ? 0 : (maleFeedback / totalFeedback) * 100;

    // Calculate female percentage by subtracting male percentage from total percentage
    const femalePercentage = totalFeedback === 0 ? 0 : (femaleFeedback / totalFeedback) * 100;

    return res.status(200).json({
      totalFeedback,
      malePercentage,
      femalePercentage,
      message: 'Feedback percentages retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = feedbackGenderRatio;

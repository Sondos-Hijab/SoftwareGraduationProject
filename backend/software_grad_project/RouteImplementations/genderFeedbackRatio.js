const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const genderFeedbackRatio = async (req, res) => {
  try {
    const { businessName } = req.query;

    // Ensure businessName is provided in the URL query string
    if (!businessName) {
      return res.status(400).json({
        error: 'Business name is required in the URL query string',
        statusCode: '400',
      });
    }

    // Fetch total number of unique users who provided feedback for the specified business
    const totalUniqueUsersResult = await queryAsync(`
      SELECT COUNT(DISTINCT userName) AS totalUniqueUsers
      FROM feedback
      WHERE businessName = ?`, [businessName]);

    const totalUniqueUsers = totalUniqueUsersResult[0].totalUniqueUsers || 0;

    // Fetch number of unique male users who provided feedback for the specified business
    const maleFeedbackResult = await queryAsync(`
      SELECT COUNT(DISTINCT userName) AS maleFeedback
      FROM feedback
      INNER JOIN user ON feedback.user_id = user.userID
      WHERE feedback.businessName = ? AND user.gender = 0`, [businessName]);

    const maleFeedback = maleFeedbackResult[0].maleFeedback || 0;
    const femaleFeedback = totalUniqueUsers - maleFeedback;

    // Calculate male percentage
    const malePercentage = totalUniqueUsers === 0 ? 0 : (maleFeedback / totalUniqueUsers) * 100;

    // Calculate female percentage by subtracting male percentage from total percentage
    const femalePercentage = totalUniqueUsers === 0 ? 0 : (femaleFeedback / totalUniqueUsers) * 100;

    return res.status(200).json({
      totalUniqueUsers,
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

module.exports = genderFeedbackRatio;

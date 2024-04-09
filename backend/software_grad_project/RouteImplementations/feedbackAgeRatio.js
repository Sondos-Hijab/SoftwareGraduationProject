const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const feedbackAgeRatio = async (req, res) => {
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
    const totalFeedbackResult = await queryAsync(`
      SELECT COUNT(*) AS totalFeedback
      FROM feedback
      WHERE businessName = ?`, [businessName]);

    const totalFeedback = totalFeedbackResult[0].totalFeedback || 0;

    // Fetch number of feedback givers in each age group for the specified business
    const ageGroupsResult = await queryAsync(`
      SELECT
        SUM(CASE WHEN user.age < 18 THEN 1 ELSE 0 END) AS below18,
        SUM(CASE WHEN user.age >= 18 AND user.age <= 30 THEN 1 ELSE 0 END) AS age18to30,
        SUM(CASE WHEN user.age > 30 THEN 1 ELSE 0 END) AS above30
      FROM feedback
      INNER JOIN user ON feedback.user_id = user.userID
      WHERE feedback.businessName = ?`, [businessName]);

    const below18 = ageGroupsResult[0].below18 || 0;
    const age18to30 = ageGroupsResult[0].age18to30 || 0;
    const above30 = ageGroupsResult[0].above30 || 0;

    // Calculate percentages for each age group
    const below18Percentage = totalFeedback === 0 ? 0 : (below18 / totalFeedback) * 100;
    const age18to30Percentage = totalFeedback === 0 ? 0 : (age18to30 / totalFeedback) * 100;
    const above30Percentage = totalFeedback === 0 ? 0 : (above30 / totalFeedback) * 100;

    return res.status(200).json({
      below18,
      age18to30,
      above30,
      below18Percentage,
      age18to30Percentage,
      above30Percentage,
      message: 'Feedback age ratio retrieved successfully',
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

module.exports = feedbackAgeRatio;

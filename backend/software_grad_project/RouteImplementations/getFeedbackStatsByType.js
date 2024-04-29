const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const getFeedbackStatsByType = async (req, res) => {
  try {
    const { businessName } = req.query; // Accessing businessName from URL query string

    // Ensure businessName is provided in the URL query string
    if (!businessName) {
      return res.status(400).json({
        error: 'Business name is required in the URL query string',
        statusCode: '400',
      });
    }

    // Fetch feedback statistics from the database for the specified businessName
    const feedbackStats = await queryAsync(`
      SELECT 
        AVG(feedback.positive) AS averagePositive,
        AVG(feedback.negative) AS averageNegative,
        AVG(feedback.neutral) AS averageNeutral,
        COUNT(CASE WHEN feedback.positive > 0.5 THEN 1 END) AS countPositive,
        COUNT(CASE WHEN feedback.negative > 0.5 THEN 1 END) AS countNegative,
        COUNT(CASE WHEN feedback.neutral > 0.5 THEN 1 END) AS countNeutral,
        COUNT(*) AS totalCount
      FROM feedback
      WHERE feedback.businessName = ?`, [businessName]);

    return res.status(200).json({
      averagePositive: feedbackStats[0].averagePositive || 0,
      averageNegative: feedbackStats[0].averageNegative || 0,
      averageNeutral: feedbackStats[0].averageNeutral || 0,
      countPositive: feedbackStats[0].countPositive,
      countNegative: feedbackStats[0].countNegative,
      countNeutral: feedbackStats[0].countNeutral,
      totalCount: feedbackStats[0].totalCount,
      message: 'Feedback statistics retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = getFeedbackStatsByType;

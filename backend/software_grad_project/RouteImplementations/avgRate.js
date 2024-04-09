const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const avgRate = async (req, res) => {
  try {
    const { businessName, rateType, startDate, endDate } = req.query;

    // Ensure all required parameters are provided
    if (!businessName || !rateType || !startDate || !endDate) {
      return res.status(400).json({
        error: 'Business name, rate type, start date, and end date are required in the URL query string',
        statusCode: '400',
      });
    }

    // Adjust the end date by adding one day to it
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

    // Fetch average rate from the database for the specified parameters
    const result = await queryAsync(`
      SELECT AVG(${rateType}) AS averageRate
      FROM feedback
      WHERE businessName = ? 
      AND created_at >= ? 
      AND created_at < ? 
      AND ${rateType} IS NOT NULL`, [businessName, startDate, adjustedEndDate]);

    const averageRate = result[0].averageRate || 0;

    return res.status(200).json({
      averageRate,
      message: 'Average rate retrieved successfully',
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

module.exports = avgRate;

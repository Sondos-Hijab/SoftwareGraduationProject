const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const getBusinesses = async (req, res) => {
  try {
    const { name, city, country, category } = req.query;

    // Validate at least one filter is provided
    if (!name && !city && !country && !category) {
      return res.status(400).json({
        error: 'At least one filter (name, city, country, category) is required in query parameters',
        statusCode: '400',
      });
    }

    // Build the query dynamically based on the filters
    let query = 'SELECT name, picture FROM business WHERE 1=1';
    const queryParams = [];

    if (name) {
      query += ' AND LOWER(name) LIKE ?';
      queryParams.push(`%${name.toLowerCase()}%`);
    }

    if (city) {
      query += ' AND LOWER(city) = ?';
      queryParams.push(city.toLowerCase());
    }

    if (country) {
      query += ' AND LOWER(country) = ?';
      queryParams.push(country.toLowerCase());
    }

    if (category) {
      query += ' AND LOWER(category) = ?';
      queryParams.push(category.toLowerCase());
    }

    const businesses = await queryAsync(query, queryParams);

    if (businesses.length === 0) {
      return res.status(404).json({
        error: 'No businesses found matching the specified criteria',
        statusCode: '404',
      });
    }

    return res.status(200).json({
      businesses,
      message: 'Businesses retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error('Error getting businesses:', error);
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = getBusinesses;

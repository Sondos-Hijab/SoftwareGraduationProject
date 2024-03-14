const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

// Function to get businesses by search term from the database
const getBusinessesBySearch = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({
        error: 'Search term is required in query parameters',
        statusCode: '400',
      });
    }

    // Select only 'picture' and 'name' columns for exact match with search term
    const business = await queryAsync('SELECT name, picture FROM business WHERE LOWER(name) = ?', [name.toLowerCase()]);

    if (business.length === 0) {
      return res.status(404).json({
        error: `No business found for the specified term '${name}'`,
        statusCode: '404',
      });
    }

    return res.status(200).json({
      business,
      message: 'Business retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error('Error getting business by search term:', error);
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = getBusinessesBySearch;

const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

// Function to get businesses by category from the database
const getBusinessesByCategory = async (req, res) => {
  try {
    // Assuming you have the category information in your request query parameters
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({
        error: 'Category is required in query parameters',
        statusCode: '400',
      });
    }

    // Select only required columns 'name' and 'picture'
    const businesses = await queryAsync('SELECT name, picture FROM business WHERE category = ?', [category]);

    return res.status(200).json({
      businesses,
      message: 'Businesses retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error('Error getting businesses by category:', error);
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = getBusinessesByCategory;

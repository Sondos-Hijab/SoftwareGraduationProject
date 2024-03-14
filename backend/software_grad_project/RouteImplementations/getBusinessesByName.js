const { promisify } = require('util');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

// Function to get businesses by name from the database
const getBusinessesByName = async (req, res) => {
  try {
    // Assuming you have the name information in your request query parameters
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({
        error: 'Name is required in query parameters',
        statusCode: '400',
      });
    }

    // Select only 'picture' and 'name' columns
    const businesses = await queryAsync('SELECT name, picture FROM business WHERE LOWER(name) LIKE ?', [`%${name.toLowerCase()}%`]);

    if (businesses.length === 0) {
      return res.status(404).json({
        error: `No businesses found for the specified name '${name}'`,
        statusCode: '404',
      });
    }

    return res.status(200).json({
      businesses,
      message: 'Businesses retrieved successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error('Error getting businesses by name:', error);
    return res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = getBusinessesByName;

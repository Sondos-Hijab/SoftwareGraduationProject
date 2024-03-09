const { promisify } = require('util');
const con = require('../config/config');
const { getAdminByField } = require('../HelperObjects/admin');

const queryAsync = promisify(con.query).bind(con);

// Function to get all business info by name
const getAdminProfileInfo = async (req, res, next) => {
    const user = req.user;

  try {
    const existingBusinessByName = await getAdminByField('name', user.name);

    if (!existingBusinessByName) {
      return res.status(404).json({
        error: 'Business not found',
        statusCode: '404',
      });
    }

    const businessInfo = {
      name: user.name,
      location: existingBusinessByName.location,
      phoneNumber: existingBusinessByName.phoneNumber,
      category: existingBusinessByName.category,
      description: existingBusinessByName.description,
    };

    return res.status(200).json({
        businessInfo,
        statusCode: '200',
    });
  } catch (err) {
    return res.status(500).json({
      error:'Internal Server Error',
      statusCode: '500',
    });
  }
};

// Export the function directly
module.exports = getAdminProfileInfo;

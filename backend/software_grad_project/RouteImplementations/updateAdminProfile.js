const { promisify } = require('util');
const con = require('../config/config');
const { getAdminByField } = require('../HelperObjects/admin');

const queryAsync = promisify(con.query).bind(con);

const updateAdminProfile = async (req, res, next) => {
  const user = req.user;
  const { location, phoneNumber, description } = req.body;

  try {
    // Retrieve existing business information
    const existingBusinessByName = await getAdminByField("name", user.name);

    if (!existingBusinessByName) {
      return res.status(404).json({
        error: "Business not found",
        statusCode: "404",
      });
    }

    // Update the data if provided in the request
    if (location) {
      existingBusinessByName.location = location;
    }
    if (phoneNumber) {
      existingBusinessByName.phoneNumber = phoneNumber;
    }
    if (description) {
      existingBusinessByName.description = description;
    }

    // Update the data in the database
    await queryAsync(
      "UPDATE business SET location=?, phoneNumber=?, description=? WHERE name=?",
      [
        existingBusinessByName.location,
        existingBusinessByName.phoneNumber,
        existingBusinessByName.description,
        user.name,
      ]
    );

    return res.status(200).json({
      message: "Admin profile updated successfully",
      statusCode: "200",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      statusCode: "500",
    });
  }
};

module.exports = {
  updateAdminProfile,
};

const { promisify } = require('util');
const con = require('../config/config');
const multerConfig = require('../config/multerConfig');

const queryAsync = promisify(con.query).bind(con);

const addUserProfilePicture = async (req, res) => {
  const user = req.user;

  try {
    // Check if a file is provided in the request
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No profile picture provided',
        statusCode: '400',
      });
    }

    // Assuming 'profilePicture' is the field name in the form-data
    const profilePicture = req.file.buffer;

    // Update the user profile picture in the database using queryAsync
    await queryAsync('UPDATE userprofile SET picture = ? WHERE name = ?', [profilePicture, user.name]);

    return res.status(200).json({ 
      message: 'User profile picture added successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error('Error adding user profile picture:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = [multerConfig.single('profilePicture'), addUserProfilePicture];


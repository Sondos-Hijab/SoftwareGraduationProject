const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const addUserBio = async (req, res) => {

  const user = req.user;
  const { bio } = req.body;

  try {

    // Update the user bio in the database using queryAsync
    await queryAsync('UPDATE userprofile SET bio = ? WHERE name = ?', [bio, user.name]);

    return res.status(200).json({ 
      message: 'User bio added successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error('Error adding user bio:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = addUserBio;

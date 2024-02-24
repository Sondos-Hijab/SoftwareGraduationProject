const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require('../config/config');

const queryAsync = promisify(con.query).bind(con);

const resetPassword = async (req, res) => {

  const user = req.user;
  const { password, confirmPassword } = req.body;

  try {

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        error: 'Passwords do not match',
        statusCode: '400',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password in the database using queryAsync
    await queryAsync('UPDATE user SET password = ? WHERE name = ?', [hashedPassword, user.name]);

    return res.status(200).json({ 
      message: 'Password reset successfully',
      statusCode: '200',
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};

module.exports = resetPassword;

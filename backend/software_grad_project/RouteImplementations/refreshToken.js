require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require('../config/config');
const { promisify } = require('util');
const generateAccessToken = require('../HelperObjects/generateToken');
const authenticateToken  = require('../HelperObjects/checkAuth');


const queryAsync = promisify(con.query).bind(con);

const refreshToken = async (req, res) => {
  const refresh_Token = req.body.refresh_Token;

  if (!refresh_Token) {
    return res.status(401).json({
      statusCode: '401',
    }); // Unauthorized
  }

  try {
    // Use the authenticateToken middleware to verify the refresh token
    authenticateToken(req, res, async () => {
      // If authentication succeeds, continue with the refreshToken logic
      // Check if the refreshToken exists in the database
      const results = await queryAsync('SELECT * FROM refreshtoken WHERE token = ?', [refresh_Token]);

      if (results.length === 0) {
        console.log('Token not found in the database');
        return res.status(403).json({
          statusCode: '403',
          token: 'Forbidden',
        }); // Forbidden
      }

      // User information is already available in req.user due to authenticateToken middleware
      const user = req.user;

      // Generate a new access token
      const accessToken = generateAccessToken({ name: user.name });

      // Send the new access token in the response
      res.json({
        msg: 'Success new token',
        accessToken: accessToken,
        statusCode: '200',
      });
    });
  } catch (err) {
    console.error('Error in refreshToken function:', err);
    res.status(500).json({
      statusCode: '500',
    }); // Internal Server Error
  }
};

module.exports = {
  refreshToken,
};

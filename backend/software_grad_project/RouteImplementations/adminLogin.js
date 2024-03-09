require('dotenv').config();
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require('../config/config');
const { getAdminByField } = require("../HelperObjects/admin");
const  generateAccessToken  = require('../HelperObjects/generateToken');

const queryAsync = promisify(con.query).bind(con);

const util = require("util");

const adminLogin = async (req, res, next) => {
  const adminName = req.body.adminName;
  const inputPassword = req.body.password;

  try {
    const trueName = await getAdminByField('adminName', adminName);

    if (trueName) {
      const adminID = trueName.adminID;

      const passwordMatch = await bcrypt.compare(inputPassword, trueName.password);

      if (passwordMatch) {
        const user = { name: trueName.name };
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

        await queryAsync(
          'INSERT INTO refreshtoken (token, adminName, admin_id) VALUES (?, ?, ?)',
          [refreshToken, trueName.adminName, adminID]
        );

        // Send tokens in the response
        res.status(200).json({
          msg: 'Success login',
          accessToken: accessToken,
          refreshToken: refreshToken,
          statusCode: '200',
        });
      } else {
        res.status(401).json({
          error: 'Wrong password',
          statusCode: '401',
        });
      }
    } else {
      res.status(404).json({
        error: 'Admin not found',
        statusCode: '404',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal server error',
      statusCode: '500',
    });
  }
};



module.exports = {
    adminLogin,
};

require('dotenv').config();
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require('../config/config');
const { getAdminByField } = require("../HelperObjects/admin");
const generateTempAccessToken = require('../HelperObjects/generateTempToken');
const { emailContent } = require('../HelperConstants/resetPasswordEmail');
const { generateEmailContent } = require('../HelperObjects/emailContent');
const { sendingEmail } = require('../HelperObjects/sendEmail');
const generateOTP = require('../HelperObjects/generateOTP');


const queryAsync = promisify(con.query).bind(con);

const checkAdminEmail = async (req, res, next) => {
  const email = req.body.email;

  try {
    const trueEmail = await getAdminByField('email', email);

    if (trueEmail) {
      const otp = generateOTP();

      const user = { name: trueEmail.name, otp: otp };
      const tempAccessToken = generateTempAccessToken(user);

      const userData = [
        {
            adminName: trueEmail.adminName,
            businessName: trueEmail.name,
            OTP: otp,
        },
      ];
      // Generate registration email content
      const resetPasswordEmailContent = generateEmailContent(userData,emailContent.resetPassword);
  
      // Send registration email
      await sendingEmail(email, 'Reset Password', resetPasswordEmailContent);


      // Send tokens in the response
      res.status(200).json({
        msg: 'Email verified successfully',
        ps: 'Kindly review your email for the purpose of email verification within the next 3 minutes.',
        tempAccessToken: tempAccessToken, 
        statusCode: '200',
      });
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
    checkAdminEmail, 
};

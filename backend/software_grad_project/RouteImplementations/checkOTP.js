require("dotenv").config();
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkOTP = async (req, res, next) => {
  const user = req.user;
  const { otp } = req.body;

  try {
    if (otp !== user.otp) {
      return res.status(400).json({
        error: "Invalid OTP",
        statusCode: "400",
      });
    }

    return res.status(200).json({
      message: "Valid OTP",
      statusCode: "200",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = {
  checkOTP,
};

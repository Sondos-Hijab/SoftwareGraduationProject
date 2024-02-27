require("dotenv").config();
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const con = require("../config/config");
const { getUserProfileByField } = require("../HelperObjects/profile");

const getUserBio = async (req, res, next) => {
  const user = req.user;

  try {
    const trueProfile = await getUserProfileByField("name", user.name);

    if (trueProfile) {
      const userBio = trueProfile.bio;

      res.status(200).json({
        Bio: userBio,
        statusCode: "200",
      });
    }
  } catch (error) {

    return res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = {
  getUserBio,
};

require("dotenv").config();
const { promisify } = require("util");

const checkAuthenticationToken = async (req, res, next) => {
  try {
    // Send tokens in the response
    res.status(200).json({
      msg: "valid token",
      statusCode: "200",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
      statusCode: "500",
    });
  }
};

module.exports = {
    checkAuthenticationToken,
};

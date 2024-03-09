require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateTempAccessToken = user => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });

module.exports = generateTempAccessToken;

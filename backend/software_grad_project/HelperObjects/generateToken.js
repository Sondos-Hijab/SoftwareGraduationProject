require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateAccessToken = user => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });

module.exports = generateAccessToken;

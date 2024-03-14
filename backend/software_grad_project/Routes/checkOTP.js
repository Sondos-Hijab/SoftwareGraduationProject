const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const { checkOTP }  = require('../RouteImplementations/checkOTP');

router.post('/user/checkOTP', authenticateToken, checkOTP);

module.exports = router;


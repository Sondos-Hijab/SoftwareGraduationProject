const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const { checkOTP }  = require('../RouteImplementations/checkOTP');

router.get('/user/checkOTP', authenticateToken, checkOTP);

module.exports = router;


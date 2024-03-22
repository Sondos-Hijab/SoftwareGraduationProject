const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getUserInfo = require('../RouteImplementations/getUserInfo');

router.get('/user/getUserInfo', authenticateToken, getUserInfo);

module.exports = router;

const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const avgRate = require('../RouteImplementations/avgRate');

router.get('/user/avgRate', authenticateToken, avgRate);

module.exports = router;

const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const followAgeRatio = require('../RouteImplementations/followAgeRatio');

router.get('/user/followAgeRatio', authenticateToken, followAgeRatio);

module.exports = router;

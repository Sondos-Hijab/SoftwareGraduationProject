const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const feedbackAgeRatio = require('../RouteImplementations/feedbackAgeRatio');

router.get('/user/feedbackAgeRatio', authenticateToken, feedbackAgeRatio);

module.exports = router;

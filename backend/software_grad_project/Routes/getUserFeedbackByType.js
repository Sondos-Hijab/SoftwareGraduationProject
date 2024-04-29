const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getUserFeedbackByType = require('../RouteImplementations/getUserFeedbackByType');

router.get('/user/getUserFeedbackByType', authenticateToken, getUserFeedbackByType);

module.exports = router;

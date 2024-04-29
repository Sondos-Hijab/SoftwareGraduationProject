const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getFeedbackStatsByType = require('../RouteImplementations/getFeedbackStatsByType');

router.get('/user/getFeedbackStatsByType', authenticateToken, getFeedbackStatsByType);

module.exports = router;

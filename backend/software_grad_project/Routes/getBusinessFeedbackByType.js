const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getBusinessFeedbackByType = require('../RouteImplementations/getBusinessFeedbackByType');

router.get('/user/getBusinessFeedbackByType', authenticateToken, getBusinessFeedbackByType);

module.exports = router;

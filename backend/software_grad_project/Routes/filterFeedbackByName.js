const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const  filterFeedbackByName  = require('../RouteImplementations/filterFeedbackByName');

router.get('/user/filterFeedbackByName', authenticateToken, filterFeedbackByName);

module.exports = router;

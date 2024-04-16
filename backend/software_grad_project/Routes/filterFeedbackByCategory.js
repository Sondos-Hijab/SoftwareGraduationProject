const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const  filterFeedbackByCategory  = require('../RouteImplementations/filterFeedbackByCategory');

router.get('/user/filterFeedbackByCategory', authenticateToken, filterFeedbackByCategory);

module.exports = router;

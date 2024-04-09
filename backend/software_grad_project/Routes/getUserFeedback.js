const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getUserFeedback = require('../RouteImplementations/getUserFeedback');

router.get('/user/getUserFeedback', authenticateToken, getUserFeedback);

module.exports = router;

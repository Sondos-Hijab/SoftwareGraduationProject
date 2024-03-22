const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getBusinessFeedback = require('../RouteImplementations/getBusinessFeedback');

router.get('/user/getBusinessFeedback', authenticateToken, getBusinessFeedback);

module.exports = router;

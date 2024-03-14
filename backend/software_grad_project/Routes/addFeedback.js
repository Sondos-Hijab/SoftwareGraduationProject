const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const addFeedback = require('../RouteImplementations/addFeedback');

router.post('/user/addFeedback', authenticateToken, addFeedback);

module.exports = router;




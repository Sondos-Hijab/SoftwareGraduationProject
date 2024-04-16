const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const genderFeedbackRatio = require('../RouteImplementations/genderFeedbackRatio');

router.get('/user/genderFeedbackRatio', authenticateToken, genderFeedbackRatio);

module.exports = router;

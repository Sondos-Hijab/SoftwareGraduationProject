const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const feedbackGenderRatio = require('../RouteImplementations/feedbackGenderRatio');

router.get('/user/feedbackGenderRatio', authenticateToken, feedbackGenderRatio);

module.exports = router;

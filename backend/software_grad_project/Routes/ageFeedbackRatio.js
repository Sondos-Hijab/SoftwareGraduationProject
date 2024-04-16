const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const ageFeedbackRatio = require('../RouteImplementations/ageFeedbackRatio');

router.get('/user/ageFeedbackRatio', authenticateToken, ageFeedbackRatio);

module.exports = router;

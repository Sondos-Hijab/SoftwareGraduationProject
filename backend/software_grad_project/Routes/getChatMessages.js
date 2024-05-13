const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getChatMessages = require('../RouteImplementations/getChatMessages');

router.get('/user/getChatMessages', authenticateToken, getChatMessages);

module.exports = router;

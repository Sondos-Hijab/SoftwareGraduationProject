const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const businessChatPartners = require('../RouteImplementations/businessChatPartners');

router.get('/user/businessChatPartners', authenticateToken, businessChatPartners);

module.exports = router;

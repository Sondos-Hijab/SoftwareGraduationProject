const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const userChatPartners = require('../RouteImplementations/userChatPartners');

router.get('/user/userChatPartners', authenticateToken, userChatPartners);

module.exports = router;

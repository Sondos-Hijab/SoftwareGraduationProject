const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const addChatMessage = require('../RouteImplementations/addChatMessage');

router.post('/user/addChatMessage', authenticateToken, addChatMessage);

module.exports = router;




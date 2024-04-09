const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const unfollow = require('../RouteImplementations/unfollow');

router.delete('/user/unfollow', authenticateToken, unfollow);

module.exports = router;

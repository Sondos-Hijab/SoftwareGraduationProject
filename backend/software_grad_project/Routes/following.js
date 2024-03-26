const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const  following  = require('../RouteImplementations/following');

router.get('/user/following', authenticateToken, following);

module.exports = router;

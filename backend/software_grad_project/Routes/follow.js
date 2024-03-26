const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const follow = require('../RouteImplementations/follow');

router.post('/user/follow', authenticateToken, follow);

module.exports = router;




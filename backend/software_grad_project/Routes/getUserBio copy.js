const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const { getUserBio }  = require('../RouteImplementations/getUserBio');

router.get('/user/getUserBio', authenticateToken, getUserBio);

module.exports = router;


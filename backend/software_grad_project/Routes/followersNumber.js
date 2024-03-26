const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const  followersNumber  = require('../RouteImplementations/followersNumber');

router.get('/user/followersNumber', authenticateToken, followersNumber);

module.exports = router;

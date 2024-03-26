const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const  followers  = require('../RouteImplementations/followers');

router.get('/user/followers', authenticateToken, followers);

module.exports = router;

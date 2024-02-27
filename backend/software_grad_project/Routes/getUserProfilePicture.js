const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const  getUserProfilePicture  = require('../RouteImplementations/getUserProfilePicture');

router.get('/user/getUserProfilePicture', authenticateToken, getUserProfilePicture);

module.exports = router;

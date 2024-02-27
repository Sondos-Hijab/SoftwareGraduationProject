const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const addUserProfilePicture = require('../RouteImplementations/addUserProfilePicture');

router.put('/user/addUserProfilePicture', authenticateToken, addUserProfilePicture);

module.exports = router;




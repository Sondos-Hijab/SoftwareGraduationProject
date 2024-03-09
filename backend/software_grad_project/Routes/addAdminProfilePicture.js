const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const addAdminProfilePicture = require('../RouteImplementations/addAdminProfilePicture');

router.put('/user/addAdminProfilePicture', authenticateToken, addAdminProfilePicture);

module.exports = router;




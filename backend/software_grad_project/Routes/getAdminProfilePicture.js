const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const  getAdminProfilePicture  = require('../RouteImplementations/getAdminProfilePicture');

router.get('/user/getAdminProfilePicture', authenticateToken, getAdminProfilePicture);

module.exports = router;

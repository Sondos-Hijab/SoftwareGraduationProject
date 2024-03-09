const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const  getAdminProfileInfo  = require('../RouteImplementations/getAdminProfileInfo');

router.get('/user/getAdminProfileInfo', authenticateToken, getAdminProfileInfo);

module.exports = router;

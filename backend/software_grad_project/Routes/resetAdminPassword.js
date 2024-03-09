const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const resetAdminPassword  = require('../RouteImplementations/resetAdminPassword');

router.put('/user/resetAdminPassword', authenticateToken, resetAdminPassword);

module.exports = router;


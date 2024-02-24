const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const resetPassword  = require('../RouteImplementations/resetPassword');

router.put('/user/resetPassword', authenticateToken, resetPassword);

module.exports = router;


const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const { logout } = require('../RouteImplementations/logout');

router.delete('/user/logout', authenticateToken, logout);

module.exports = router;

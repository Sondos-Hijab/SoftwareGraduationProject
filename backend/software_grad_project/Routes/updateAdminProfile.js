const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const { updateAdminProfile }  = require('../RouteImplementations/updateAdminProfile');

router.put('/user/updateAdminProfile', authenticateToken, updateAdminProfile);

module.exports = router;


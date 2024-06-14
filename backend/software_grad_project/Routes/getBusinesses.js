const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getBusinesses = require('../RouteImplementations/getBusinesses');

router.get('/user/getBusinesses', authenticateToken, getBusinesses);

module.exports = router;

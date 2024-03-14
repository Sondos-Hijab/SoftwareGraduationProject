const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getBusinessesByName = require('../RouteImplementations/getBusinessesByName');

router.get('/user/getBusinessesByName', authenticateToken, getBusinessesByName);

module.exports = router;

const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getBusinessesByCategory = require('../RouteImplementations/getBusinessesByCategory');

router.get('/user/getBusinessesByCategory', authenticateToken, getBusinessesByCategory);

module.exports = router;

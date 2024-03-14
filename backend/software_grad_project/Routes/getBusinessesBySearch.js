const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getBusinessesBySearch = require('../RouteImplementations/getBusinessesBySearch');

router.get('/user/getBusinessesBySearch', authenticateToken, getBusinessesBySearch);

module.exports = router;

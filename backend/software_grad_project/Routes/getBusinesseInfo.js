const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getBusinesseInfo = require('../RouteImplementations/getBusinesseInfo');

router.get('/user/getBusinesseInfo', authenticateToken, getBusinesseInfo);

module.exports = router;

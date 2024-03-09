const express = require('express');
const router = express.Router();
const  authenticateToken  = require('../HelperObjects/checkAuth');

const {checkAuthenticationToken} = require('../RouteImplementations/checkAuthenticationToken');

router.get('/user/checkAuthenticationToken',authenticateToken, checkAuthenticationToken )

module.exports = router;

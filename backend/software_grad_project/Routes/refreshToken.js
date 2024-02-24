const express = require('express');
const router = express.Router();
const  authenticateToken  = require('../HelperObjects/checkAuth');


const {refreshToken} = require('../RouteImplementations/refreshToken');

router.post('/user/refreshToken', authenticateToken , refreshToken )

module.exports = router;



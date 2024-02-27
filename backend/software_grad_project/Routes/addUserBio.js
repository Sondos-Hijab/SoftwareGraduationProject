const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const addUserBio  = require('../RouteImplementations/addUserBio');

router.put('/user/addUserBio', authenticateToken, addUserBio);

module.exports = router;


const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getPost = require('../RouteImplementations/getPost');

router.get('/user/getPost', authenticateToken, getPost);

module.exports = router;

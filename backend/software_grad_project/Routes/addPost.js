const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const addPost = require('../RouteImplementations/addPost');

router.post('/user/addPost', authenticateToken, addPost);

module.exports = router;




const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const deletePost = require('../RouteImplementations/deletePost');

router.delete('/user/deletePost', authenticateToken, deletePost);

module.exports = router;

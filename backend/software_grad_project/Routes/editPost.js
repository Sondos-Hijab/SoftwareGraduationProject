const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const { editPost }  = require('../RouteImplementations/editPost');

router.put('/user/editPost', authenticateToken, editPost);

module.exports = router;


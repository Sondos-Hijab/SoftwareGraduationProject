const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const getPostsForFollowedBusinesses = require('../RouteImplementations/getPostsForFollowedBusinesses');

router.get('/user/getPostsForFollowedBusinesses', authenticateToken, getPostsForFollowedBusinesses);

module.exports = router;

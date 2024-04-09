const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const followGenderRatio = require('../RouteImplementations/followGenderRatio');

router.get('/user/followGenderRatio', authenticateToken, followGenderRatio);

module.exports = router;

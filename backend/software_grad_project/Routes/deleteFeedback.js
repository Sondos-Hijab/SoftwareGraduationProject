const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const deleteFeedback = require('../RouteImplementations/deleteFeedback');

router.delete('/user/deleteFeedback', authenticateToken, deleteFeedback);

module.exports = router;

const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const addFeedback = require('../RouteImplementations/addFeedback');

module.exports = (io, socketConnections) => {
    router.post('/user/addFeedback', authenticateToken, addFeedback(io, socketConnections));
    return router;
  };

const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const addChatMessage = require('../RouteImplementations/addChatMessage');

module.exports = (io, socketConnections) => {
  router.post('/user/addChatMessage', authenticateToken, addChatMessage(io, socketConnections));
  return router;
};

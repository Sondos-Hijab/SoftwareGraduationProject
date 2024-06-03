const express = require('express');
const router = express.Router();
const authenticateToken = require('../HelperObjects/checkAuth');
const addPost = require('../RouteImplementations/addPost');

module.exports = (io, socketConnections) => {
    router.post('/user/addPost', authenticateToken, addPost(io, socketConnections));
    return router;
  };


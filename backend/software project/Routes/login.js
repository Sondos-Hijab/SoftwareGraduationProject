const express = require('express');
const router = express.Router();

const {login} = require('../RouteImplementations/login');

router.post('/user/login', login )

module.exports = router;

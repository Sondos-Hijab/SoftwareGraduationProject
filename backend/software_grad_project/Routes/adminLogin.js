const express = require('express');
const router = express.Router();

const { adminLogin } = require('../RouteImplementations/adminLogin');

router.post('/user/adminLogin', adminLogin )

module.exports = router;

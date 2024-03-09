const express = require('express');
const router = express.Router();

const {adminSignup} = require('../RouteImplementations/adminSignup');

router.post('/user/adminSignup', adminSignup )

module.exports = router;

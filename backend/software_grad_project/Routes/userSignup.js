const express = require('express');
const router = express.Router();

const {signup} = require('../RouteImplementations/userSignup');

router.post('/user/signup', signup )

module.exports = router;

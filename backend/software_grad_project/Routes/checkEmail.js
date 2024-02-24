const express = require('express');
const router = express.Router();

const {checkEmail} = require('../RouteImplementations/checkEmail');

router.get('/user/checkEmail', checkEmail )

module.exports = router;

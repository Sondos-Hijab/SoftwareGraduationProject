const express = require('express');
const router = express.Router();

const {checkEmail} = require('../RouteImplementations/checkEmail');

router.post('/user/checkEmail', checkEmail )

module.exports = router;

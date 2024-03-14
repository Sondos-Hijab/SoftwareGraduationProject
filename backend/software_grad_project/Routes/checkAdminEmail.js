const express = require('express');
const router = express.Router();

const {checkAdminEmail} = require('../RouteImplementations/checkAdminEmail');

router.post('/user/checkAdminEmail', checkAdminEmail )

module.exports = router;

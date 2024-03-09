const express = require('express');
const router = express.Router();

const {checkAdminEmail} = require('../RouteImplementations/checkAdminEmail');

router.get('/user/checkAdminEmail', checkAdminEmail )

module.exports = router;

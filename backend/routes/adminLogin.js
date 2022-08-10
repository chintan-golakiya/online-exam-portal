var express = require('express');

var router = express.Router()

var adminLoginService = require('../services/adminLogin');

router.post('/',adminLoginService.adminLogin);

module.exports = router;
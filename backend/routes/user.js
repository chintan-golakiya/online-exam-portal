var express = require('express');
var router = express.Router();

var loginService = require('../services/login');

router.get('/details',loginService.userDetails);

module.exports = router;
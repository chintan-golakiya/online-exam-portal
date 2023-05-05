var express = require('express');
var router = express.Router();

var loginService = require('../services/login');

router.post('/',loginService.userLogin);

module.exports = router;
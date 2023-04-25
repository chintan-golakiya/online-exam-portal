var express = require('express');
var router = express.Router();

var studentRegister = require('../services/register');

router.post('/register',studentRegister.studentRegister);

module.exports = router;
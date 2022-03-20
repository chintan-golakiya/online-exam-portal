var express = require('express');
var router = express.Router();

var adminService = require('../services/admin');

router.post('/register',adminService.userRegister);
router.post('/removeUser',adminService.userRemove);

module.exports = router;
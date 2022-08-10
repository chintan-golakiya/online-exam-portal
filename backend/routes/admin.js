var express = require('express');
var router = express.Router();

var adminService = require('../services/admin');

router.get('/details',adminService.adminDetails);

router.post('/register',adminService.teacherRegister);
router.post('/removeUser',adminService.userRemove);
router.post('/unblockUser',adminService.unblockUser);

module.exports = router;
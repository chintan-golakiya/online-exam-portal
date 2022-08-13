var express = require('express');
var router = express.Router();

var loginService = require('../services/login');
var questionService = require('../services/question');

router.get('/details',loginService.userDetails);


// teacher user specific routes 
router.post('/addQuestion',questionService.addQuestion);
module.exports = router;
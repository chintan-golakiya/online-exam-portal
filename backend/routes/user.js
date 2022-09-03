var express = require('express');
var router = express.Router();

var loginService = require('../services/login');
var questionService = require('../services/question');
var subjectService = require('../services/subject');

router.get('/details',loginService.userDetails);


// teacher user specific routes 
router.post('/addQuestion',questionService.addQuestion);
router.get('/getAllSubjects',subjectService.getAllActiveSubject);
router.post('/searchQuestion',questionService.searchQuestion);
router.post('/updateQuestion',questionService.updateQuestion);
router.post('/getQuestion',questionService.getQuestionById);
router.post('/changeQuestionStatus',questionService.changeQuestionStatus);
router.post('/getAnswer',questionService.getAnsByQuestionId);
module.exports = router;
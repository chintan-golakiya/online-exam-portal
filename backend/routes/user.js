var express = require('express');
var router = express.Router();

var loginService = require('../services/login');
var questionService = require('../services/question');
var subjectService = require('../services/subject');
var testService = require('../services/test');
var taketestService = require('../services/taketest');

router.get('/details',loginService.userDetails);
router.get('/getAllTest',testService.getAllTest);
router.post('/getTestById',testService.getTestDetailsFromId);

// teacher user specific routes 
router.post('/addQuestion',questionService.addQuestion);
router.get('/getAllSubjects',subjectService.getAllActiveSubject);
router.post('/searchQuestion',questionService.searchQuestion);
router.post('/updateQuestion',questionService.updateQuestion);
router.post('/getQuestion',questionService.getQuestionById);
router.post('/changeQuestionStatus',questionService.changeQuestionStatus);
router.post('/getAnswer',questionService.getAnsByQuestionId);
router.post('/getQuestionAnswer',questionService.getQuestionAnswerById);
router.post('/createTest',testService.createTest);


// student user specific routes
router.post('/testRegistration',testService.testRegistration);
router.get('/getAllTestStudent',testService.getAllTestWithStudentRegisterCheck);
router.get('/getUpcomingTests',testService.getUpcomingTestforStudent);


router.post('/startTest',taketestService.startTestForStudent);
router.post('/getQuenStarttime',taketestService.getQuestionsAndSetStartTime);
router.post('/saveAnswer',taketestService.saveAnswer);
router.post('/endTest',taketestService.saveAnswerandEndTest);
module.exports = router;
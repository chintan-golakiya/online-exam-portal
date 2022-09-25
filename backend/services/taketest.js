var answersheetModel = require('../models/answersheet');
const questionModel = require('../models/question');
var testModel = require('../models/test');
const testRegistrationModel = require('../models/testRegistration');

var getTestStatus = (test) => {
  if(test.status === 'CANCELLED')
    return test.status;
  var status = 'CREATED'
  var now = new Date();
  if(Date.parse(test.resultTime) < now) {
    status = 'RESULT_DECLARED';
  } else if(Date.parse(test.endTime) < now) {
    status = 'TEST_COMPLETE';
  } else if(Date.parse(test.startTime) < now) {
    status = 'TEST_STARTED';
  } else if(Date.parse(test.regEndTime) < now) {
    status = 'REGISTRATION_COMPLETE'
  } else if(Date.parse(test.regStartTime) < now) {
    status = 'REGISTRATION_STARTED';
  }
  return status;
}

var getAttemptEndTime = (test,startAttemptTime) => {
  var regularEndTime = new Date(Date.parse(startAttemptTime) + (test.duration*1000));
  var endTime = new Date(Date.parse(test.endTime));
  return regularEndTime < endTime ? regularEndTime : endTime; 
}

var startTestForStudent = async(req,res,next)=> {
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'STUDENT') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  } 

  req.check('testid','empty test id').notEmpty();
  

  var errors = req.validationErrors()
  if(errors) {
    console.log(errors);
    res.json({
      success : false,
      message : 'Invalid inputs',
      errors : errors
    })
    return;
  }

  testModel.findById({_id:req.body.testid})
  .then(test => {
    if(test) {
      var correctStatus = getTestStatus(test);
      if(correctStatus !== test.status) {
        updateStatus(test,correctStatus);
        test.status = correctStatus;
      }
      if(test.status === 'TEST_STARTED') {
        testRegistrationModel.find({user:creator._id,test:req.body.testid})
        .then(testRegFind =>{
          if(testRegFind.length > 0) {
            answersheetModel.find({student:creator._id,test:req.body.testid})
            .then(answersheets => {
              if(answersheets.length > 0) {
                if(Date.now() > getAttemptEndTime(test,answersheets[0].startTime)) {
                  answersheets[0].completed = true;
                  answersheetModel.findByIdAndUpdate({_id:answersheets[0]._id},answersheets[0])
                  .then(()=>{
                    console.log("answer sheet marked compeleted for test "+test._id+" user "+creator._id);
                  })
                  .catch((err)=>{
                    console.log(err);
                    console.log("could not mark answersheet completed");
                  })
                }
                if(answersheets[0].completed) {
                  res.json({
                    success : false,
                    message : 'you have taken this test'
                  })
                } else {
                  res.json({
                    success : true,
                    message : 'test is already started',
                    answersheet : answersheets[0],
                    questions : test.questions 
                  })
                }
              } else {
                var tempdata = new answersheetModel({
                  test : req.body.testid,
                  student : creator._id
                })
                tempdata.save((err,newdata)=>{
                  if (err){
                    console.log(err);
                    res.status(500).json({
                      success : false,
                      message : "Unable to start test"
                    })
                  } else {
                    res.json({
                      success : true,
                      message : 'Test started',
                      answersheet : newdata,
                      questions : test.questions
                    })
                  }
                })
              }
            })
            
          } else {
            res.json({
              success : false,
              message : "You are not registered"
            })
          }
        })
        .catch(err=>{
          console.log(err);
          res.json({
            success : false,
            message : "Unable to start test"
          })
        })
      } else if(test.status === 'TEST_COMPLETE') {
        res.json({
          success : false,
          message : "Test time is over"
        })
      } else {
        res.json({
          success : false,
          message : "Test is not started"
        })
      }
    } else {
      res.json({
        success : false,
        message : "Unable to find test"
      })
    }
  }).catch(err => {
    console.log(err);
    res.json({
      success : false,
      message : "Unable to start test"
    })
  })
}

var getQuestionsAndSetStartTime = async(req,res,next)=> {
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'STUDENT') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  } 

  req.check('addStartTime','boolean to add start time not found').isBoolean();
  req.check('answersheetid','answersheet id not found').notEmpty();
  req.check('questionid','Invalid length of list of question').isArray({min:1});
  req.check('questionid.*','Invalid question id').notEmpty();
  
  var errors = req.validationErrors()
  if(errors) {
    console.log(errors);
    res.json({
      success:false,
      message: 'Invalid inputs',
      errors : errors
    })
    return;
  }

  var questions = await questionModel.find({_id:{$in:req.body.questionid}});


  var startTime = "";
  if(req.body.addStartTime) {
    startTime = new Date();
    var answersheet = await answersheetModel.findByIdAndUpdate({_id:req.body.answersheetid},{startTime:startTime })
    .catch((err=> {
      res.json({
        success : false,
        message : "Internal server error"
      })
      return;
    }))
  } else {
    var answersheet = await answersheetModel.findById({_id:req.body.answersheetid})
    .catch((err=> {
      res.json({
        success : false,
        message : "Internal server error"
      })
      return;
    }))
    if(answersheet) {
      startTime = answersheet.startTime;
    }
  }
  console.log(startTime);
  if(startTime>0) {
    res.json({
      success : true,
      startTime : startTime,
      questions : questions.map(x=>({ 
        _id:x._id,
        body:x.body,
        options:x.options,
        marks : x.marks,
        subject: x.subject
      }))
    })
  } else {
    res.json({
      success : false,
      message : "answersheet not found"
    })
  }

}

var saveAnswer = async(req,res,next) => {
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'STUDENT') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }

  req.check('answersheetid','answersheet id not found').notEmpty();
  req.check('answers','Invalid length of list of answers').isArray({min:1});

  var errors = req.validationErrors()
  if(errors) {
    console.log(errors);
    res.json({
      success:false,
      message: 'Invalid inputs',
      errors : errors
    })
    return;
  }

  var answersheet = await answersheetModel.findById({_id:req.body.answersheetid})
  .catch((err=> {
    res.json({
      success : false,
      message : "Internal server error"
    })
    return;
  }))
  if(answersheet) {
    if(answersheet.completed) {
      res.json({
        success : true,
        testDone : true,
        message : "Test is completed"
      })
      return;
    }
    var test = await testModel.findById({_id:answersheet.test})
    .catch((err)=>{
      console.log(err);
      console.log("could not mark answersheet completed");
    })
    
    if(Date.now() - getAttemptEndTime(test,answersheet.startTime) > 0) {
      answersheetModel.findByIdAndUpdate({_id:req.body.answersheetid},{answers: req.body.answers,completed : true})
      .then(()=>{
        res.json({
          success : true,
          testDone : true,
          message : "answers updated"
        })
      }).catch((err)=>{
        console.log(err);
        console.log("could not update answers and complete test");
      })
    }
    else {
      answersheetModel.findByIdAndUpdate({_id:req.body.answersheetid},{answers: req.body.answers})
      .then(()=>{
        res.json({
          success : true,
          testDone : false,
          message : "answers updated"
        })
      }).catch((err)=>{
        console.log(err);
        console.log("could not update answers");
      })
    }
  } else {
    res.json({
      success : false,
      message : "Answersheet not found"
    })
  }
}

const saveAnswerandEndTest = async(req,res,next)=> {
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'STUDENT') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }

  req.check('answersheetid','answersheet id not found').notEmpty();
  req.check('answers','Invalid length of list of answers').isArray({min:1});

  var answersheet = await answersheetModel.findById({_id:req.body.answersheetid})
  .catch((err=> {
    res.json({
      success : false,
      message : "Internal server error"
    })
    return;
  }))

  if(answersheet) {
    if(answersheet.completed) {
      res.json({
        success : false,
        message : "Test is completed"
      })
      return;
    }
    var test = await testModel.findById({_id:answersheet.test})
    .catch((err)=>{
      console.log(err);
      console.log("could not mark answersheet completed");
    })
    
    if(Date.now() - getAttemptEndTime(test,answersheet.startTime) > 10*1000) {
      answersheet.completed = true;
      answersheetModel.findByIdAndUpdate({_id:req.body.answersheetid},answersheet)
      .then(()=>{
        console.log("answer sheet marked compeleted for test "+test._id+" user "+creator._id);
        res.json({
          success : true,
          message : "Test is completed"
        })
      })
      .catch((err)=>{
        console.log(err);
        console.log("could not mark answersheet completed");
      })
    } else {
      answersheetModel.findByIdAndUpdate({_id:req.body.answersheetid},{answers: req.body.answers,completed : true})
      .then(()=>{
        res.json({
          success : true,
          message : "Test is completed"
        })
      }).catch((err)=>{
        console.log(err);
        console.log("could not update answers and complete test");
      })
    }
    
  } else {
    res.json({
      success : false,
      message : "Answersheet not found"
    })
  }
}

module.exports = {
  startTestForStudent,
  getQuestionsAndSetStartTime,
  saveAnswer,
  saveAnswerandEndTest
}
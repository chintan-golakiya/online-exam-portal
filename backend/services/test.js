var testModel = require('../models/test');
var questionModel = require('../models/question');
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

var generateTestpaper =  async(subjects, maxmarks, queTypes) => {
  templist = [];
  quelist = [];
  anslist = [];
  totalMarks = 0;
  try {
    const allQuestions = await questionModel.find({status:true,subject:{$in:subjects},marks:{$in:queTypes}});
    for(var x in allQuestions) {
      totalMarks += allQuestions[x].marks;
    }
    if(totalMarks<maxmarks) {
      console.log('not enough question for subjects');
    } else {
      var remaining = maxmarks;
      var qIndexSet = new Set();
      while(remaining>0) {
        var i = Math.floor(Math.random()*allQuestions.length);
        if(qIndexSet.has(i) || allQuestions[i].marks > remaining) {
          continue;
        } else {
          qIndexSet.add(i);
          quelist.push(allQuestions[i]._id);
          anslist.push(allQuestions[i].answer);
          remaining -= allQuestions[i].marks;
        }
      }
    }
    return {quelist,anslist};
  } catch(err) {
    console.log(err);
    return {quelist,anslist};
  }
  
}

var createTest = async (req,res,next) => {
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'TEACHER') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }

  req.check('title','Empty Title').notEmpty();
  req.check('subjects','Invalid length of list of subjects').isArray({min:1})
  req.check('subjects.*','Invalid Null Subject').notEmpty();
  req.check('maxmarks','Invalid max marks').notEmpty();
  req.check('queTypes','Invalid length of list of queTypes').isArray({min:1})
  req.check('queTypes.*','Invalid queType').notEmpty();
  req.check('startTime','Invalid Start Time').notEmpty();
  req.check('endTime','Invalid End Time').notEmpty();
  req.check('duration','Invalid duration').notEmpty();
  req.check('regStartTime','Invalid registration start time').notEmpty();
  req.check('regEndTime','Invalid registration end time').notEmpty();
  req.check('resultTime','Invalid result time').notEmpty();


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

  var genQue = await generateTestpaper(req.body.subjects,req.body.maxmarks, req.body.queTypes);
  if(genQue.quelist.length < 1) {
    res.json({
      success : false,
      message : 'Not enough questions for selected subject'
    })
    return;
  }
  var tempdata = new testModel({
    title : req.body.title,
    subjects : req.body.subjects,
    maxmarks : req.body.maxmarks,
    queTypes : req.body.queTypes,
    questions : genQue.quelist,
    answers : genQue.anslist,
    startTime : req.body.startTime,
    endTime : req.body.endTime,
    duration : req.body.duration,
    regStartTime : req.body.regStartTime,
    regEndTime : req.body.regEndTime,
    resultTime : req.body.resultTime,
    createdBy : creator._id
  })
  tempdata.save((err)=>{
    if (err){
      console.log(err);
      res.status(500).json({
        success : false,
        message : "Unable to create test"
      })
    } else {
      res.json({
        success : true,
        message : 'Test created successfully!'
      })
     
    }
  })
}

var updateStatus = (test,correctStatus) => {
  
  if(correctStatus !== test.status) {
    console.log(correctStatus + " "+ test.status)

    testModel.findByIdAndUpdate({_id:test._id},{status : correctStatus})
    .then((updated)=>{
      console.log("updated status of test "+updated._id+" to "+correctStatus);
    }).catch((err)=>{
      console.log('Error in status update');
      console.log(err);
    })
  }
}

var getAllTest = (req,res,next) => {
  var creator = req.user || null;
  if(creator == null) {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }

  try {
    testModel.find().sort({startTime:-1})
    .then((result)=>{
      for(x in result) {
        var correctStatus = getTestStatus(result[x]);
        if (correctStatus !== result[x].status) {
          updateStatus(result[x],correctStatus);
          result[x].status = correctStatus;
        }
      }
      res.json({
        success : true,
        testlist : result.map(v=>({_id:v._id,title:v.title,status: v.status}))
      })
    })

  } catch(err) {
    console.log(err);
    res.json({
      success : false,
      testlist : []
    })
  }
  
}

var testRegistration = (req,res,next) => {
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
    .then(result => {
      var correctStatus = getTestStatus(result);
      if(correctStatus !== result.status) {
        updateStatus(result,correctStatus);
        result.status = correctStatus;
      }
      if(result.status !== 'REGISTRATION_STARTED') {
        res.json({
          success : false,
          message : 'Test Registration are not open'
        })
      } else {
        testRegistrationModel.find({user:creator._id,test:req.body.testid})
        .then(testRegFind=>{
          if(testRegFind.length > 0) {
            console.log(testRegFind);
            res.json({
              success : false,
              message : 'your registration for test is done'
            })
          } else {
            var tempdata = new testRegistrationModel({
              test : req.body.testid,
              user : creator._id
            })
            tempdata.save().then(()=>{
              res.json({
                success : true,
                message : 'Test Registration success'
              })})
              .catch(err=>{
                res.json({
                  success : false,
                  message : 'Test Registration failed'
                })
              })
            
          }
        })
      }

    }).catch(err=> {
      console.log(err);
      res.json({
        success : false
      })
    })
}

var getAllTestWithStudentRegisterCheck = async(req,res,next) => {
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'STUDENT') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
    return;
  }

  var tests = await testModel.find().sort({startTime:1}).catch(err=>{
    console.log(err);
    res.json({
      success : false,
      message : 'Internal server error'
    });
    return;
  });

  var testlist = new Array(tests.length);
  var registeredList = await testRegistrationModel.find({user:creator._id},{test:1}).catch(err=>{
    console.log(err);
    res.json({
      success : false,
      message : 'Internal server error'
    });
    return;
  });


  for(x in tests) {
    var correctStatus = getTestStatus(tests[x]);
    if (correctStatus !== tests[x].status) {
      updateStatus(tests[x],correctStatus);
      tests[x].status = correctStatus;
    }
    var isReg = registeredList.find((test,index)=>(test.test.toString() == tests[x]._id.toString()));
    testlist[x] = {
      _id : tests[x]._id,
      title : tests[x].title,
      status : tests[x].status,
      isRegistered : (isReg!==undefined),
      startTime : tests[x].startTime,
      endTime : tests[x].endTime,
      regStartTime : tests[x].regStartTime,
      regEndTime : tests[x].regEndTime,
      resultTime : tests[x].resultTime,
      maxmarks : tests[x].maxmarks,
      duration : tests[x].duration
    };
  }

  
  res.json({
    success : true,
    testlist : testlist
  })
  
}

var getUpcomingTestforStudent = async(req,res,next) => {
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'STUDENT') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
    return;
  }

  var tests = await testModel.find({endTime:{$gt:Date.now()}}).sort({startTime:1}).catch(err=>{
    console.log(err);
    res.json({
      success : false,
      message : 'Internal server error'
    });
    return;
  });

  var testlist = [];
  var registeredList = await testRegistrationModel.find({user:creator._id},{test:1}).catch(err=>{
    console.log(err);
    res.json({
      success : false,
      message : 'Internal server error'
    });
    return;
  });


  for(x in tests) {
    var correctStatus = getTestStatus(tests[x]);
    if (correctStatus !== tests[x].status) {
      updateStatus(tests[x],correctStatus);
      tests[x].status = correctStatus;
    }
    var isReg = registeredList.find((test,index)=>(test.test.toString() == tests[x]._id.toString()));
    if(isReg) {
      testlist.push({
        _id : tests[x]._id,
        title : tests[x].title,
        status : tests[x].status,
        startTime : tests[x].startTime,
        endTime : tests[x].endTime,
        resultTime : tests[x].resultTime,
        maxmarks : tests[x].maxmarks,
        duration : tests[x].duration
      });
    }
  }

  
  res.json({
    success : true,
    upcomingtestlist : testlist
  })
  
}

var getTestDetailsFromId = (req,res,next) => {
  var creator = req.user || null;
  if(creator == null) {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
    return;
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
      res.json({
        success : true,
        test : {
          _id : test._id,
          title : test.title,
          status : test.status,
          startTime : test.startTime,
          endTime : test.endTime,
          regStartTime : test.regStartTime,
          regEndTime : test.regEndTime,
          resultTime : test.resultTime,
          maxmarks : test.maxmarks,
          duration : test.duration
        }
      })
    } else {
      res.json({
        success : false,
        message : 'test id not found'
      })
    }
  })
  .catch(err=>{
    console.log(err);
    res.json({
      success : false,
      message : 'Internal server error'
    });
    return;
  });

  
}




module.exports = {
  createTest,
  getAllTest,
  testRegistration,
  getAllTestWithStudentRegisterCheck,
  getUpcomingTestforStudent,
  getTestDetailsFromId,
  getTestStatus,
  updateStatus
}
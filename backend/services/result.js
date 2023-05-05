const answersheetModel = require("../models/answersheet");
const testModel = require("../models/test");
const subjectModel = require("../models/subject");
const testService = require("./test");

const getAllCompletedTest = (req,res,next) => {
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'STUDENT') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  } 

  answersheetModel.find({student:creator._id, completed:true},{test:1})
  .then(result => {
    var testids = result.map(x => (x.test))
    testModel.find({_id:{$in:testids}}).sort({resultTime:-1})
    .then(tests => {
      for(var i in tests) {
        var correctStatus = testService.getTestStatus(tests[i]);
        if(correctStatus !== tests[i].status) {
          testService.updateStatus(tests[i],correctStatus);
          tests[i].status = correctStatus;
        }
      }

      res.json({
        success : true,
        completedtestlist : tests.map(t => ({
          _id: t._id,
          title:t.title,
          status : t.status,
          maxmarks : t.maxmarks,
          subjects : t.subjects
        }))
      })
    })
    .catch(err => {
      console.log(err);
      res.json({
        success : false,
        message : 'Internal server error in test'
      })
    })
  }).catch(err => {
    console.log(err);
    res.json({
      success : false,
      message : 'Internal server error in answersheet'
    })
  })
}

const getResultMainDetailsByTestId = (req, res, next) => {
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'STUDENT') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }

  req.check('testid','Test id not found').notEmpty();

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

  answersheetModel.find({student:creator._id, test:req.body.testid, completed:true})
  .then(answersheets => {
    if(answersheets[0]) {
      testModel.findById({_id: req.body.testid})
      .then(test => {
        if(test) {
          var correctStatus = testService.getTestStatus(test);
          if(correctStatus !== test.status) {
            testService.updateStatus(test,correctStatus);
            test.status = correctStatus;
          }
          subjectModel.find({_id:{$in:test.subjects}},{name:1})
          .then(subjects=> {
            subs = subjects.map(sub=>(sub.name))
            res.json({
              success : true,
              result : {
                title : test.title,
                status : test.status,
                maxmarks : test.maxmarks,
                subjects : subs,
                score : answersheets[0].score,
                questions : test.questions,
                answers : answersheets[0].answers
              }
            })
          }).catch(err=> {
            console.log(err);
            res.json({
              success : false,
              message : 'Internal server error'
            })
          })
        } else {
          res.json({
            success : false,
            message : 'Answer sheet not found'
          })
        }
      }).catch(err=> {
        console.log(err);
        res.json({
          success : false,
          message : 'Internal server error'
        })
      })
    } else {
      res.json({
        success : false,
        message : 'Answer sheet not found'
      })
    }
  })
  .catch(err=> {
    console.log(err);
    res.json({
      success : false,
      message : 'Internal server error'
    })
    return;
  })

}

module.exports = {
  getAllCompletedTest,
  getResultMainDetailsByTestId
}
var subjectModel = require('../models/subject')
var questionModel = require('../models/question');

var addQuestion = (req,res,next)=>{
  var creator = req.user || null;
  if(creator == null || req.user.usertype != 'TEACHER') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }
  req.check('body','Empty Question').notEmpty();
  req.check('marks','Invalid marks').isNumeric({min:1,max:4});
  req.check('options','Invalid length of list of options').isArray({min:1,max:4})
  req.check('options.*','Invalid Null option').isLength({min:1,max:256})
  req.check('subject','Invalid Subject').notEmpty()
  req.check('answer','Invalid Answer').notEmpty()
  var errors = req.validationErrors()
  if(errors) {
    console.log(errors);
    res.json({
      success : false,
      message : 'Invalid inputs',
      errors : errors
    })
  } 
  else {
    if(req.body.options.includes(req.body.answer) == false) {
      res.json({
        success : false,
        message : 'Invalid inputs',
        error : 'Answer is not in list of options'
      })
    }
    else {
    // check for valid subject
      subjectModel.findOne({_id:req.body.subject, status: true}).then((subject)=>{
        //subject found
        if(subject) {
          var explanation = req.body.explanation || null;
          var tempdata = new questionModel({
            body : req.body.body,
            explanation : explanation,
            options : req.body.options,
            subject : subject._id,
            marks : req.body.marks,
            answer : req.body.answer,
            status : true,
            createdBy : creator._id
          })
          tempdata.save((err, que)=>{
            if (err){
              console.log(err);
              res.status(500).json({
                success : false,
                message : "Unable to add question"
              })
            } else {
              res.json({
                success : true,
                message : 'Question created successfully!'
              })
            }  
          })
        }
        else {
          res.json({
            success : false,
            message : 'Subject not found'
          })
        }
      })
    }
  }
}


// search questions from body
var searchQuestion = (req,res,next)=>{
  var creator = req.user || null
  if(creator == null || req.user.usertype != 'TEACHER') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }

  req.check('query','Empty Query').notEmpty();
  var errors = req.validationErrors()

  if(errors) {
    console.log(errors);
    res.json({
      success : false,
      message : 'Invalid Inputs',
      errors : errors
    })
  }
  else {
    questionModel.find({body : new RegExp(req.body.query)}).limit(20).then((questions)=>{
      result = questions.map((que)=>({_id:que._id,body:que.body,status:que.status}));
      res.json({
        success : true,
        list : result
      })
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json({
        success : false,
        message : "error"
      })
    })
  }
}

//update question and ans
var updateQuestion = (req,res,next)=>{
  var creator = req.user || null
  if(creator == null || req.user.usertype != 'TEACHER') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }
  req.check('id','Id not found').notEmpty();
  req.check('body','Empty Question').notEmpty();
  req.check('marks','Invalid marks').isNumeric({min:1,max:4});
  req.check('options','Invalid length of list of options').isArray({min:1,max:4})
  req.check('options.*','Invalid Null option').isLength({min:1,max:256})
  req.check('subject','Invalid Subject').notEmpty()
  req.check('answer','Invalid Answer').notEmpty()
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
  if(req.body.options.includes(req.body.answer) == false) {
    res.json({
      success : false,
      message : 'Invalid inputs',
      error : 'Answer is not in list of options'
    })
    return;
  }
  var explanation = req.body.explanation || null;
  questionModel.findByIdAndUpdate({_id:req.body.id},{
    body : req.body.body,
    explanation : explanation,
    options : req.body.options,
    subject : req.body.subject,
    marks : req.body.marks,
    answer : req.body.answer,
    createdBy : creator._id
  }).then((result)=>{
    if(result) {
      res.json({
        success:true,
        message : 'success'
      })
    } else {
      res.json({
        success : false,
        message : 'not updated'
      })
    }
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).json({
      success : false,
      message : "server error"
    })
  })
}


// get question by id
var getQuestionById = (req,res,next)=>{
  var creator = req.user || null
  if(creator == null || req.user.usertype != 'TEACHER') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }

  req.check('id','ID not found').notEmpty();
  var errors = req.validationErrors()

  if(errors) {
    console.log(errors);
    res.json({
      success : false,
      message : 'Invalid Inputs',
      errors : errors
    })
  }
  else {
    questionModel.findById({_id:req.body.id})
    .then((result)=>{
      if(result) {
        res.json({
          success:true,
          question: result
        })
      } else {
        res.json({
          success: false,
          message : 'not found'
        })
      }
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json({
        success : false,
        message : "error"
      })
    })
  }
}

var getQuestionAnswerById = (req,res,next)=>{
  var creator = req.user || null
  if(creator == null || req.user.usertype != 'TEACHER') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }

  req.check('id','ID not found').notEmpty();
  var errors = req.validationErrors()

  if(errors) {
    console.log(errors);
    res.json({
      success : false,
      message : 'Invalid Inputs',
      errors : errors
    })
  }
  else {
    questionModel.findById({_id:req.body.id})
    .then((result)=>{
      if(result) {
        queansModel.find({question:req.body.id})
        .then((resans)=> {
          if(resans[0]) {
            res.json({
              success:true,
              question : result,
              answer: resans[0].answer
            })
          } else {
            res.json({
              success:true,
              question: result,
              answer : ''
            })
          }
        })
        .catch((err)=>{
          console.log(err);
          res.status(500).json({
            success : false,
            message : "error"
          })
        })
      } else {
        res.json({
          success: false,
          message : 'not found'
        })
      }
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json({
        success : false,
        message : "error"
      })
    })
  }
}

// disable/enable question with ans
var changeQuestionStatus = (req,res,next)=> {
  var creator = req.user || null
  if(creator == null || req.user.usertype != 'TEACHER') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }
  req.check('id','Id not found').notEmpty();
  req.check('status','Status not found').isBoolean();

  var errors = req.validationErrors()
  if(errors) {
    console.log(errors);
    res.json({
      success : false,
      message : 'Invalid inputs',
      errors : errors
    })
  } else {
    questionModel.findByIdAndUpdate({_id:req.body.id},{
      status:req.body.status,
      createdBy : creator._id
    }).then((result)=>{
      if(result) {
        res.json({
          success:true,
          message : 'success'
        })
      }
    }).catch((err)=>{
      console.log(err);
      res.status(500).json({
        success : false,
        message : 'Internal server error'
      })
    })
  }
}

var getAnsByQuestionId = (req,res,next)=>{
  var creator = req.user || null
  if(creator == null || req.user.usertype != 'TEACHER') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }

  req.check('id','ID not found').notEmpty();
  var errors = req.validationErrors()

  if(errors) {
    console.log(errors);
    res.json({
      success : false,
      message : 'Invalid Inputs',
      errors : errors
    })
  } else {
    questionModel.findById({_id:req.body.id})
    .then((result)=> {
      if(result) {
        res.json({
          success:true,
          answer: result.answer
        })
      } else {
        res.json({
          success: false,
          message : 'not found'
        })
      }
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json({
        success : false,
        message : "error"
      })
    })
  }
}

module.exports = {
  addQuestion,
  searchQuestion,
  updateQuestion,
  getQuestionById,
  changeQuestionStatus,
  getAnsByQuestionId,
  getQuestionAnswerById
}
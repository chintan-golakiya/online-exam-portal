var subjectModel = require('../models/subject')
var questionModel = require('../models/question');
const queansModel = require('../models/queans');

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
              var tempans = new queansModel({
                question : que._id,
                answer : req.body.answer
              })
              tempans.save()
              .then(()=>{
                res.json({
                  success : true,
                  message : 'Question created successfully!'
                })
              })
              .catch((err)=>{
                console.log(err);
                res.status(500).json({
                  success : false,
                  message : "Unable to save Answer"
                })
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


module.exports = {
  addQuestion
}
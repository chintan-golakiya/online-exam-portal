var userModel = require('../models/user');
var tool = require('./tool');

var studentRegister = (req,res,next) => {
  
  req.check('username','Invalid name').notEmpty();
  req.check('email','Invalid Email Address').isEmail().notEmpty();
  req.check('password','Invalid Password').isLength({min: 5, max: 20});

  var errors = req.validationErrors();
  if(errors) {
    res.status(400).json({
      success : false,
      message : 'Invalid inputs',
      errors : errors
    })
  }
  else {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    
    userModel.findOne({'email':email}).then((user)=>{
      //user already exists
      if(user) {
        res.status(400).json({
          success : false,
          message : 'This email is already exists!'
        })
      } else {
        //add user to database
        tool.hashPassword(password)
        .then((hash)=> {
          var tempdata = new userModel({
            username : username,
            password : hash,
            email : email,
            usertype : 'STUDENT'
          })
          tempdata.save()
          .then(()=>{
            res.json({
              success : true,
              message : 'Profile created successfully!'
            })
          })
          .catch((err)=>{
            res.status(500).json({
              success : false,
              message : "Unable to register Profile"
            })
          })
        })
        .catch((err) => {
          res.status(500).json({
            success : false,
            message : "Unable to register Profile"
          })
        })
      }
    }).catch((err)=>{
      res.status(500).json({
        success : false,
        message : "Unable to register profile"
      })
    })
  }
}

module.exports = { studentRegister }
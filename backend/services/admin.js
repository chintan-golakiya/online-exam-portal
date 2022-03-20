var userModel = require('../models/user');
var tool = require('./tool');

var userRegister = (req,res,next) => {
  var creator = req.user || null;
  req.check('name','Invalid name').notEmpty();
  req.check('email','Invalid Email Address').isEmail().notEmpty();
  req.check('password','Invalid Password').isLength({min: 5, max: 20});
  req.check('usertype', 'Invalid usertype').notEmpty().isIn(['ADMIN','TEACHER']);
  var errors = req.validationErrors();
  if(creator == null || creator.usertype != 'ADMIN') {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }
  else if(errors) {
    res.json({
      success : false,
      message : 'Invalid inputs',
      errors : errors
    })
  }
  else {
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    var usertype = req.body.usertype;
    userModel.findOne({'email':email}).then((user)=>{
      //user already exists
      if(user) {
        res.json({
          success : false,
          message : 'This email is already exists!'
        })
      } else {
        //add user to database
        tool.hashPassword(password)
        .then((hash)=> {
          var tempdata = new userModel({
            name : name,
            password : hash,
            email : email,
            usertype : usertype,
            createdBy : creator._id
          })
          tempdata.save()
          .then(()=>{
            res.json({
              success : true,
              message : 'Profile created successfully!'
            })
          })
          .catch((err)=>{
            console.log(err);
            res.status(500).json({
              success : false,
              message : "Unable to register Profile"
            })
          })
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success : false,
            message : "Unable to register Profile"
          })
        })
      }
    }).catch((err)=>{
      console.log(err);
      res.status(500).json({
        success : false,
        message : "Unable to register profile"
      })
    })
  }
}

let userRemove = (req,res,next) => {
  if(req.user.usertype==='ADMIN'){
      var _id =  req.body._id;
      userModel.findOneAndUpdate({
          _id : _id
      },
      {
          status : 0

      }).then(()=>{
          res.json({
              success: true,
              message :  "Account has been removed"
          })
      }).catch((err)=>{
          res.status(500).json({
              success : false,
              message : "Unable to remove account"
          })
      })
  }
  else{
      res.status(401).json({
          success : false,
          message : "Permissions not granted!"
      })
  } 
}

module.exports = { userRegister, userRemove }
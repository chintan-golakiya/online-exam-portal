var userModel = require('../models/user');
var subjectModel = require('../models/subject');
var tool = require('./tool');

var teacherRegister = (req,res,next) => {
  var creator = req.user || null;
  req.check('username','Invalid name').notEmpty();
  req.check('email','Invalid Email Address').isEmail().notEmpty();
  req.check('password','Invalid Password').isLength({min: 5, max: 20});
  var errors = req.validationErrors();
  if(creator == null) {
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
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
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
            username : username,
            password : hash,
            email : email,
            usertype : 'TEACHER',
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
  if(req.user == null) {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }
  else {
      var _id =  req.body._id;
      userModel.findOneAndUpdate({
          _id : _id
      },
      {
          status : false

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
}

let unblockUser = (req,res,next) => {
  if(req.user == null) {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }
  else {
      var _id =  req.body._id;
      userModel.findOneAndUpdate({
          _id : _id
      },
      {
          status : true

      }).then(()=>{
          res.json({
              success: true,
              message :  "Account has been unblocked"
          })
      }).catch((err)=>{
          res.status(500).json({
              success : false,
              message : "Unable to unblock account"
          })
      })
  }
}

var adminDetails = (req,res,next) => {
  if(req.user) {
    res.json({
      success:true,
      user : {
        username : req.user.username,
        _id : req.user._id
      }
    });
  }
  else {
    res.json({
      success: false,
      user: {}
    });
  }
}

var addSubject = (req,res,next) => {
  var creator = req.user || null;
  req.check('name', 'Invalid name').notEmpty();

  var errors = req.validationErrors();

  if(creator == null) {
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
    subjectModel.findOne({'name':name}).then((subject)=>{
      // subject already exists
      if(subject) {
        res.json({
          success : false,
          message : 'Subject is already exists!'
        })
      }
      else {
        //add subject to database
        var newsubject = new subjectModel({
          name : name,
          status : true,
          createdBy : creator._id
        })

        newsubject.save()
        .then(()=> {
          res.json({
            success : true,
            message : 'Subject created successfully!'
          })
        })
        .catch((err)=>{
          console.log(err);
          res.status(500).json({
            success : false,
            message : "Unable to add Subject"
          })
        })
      }
    })
  }
}

var subjectRemove = (req,res,next) => {
  if(req.user == null) {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }
  else {
    subjectModel.findOneAndUpdate({
      _id : _id
    },
    {
      status : false
    }).then(()=>{
      res.json({
          success: true,
          message :  "Subject has been removed"
      })
    }).catch((err)=>{
      res.status(500).json({
          success : false,
          message : "Unable to remove subject"
      })
    })
  }
}

var unblockSubject = (req,res,next) => {
  if(req.user == null) {
    res.status(401).json({
      success : false,
      message : "Permissions not granted!"
    })
  }
  else {
    subjectModel.findOneAndUpdate({
      _id : _id
    },
    {
      status : true
    }).then(()=>{
      res.json({
          success: true,
          message :  "Subject has been unblocked"
      })
    }).catch((err)=>{
      res.status(500).json({
          success : false,
          message : "Unable to unblock subject"
      })
    })
  }
}

module.exports = { 
  teacherRegister, 
  userRemove, 
  unblockUser, 
  adminDetails, 
  addSubject, 
  subjectRemove,
  unblockSubject
}
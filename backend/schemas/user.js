var mongoose = require('mongoose');
var userModel = require('../models/user');

var userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  usertype : {
    type : String,
    enum : ['ADMIN', 'TEACHER', 'STUDENT'],
    required : true 
  },
  password : {
    type : String,
    required : true
  },
  status : {
    type : Boolean,
    default : true
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'userModel'
  }

},
{
  timestamps:{}
})

module.exports = userSchema
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username : {
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
    enum : ['TEACHER', 'STUDENT'],
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
    ref : 'adminModel'
  }

},
{
  timestamps:{}
})

module.exports = userSchema
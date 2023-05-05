var mongoose = require('mongoose')

var subjectSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    unique : true
  },
  status : {
    type : Boolean,
    required : true,
    default : true
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'adminModel'
  }
},
{
  timestamps : {}
})

module.exports = subjectSchema
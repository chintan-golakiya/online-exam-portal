var mongoose = require('mongoose')
var questionModel = require('../models/question')
var subjectModel = require('../models/subject')
var userModel = require('../models/user')

var testSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  duration : {
    type : Number,
    required : true
  },
  questions : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'questionModel'
  }],
  subjects : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'subjectModel'
  }],
  status : {
    type : String,
    enum : ['CREATED','REGISTRATION_STARTED','REGISTRATION_COMPLETE','TEST_STARTED','TEST_COMPLETE','RESULT_DECLARED','CANCELLED'],
    default : 'CREATED'
  },
  candidates : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'userModel'
  }],
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'userModel',
    required : true
  }



},
{
  timestamps : {}
})

module.exports = testSchema
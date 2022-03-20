var mongoose = require('mongoose')
var optionModel = require('../models/option')
var subjectModel = require('../models/subject')
var userModel = require('../models/user')

var questionSchema = new mongoose.Schema({
  body : {
    type : String
  },
  image : {
    type : String
  },
  explanation : {
    type : String,
    required : true
  },
  options : [ {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'optionModel',
    required : true
  }],
  subject : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'subjectModel',
    required : true
  },
  weightage : {
    type : Number,
    requried : true
  },
  status : {
    type : Boolean,
    required : true,
    default : true
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'userModel'
  }
}, 
{
  timestamps: {}
})

module.exports = questionSchema;
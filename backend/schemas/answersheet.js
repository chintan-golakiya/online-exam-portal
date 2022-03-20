var mongoose = require('mongoose')
var testModel = require('../models/test')
var userModel = require('../models/user')
var optionModel = require('../models/option')

var answersheetSchema = new mongoose.Schema({
  test : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'testModel',
    required : true
  },
  student : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'userModel',
    requried : true
  },
  score : {
    type : Number,
    default : 0,
    requried : true
  },
  answers : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'optionModel'
  }]
},{
  timestamps : {}
})

module.exports = answersheetSchema;
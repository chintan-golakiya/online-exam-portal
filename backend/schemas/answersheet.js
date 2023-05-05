var mongoose = require('mongoose')

var answersheetSchema = new mongoose.Schema({
  test : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'testModel',
    required : true
  },
  student : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'userModel',
    required : true
  },
  score : {
    type : Number,
    default : 0,
    required : true
  },
  answers : [{
    type : String
  }],
  startTime : {
    type : Date
  },
  completed : {
    type : Boolean,
    required : true,
    default : false
  }
},{
  timestamps : {}
})

module.exports = answersheetSchema;
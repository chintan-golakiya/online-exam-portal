var mongoose = require('mongoose')

var optionSchema = new mongoose.Schema({
  body : {
    type : String
  },
  image : {
    type : String
  },
  isAnswer : {
    type : Boolean,
    required : true,
    default : false
  }
},
{
  timestamps:{}
});

module.exports = optionSchema;
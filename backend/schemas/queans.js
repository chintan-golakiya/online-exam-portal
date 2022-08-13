var mongoose = require('mongoose')

var queansSchema = new mongoose.Schema({
  question : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'questionModel',
    required : true
  },
  answer : {
    type : String,
    require : true
  }
},
{
  timestamps:{}
});

module.exports = queansSchema;
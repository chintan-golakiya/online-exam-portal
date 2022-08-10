var mongoose = require('mongoose')

var queansSchema = new mongoose.Schema({
  question : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'questionModel',
    required : true
  },
  answer : {
    type : string,
    require : true
  }
},
{
  timestamps:{}
});

module.exports = queansSchema;
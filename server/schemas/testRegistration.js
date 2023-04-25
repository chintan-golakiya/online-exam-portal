var mongoose = require("mongoose");

var testRegistrationSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'userModel'
  },
  test : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'testModel'
  }
},{
  timestamps:{}
})

module.exports = testRegistrationSchema
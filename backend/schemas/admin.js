var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  }
},{
  timestamps:{}
})

module.exports = adminSchema
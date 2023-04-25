var mongoose = require("mongoose");
var config = require('config');
const adminModel = require("../models/admin");
const { hashPassword } = require("./tool");

//database connection
mongoose.Promise = global.Promise;
const options = {
  autoIndex: false, 
  reconnectTries: 100,
  reconnectInterval: 500, 
  poolSize: 10, 
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useFindAndModify :  false
};

mongoose.connect(config.get('mongodb.connectionString'),options).then(()=>{
    console.log("connected to mongoDB");
    hashPassword("systemadmin").then((hash)=>{
      var tempAdmin = new adminModel({
        username : "sysadmin",
        password : "password"
      })
      tempAdmin.save();
    })
    
}).catch((err)=>{
    console.log("Error connecting to database",err);
})


module.exports=mongoose;
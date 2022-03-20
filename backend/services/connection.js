var mongoose = require("mongoose");
var config = require('config');

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
}).catch((err)=>{
    console.log("Error connecting to database",err);
})


module.exports=mongoose;
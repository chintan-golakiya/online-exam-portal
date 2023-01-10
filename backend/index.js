const server = require("./app");
const PORT = process.env.PORT || 5000

server.listen(PORT,(err)=>{
  if(err){
    console.log(err);
  }
  console.log(`Server Started. Server listening to port ${PORT}`);
});

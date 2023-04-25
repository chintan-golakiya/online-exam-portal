const bcrypt = require('bcrypt');
const saltRounds = 10;

var hashPassword = (pass) => {
  return (new Promise( (resolve, reject)=> {
    bcrypt.hash(pass, saltRounds)
    .then((hash)=>{
      resolve(hash);
    })
    .catch((err)=>{
      reject(err)
    })
  }))
}

module.exports = {hashPassword};
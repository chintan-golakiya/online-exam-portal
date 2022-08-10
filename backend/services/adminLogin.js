const jwt = require('jsonwebtoken')

var config = require('config')

var passport = require('./passportconf')

var adminLogin = (req, res, next) => {
  
  req.check('username', 'Invalid username').notEmpty()
  req.check('password', 'Invalid password').isLength({min:4, max:20});

  var errors = req.validationErrors()

  if(errors) {
    res.json({
      success : false,
      message : 'Invalid inputs',
      errors : errors
    })
  }
  else {
    passport.authenticate('admin-login', {session : false}, (err, admin, info)=> {
      if(err || !admin) {
        res.json(info);
      }
      else {
        req.login({_id:admin._id}, {session : false}, (err)=>{
          if(err) {
            res.json({
              success : false,
              message : 'server error'
            })
          }

          var token = jwt.sign({_id: admin._id}, config.get('jwt.secret'), {expiresIn: '30d'});
          res.json({
            success : true,
            message : 'login successful',
            admin : {
              username : admin.username,
              _id : admin._id
            },
            token : token
          })
        })
      }
    })(req, res, next);
  }
}

module.exports = { adminLogin };
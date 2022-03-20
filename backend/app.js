const PORT = process.env.PORT || 5000
var createError = require('http-errors');
var express = require('express');
const helmet = require('helmet')
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var passport = require("./services/passportconf");
var app = express();
const cors = require('cors');

app.use(helmet());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin");
    next();
});


const corsOptions = {
    origin: '*'
  }
app.use(cors(corsOptions));
app.use(expressValidator());

//database connection
require("./services/connection");

//import files
var publicRoutes = require("./routes/public");
var login = require("./routes/login");
var admin = require('./routes/admin');
var user = require('./routes/user');


//configs
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//passport
app.use(passport.initialize());
app.use(passport.session());

//bind routes
app.use('/api/v1/public',publicRoutes);
app.use('/api/v1/login',login);
app.use('/api/v1/admin',passport.authenticate('user-token', {session:false}),admin);
app.use('/api/v1/user',passport.authenticate('user-token', {session:false}),user);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

//error handlings
app.use(function(req, res, next) {
    next(createError(404,"Invalid API. Use the official documentation to get the list of valid APIS."));
});

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status).json({
        success : false,
        message : err.message
    });
});

app.listen(PORT,(err)=>{
    if(err){
      console.log(err);
    }
    console.log(`Server Started. Server listening to port ${PORT}`);
});

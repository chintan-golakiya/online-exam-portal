var mongoose = require('mongoose');
var userSchema = require('../schemas/user');

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;
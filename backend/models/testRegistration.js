var mongoose = require('mongoose');
var testRegistrationSchema = require('../schemas/testRegistration');

var testRegistrationModel = mongoose.model('testRegistration',testRegistrationSchema);

module.exports = testRegistrationModel;
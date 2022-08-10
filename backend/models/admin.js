var mongoose = require('mongoose');
var adminSchema = require('../schemas/admin');

var adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;
var mongoose = require('mongoose');
var subjectSchema = require('../schemas/subject');

var subjectModel = mongoose.model('subject',subjectSchema);

module.exports = subjectModel;
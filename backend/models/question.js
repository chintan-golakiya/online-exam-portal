var mongoose = require('mongoose')

var questionSchema = require('../schemas/question')

var questionModel = mongoose.model('question',questionSchema)

module.exports = questionModel;
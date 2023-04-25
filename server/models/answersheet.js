var mongoose = require('mongoose')

var answersheetSchema = require('../schemas/answersheet')

var answersheetModel = mongoose.model('answersheet',answersheetSchema)

module.exports = answersheetModel;
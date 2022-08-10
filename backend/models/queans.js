var mongoose = require('mongoose')
var queansSchema = require('../schemas/queans')

var queansModel = mongoose.model('queans',queansSchema)

module.exports = queansModel;
var mongoose = require('mongoose')
var testSchema = require('../schemas/test')

var testModel = mongoose.model('test',testSchema)

module.exports = testModel
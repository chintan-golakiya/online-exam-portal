var mongoose = require('mongoose')
var optionSchema = require('../schemas/option')

var optionModel = mongoose.model('option',optionSchema)

module.exports = optionModel;
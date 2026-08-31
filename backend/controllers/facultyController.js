const Faculty = require('../models/Faculty.js')
const { buildCrudController } = require('./genericController.js')

module.exports = buildCrudController(Faculty)

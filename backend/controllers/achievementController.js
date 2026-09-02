const Achievement = require('../models/Achievement.js')
const { buildCrudController } = require('./genericController.js')

module.exports = buildCrudController(Achievement, { defaultSort: '-createdAt' })

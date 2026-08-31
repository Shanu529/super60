const Project = require('../models/Project.js')
const { buildCrudController } = require('./genericController.js')

module.exports = buildCrudController(Project, { searchableSlug: true })

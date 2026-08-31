const AcademicTeacher = require('../models/AcademicTeacher.js')
const { buildSingletonController } = require('./genericController.js')

module.exports = buildSingletonController(AcademicTeacher)

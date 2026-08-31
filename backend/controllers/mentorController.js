const Mentor = require('../models/Mentor.js')
const { buildSingletonController } = require('./genericController.js')

module.exports = buildSingletonController(Mentor)

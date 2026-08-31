const Hod = require('../models/Hod.js')
const { buildSingletonController } = require('./genericController.js')

module.exports = buildSingletonController(Hod)

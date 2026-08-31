const Event = require('../models/Event.js')
const { buildCrudController } = require('./genericController.js')

module.exports = buildCrudController(Event, { defaultSort: 'date' })

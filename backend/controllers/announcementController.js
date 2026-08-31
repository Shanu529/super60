const Announcement = require('../models/Announcement.js')
const { buildCrudController } = require('./genericController.js')

module.exports = buildCrudController(Announcement, { defaultSort: '-date' })

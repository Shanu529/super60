const GalleryItem = require('../models/GalleryItem.js')
const { buildCrudController } = require('./genericController.js')

module.exports = buildCrudController(GalleryItem)

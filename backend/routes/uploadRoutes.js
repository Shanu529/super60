const express = require('express')
const { protect, adminOnly } = require('../middleware/auth.js')
const upload = require('../middleware/upload.js')
const { uploadImage } = require('../controllers/uploadController.js')

const router = express.Router()

router.post('/', protect, adminOnly, upload.single('image'), uploadImage)

module.exports = router

const express = require('express')
const { protect } = require('../middleware/auth.js')
const upload = require('../middleware/upload.js')
const { uploadImage } = require('../controllers/uploadController.js')

const router = express.Router()

router.post('/', protect, upload.single('image'), uploadImage)

module.exports = router

const asyncHandler = require('express-async-handler')

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400)
    throw new Error('No file uploaded')
  }
  res.status(201).json({ success: true, url: `/uploads/${req.file.filename}` })
})

module.exports = { uploadImage }

const asyncHandler = require('express-async-handler')
const cloudinary = require('../config/cloudinary.js')

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400)
    throw new Error('No file uploaded')
  }

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'super60',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )

    stream.end(req.file.buffer)
  })

  res.status(201).json({
    success: true,
    url: result.secure_url,
    publicId: result.public_id,
  })
})

module.exports = { uploadImage }
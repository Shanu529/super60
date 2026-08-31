const asyncHandler = require('express-async-handler')
const ContactMessage = require('../models/ContactMessage.js')

const createMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    res.status(400)
    throw new Error('Name, email and message are all required')
  }
  const doc = await ContactMessage.create({ name, email, message })
  res.status(201).json({ success: true, data: doc })
})

const getMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort('-createdAt')
  res.json({ success: true, data: messages })
})

module.exports = { createMessage, getMessages }

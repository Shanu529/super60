const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin.js')

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() })
  if (!admin || !(await admin.comparePassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.json({
    success: true,
    token: generateToken(admin._id),
    name: admin.name,
    email: admin.email,
  })
})

const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.admin })
})

module.exports = { login, me }

const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

// Public signup. Always creates role "user" — the request body's role
// (if any) is ignored on purpose so nobody can grant themselves admin
// access through this endpoint. See models/User.js for how an account
// actually becomes admin.
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Name, email and password are required')
  }
  if (password.length < 6) {
    res.status(400)
    throw new Error('Password must be at least 6 characters')
  }

  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) {
    res.status(409)
    throw new Error('An account with this email already exists')
  }

  const user = await User.create({ name, email: email.toLowerCase(), password, role: 'user' })

  res.status(201).json({
    success: true,
    token: generateToken(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  })
})

// Shared login for both normal users and admins — the only difference
// is what role comes back on the response, which the frontend uses to
// decide whether admin panel access is allowed. The backend enforces
// this independently via the adminOnly middleware on every admin route.
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user || !(await user.comparePassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.json({
    success: true,
    token: generateToken(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  })
})

const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user })
})

module.exports = { signup, login, me }

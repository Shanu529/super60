const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User.js')

// Verifies the JWT and attaches the current user (freshly read from
// MongoDB, so a role change made directly in the database is honored
// immediately on the next authenticated request — no re-login needed
// beyond getting a valid token for that account).
const protect = asyncHandler(async (req, res, next) => {
  let token

  const header = req.headers.authorization
  if (header && header.startsWith('Bearer ')) {
    token = header.split(' ')[1]
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized — no token provided')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) {
      res.status(401)
      throw new Error('Not authorized — account no longer exists')
    }
    next()
  } catch (err) {
    res.status(401)
    throw new Error('Not authorized — invalid or expired token')
  }
})

// Must run AFTER protect. Rejects anyone whose current database role
// is not "admin" — this is the actual authorization boundary. The
// frontend hiding the admin UI is convenience only; this is what
// makes it real.
const adminOnly = (req, res, next) => {
  if (!req.user) {
    res.status(401)
    throw new Error('Not authorized')
  }
  if (req.user.role !== 'admin') {
    res.status(403)
    throw new Error('Admin access required')
  }
  next()
}

module.exports = { protect, adminOnly }

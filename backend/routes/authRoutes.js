const express = require('express')
const { protect } = require('../middleware/auth.js')
const { login, me } = require('../controllers/authController.js')

const router = express.Router()

router.post('/login', login)
router.get('/me', protect, me)

module.exports = router

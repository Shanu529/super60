const express = require('express')
const { protect, adminOnly } = require('../middleware/auth.js')
const ctrl = require('../controllers/contactController.js')

const router = express.Router()

router.post('/', ctrl.createMessage)
router.get('/', protect, adminOnly, ctrl.getMessages)

module.exports = router

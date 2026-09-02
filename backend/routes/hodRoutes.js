const express = require('express')
const { protect, adminOnly } = require('../middleware/auth.js')
const ctrl = require('../controllers/hodController.js')

const router = express.Router()

router.get('/', ctrl.get)
router.put('/', protect, adminOnly, ctrl.upsert)

module.exports = router

const express = require('express')
const { protect } = require('../middleware/auth.js')
const ctrl = require('../controllers/hodController.js')

const router = express.Router()

router.get('/', ctrl.get)
router.put('/', protect, ctrl.upsert)

module.exports = router

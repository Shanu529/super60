const express = require('express')
const { protect, adminOnly } = require('../middleware/auth.js')
const ctrl = require('../controllers/announcementController.js')

const router = express.Router()

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/', protect, adminOnly, ctrl.create)
router.put('/:id', protect, adminOnly, ctrl.update)
router.delete('/:id', protect, adminOnly, ctrl.remove)

module.exports = router

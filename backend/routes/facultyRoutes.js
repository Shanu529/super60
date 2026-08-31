const express = require('express')
const { protect } = require('../middleware/auth.js')
const ctrl = require('../controllers/facultyController.js')

const router = express.Router()

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/', protect, ctrl.create)
router.put('/:id', protect, ctrl.update)
router.delete('/:id', protect, ctrl.remove)

module.exports = router

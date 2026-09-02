const express = require('express')
const { protect, adminOnly } = require('../middleware/auth.js')
const ctrl = require('../controllers/homepageController.js')

const router = express.Router()

router.get('/', ctrl.getHomepage)
router.put('/', protect, adminOnly, ctrl.updateHomepage)
router.get('/vision-mission', ctrl.getVisionMission)
router.get('/why-choose-us', ctrl.getWhyChooseUs)
router.get('/highlights', ctrl.getHighlights)
router.get('/stats', ctrl.getStats)
router.get('/achievement-stats', ctrl.getAchievementStats)
router.get('/contact', ctrl.getContact)

module.exports = router

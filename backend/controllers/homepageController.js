const asyncHandler = require('express-async-handler')
const Homepage = require('../models/Homepage.js')

async function getSingleton() {
  let doc = await Homepage.findOne()
  if (!doc) doc = await Homepage.create({})
  return doc
}

const getHomepage = asyncHandler(async (req, res) => {
  const doc = await getSingleton()
  res.json({ success: true, data: doc })
})

const updateHomepage = asyncHandler(async (req, res) => {
  let doc = await getSingleton()
  doc = await Homepage.findByIdAndUpdate(doc._id, req.body, { new: true, runValidators: true })
  res.json({ success: true, data: doc })
})

// Small helpers so the frontend can fetch one section at a time
// (used before the admin has customised anything, falling back
// gracefully to bundled static content if these are empty).
function sectionHandler(field) {
  return asyncHandler(async (req, res) => {
    const doc = await getSingleton()
    res.json({ success: true, data: doc[field] })
  })
}

module.exports = {
  getHomepage,
  updateHomepage,
  getVisionMission: asyncHandler(async (req, res) => {
    const doc = await getSingleton()
    res.json({ success: true, data: { vision: doc.vision, mission: doc.mission } })
  }),
  getWhyChooseUs: sectionHandler('whyChooseUs'),
  getHighlights: sectionHandler('highlights'),
  getStats: sectionHandler('stats'),
  getAchievementStats: sectionHandler('achievementStats'),
  getContact: sectionHandler('contact'),
}

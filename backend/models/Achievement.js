const mongoose = require('mongoose')

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tag: { type: String },
    description: { type: String },
    year: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Achievement', achievementSchema)

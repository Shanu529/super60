const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String },
    bio: { type: String },
    contributions: { type: [String], default: [] },
    responsibilities: { type: String },
    background: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Mentor', mentorSchema)

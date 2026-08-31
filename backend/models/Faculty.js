const mongoose = require('mongoose')

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    qualification: { type: String },
    bio: { type: String },
    subjects: { type: [String], default: [] },
    interests: { type: [String], default: [] },
    image: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Faculty', facultySchema)

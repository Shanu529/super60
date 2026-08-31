const mongoose = require('mongoose')

const hodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String },
    department: { type: String },
    bio: { type: String },
    education: { type: String },
    expertise: { type: [String], default: [] },
    research: { type: [String], default: [] },
    experience: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Hod', hodSchema)

const mongoose = require('mongoose')

const academicTeacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String },
    bio: { type: String },
    academicWork: { type: String },
    expertise: { type: [String], default: [] },
    experience: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('AcademicTeacher', academicTeacherSchema)

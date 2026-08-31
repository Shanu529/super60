const mongoose = require('mongoose')

const timelineItemSchema = new mongoose.Schema(
  {
    phase: { type: String, required: true },
    period: { type: String, required: true },
  },
  { _id: false }
)

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['Live', 'In Progress', 'Completed'], default: 'In Progress' },
    summary: { type: String },
    technologies: { type: [String], default: [] },
    features: { type: [String], default: [] },
    objectives: { type: [String], default: [] },
    timeline: { type: [timelineItemSchema], default: [] },
    team: { type: [String], default: [] },
    image: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Project', projectSchema)

const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tag: { type: String },
    date: { type: Date, required: true },
    excerpt: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Announcement', announcementSchema)

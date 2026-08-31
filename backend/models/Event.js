const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String },
    location: { type: String },
    category: { type: String },
    organizer: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)

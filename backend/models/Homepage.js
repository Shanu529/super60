const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({ icon: String, title: String, text: String }, { _id: false })
const statSchema = new mongoose.Schema({ icon: String, value: String, label: String }, { _id: false })
const socialSchema = new mongoose.Schema({ label: String, url: String }, { _id: false })

const homepageSchema = new mongoose.Schema(
  {
    vision: { type: String, default: '' },
    mission: { type: [String], default: [] },
    whyChooseUs: { type: [itemSchema], default: [] },
    highlights: { type: [itemSchema], default: [] },
    stats: { type: [statSchema], default: [] },
    contact: {
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      address: { type: String, default: '' },
      socials: { type: [socialSchema], default: [] },
    },
  },
  { timestamps: true }
)

// The homepage content is a singleton document — only one should ever exist.
module.exports = mongoose.model('Homepage', homepageSchema)

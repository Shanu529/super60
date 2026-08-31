// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const morgan = require('morgan')
// const path = require('path')

// const connectDB = require('./config/db.js')
// const { notFound, errorHandler } = require('./middleware/errorHandler.js')

// const authRoutes = require('./routes/authRoutes.js')
// const facultyRoutes = require('./routes/facultyRoutes.js')
// const hodRoutes = require('./routes/hodRoutes.js')
// const mentorRoutes = require('./routes/mentorRoutes.js')
// const teacherRoutes = require('./routes/teacherRoutes.js')
// const projectRoutes = require('./routes/projectRoutes.js')
// const eventRoutes = require('./routes/eventRoutes.js')
// const galleryRoutes = require('./routes/galleryRoutes.js')
// const announcementRoutes = require('./routes/announcementRoutes.js')
// const homepageRoutes = require('./routes/homepageRoutes.js')
// const contactRoutes = require('./routes/contactRoutes.js')
// const uploadRoutes = require('./routes/uploadRoutes.js')

// connectDB()

// const app = express()

// const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim())
// app.use(cors({ origin: allowedOrigins }))
// app.use(express.json())
// app.use(morgan('dev'))
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// app.get('/', (req, res) => {
//   res.json({ message: 'Super 60 Community API is running.' })
// })

// app.use('/api/auth', authRoutes)
// app.use('/api/faculty', facultyRoutes)
// app.use('/api/hod', hodRoutes)
// app.use('/api/mentor', mentorRoutes)
// app.use('/api/teacher', teacherRoutes)
// app.use('/api/projects', projectRoutes)
// app.use('/api/events', eventRoutes)
// app.use('/api/gallery', galleryRoutes)
// app.use('/api/announcements', announcementRoutes)
// app.use('/api/homepage', homepageRoutes)
// app.use('/api/contact', contactRoutes)
// app.use('/api/upload', uploadRoutes)

// app.use(notFound)
// app.use(errorHandler)

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const connectDB = require('./config/db.js')
const { notFound, errorHandler } = require('./middleware/errorHandler.js')

const authRoutes = require('./routes/authRoutes.js')
const facultyRoutes = require('./routes/facultyRoutes.js')
const hodRoutes = require('./routes/hodRoutes.js')
const mentorRoutes = require('./routes/mentorRoutes.js')
const teacherRoutes = require('./routes/teacherRoutes.js')
const projectRoutes = require('./routes/projectRoutes.js')
const eventRoutes = require('./routes/eventRoutes.js')
const galleryRoutes = require('./routes/galleryRoutes.js')
const announcementRoutes = require('./routes/announcementRoutes.js')
const homepageRoutes = require('./routes/homepageRoutes.js')
const contactRoutes = require('./routes/contactRoutes.js')
const uploadRoutes = require('./routes/uploadRoutes.js')

const app = express()

connectDB()

const allowedOrigins = (
  process.env.CLIENT_ORIGIN || 'http://localhost:5173'
)
  .split(',')
  .map((s) => s.trim())

app.use(
  cors({
    origin: allowedOrigins,
  })
)

app.use(express.json())
app.use(morgan('dev'))

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
)

app.get('/', (req, res) => {
  res.json({
    message: 'Super 60 Community API is running.',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/faculty', facultyRoutes)
app.use('/api/hod', hodRoutes)
app.use('/api/mentor', mentorRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/announcements', announcementRoutes)
app.use('/api/homepage', homepageRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/upload', uploadRoutes)

app.use(notFound)
app.use(errorHandler)

// Local development only
if (require.main === module) {
  const PORT = process.env.PORT || 5000

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

module.exports = app
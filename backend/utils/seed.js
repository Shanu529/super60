// Populates the database with the same content currently shown on the
// live site (so the admin panel and public pages have real data to
// start from) and creates the first admin account from your .env file.
//
// Usage:  npm run seed

require('dotenv').config()
const connectDB = require('../config/db.js')
const mongoose = require('mongoose')

const Admin = require('../models/Admin.js')
const Faculty = require('../models/Faculty.js')
const Hod = require('../models/Hod.js')
const Mentor = require('../models/Mentor.js')
const AcademicTeacher = require('../models/AcademicTeacher.js')
const Project = require('../models/Project.js')
const Event = require('../models/Event.js')
const GalleryItem = require('../models/GalleryItem.js')
const Announcement = require('../models/Announcement.js')
const Homepage = require('../models/Homepage.js')

async function run() {
  await connectDB()

  // --- Admin account ---
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@super60.org').toLowerCase()
  const existingAdmin = await Admin.findOne({ email: adminEmail })
  if (!existingAdmin) {
    await Admin.create({
      name: process.env.ADMIN_NAME || 'Super 60 Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
    })
    console.log(`Admin account created: ${adminEmail}`)
  } else {
    console.log(`Admin account already exists: ${adminEmail}`)
  }

  // --- HOD ---
 // --- HOD ---

if ((await Hod.countDocuments()) === 0) {
  await Hod.create({
    name: 'Mrs. Sapna Arora',
    designation: 'Head of Department, Computer Science & Engineering',
    department: 'Computer Science & Engineering',
    bio: 'Mrs. Sapna Arora has led the department for over a decade, shaping a curriculum that blends strong fundamentals with real-world, industry-aligned practice. She is the founding faculty sponsor of the Super 60 Community.',
    education: 'B.Tech. in Computer Science, M.Tech. in Software Engineering',
    expertise: ['Distributed Systems', 'Software Engineering', 'AI in Education'],
    research: ['Scalable Systems for EdTech', 'Applied Machine Learning'],
    experience: '18+ years in academia and applied research',
  })
}
  // --- Mentor ---
  if ((await Mentor.countDocuments()) === 0) {
    await Mentor.create({
      name: 'Prof. Gurmeet singh',
      designation: 'Faculty Mentor, Super 60 Community',
      bio: "Prof. Ananya Sharma mentors the Super 60 core team on project direction, event strategy and member growth. She works closely with student leads every week to keep the community's initiatives aligned with real learning outcomes.",
      contributions: [
        'Designed the mentorship framework connecting seniors with new members',
        'Established the faculty-reviewed project pipeline',
      ],
      responsibilities: 'Strategic oversight, faculty liaison, project reviews',
      background: 'M.Tech in Computer Science, 10+ years of teaching and industry consulting experience',
    })
  }

  // --- Academic Teacher (Vivek) ---
  if ((await AcademicTeacher.countDocuments()) === 0) {
    await AcademicTeacher.create({
      name: 'Dr. Vivek',
      designation: 'Academic Teacher & Technical Lead',
      bio: 'Vivek works directly with Super 60 members on technical depth — code reviews, architecture discussions and workshop delivery. He bridges classroom fundamentals with the hands-on demands of live projects.',
       education: 'B.Tech. in Computer Science, M.Tech. in Software Engineering. Phd. in Computer Science',
      academicWork: 'Leads applied workshops on web development, data structures and systems fundamentals.',
      expertise: ['Full-Stack Development', 'Data Structures & Algorithms', 'DevOps Fundamentals'],
      experience: '6+ years of teaching and software development experience',
    })
  }

  // --- Faculty list ---
  if ((await Faculty.countDocuments()) === 0) {
    await Faculty.insertMany([
      {
        name: 'Dr. Neha Kapoor',
        designation: 'Associate Professor',
        qualification: 'Ph.D. in Artificial Intelligence',
        bio: 'Focuses on applied AI and guides members building ML-driven projects.',
        subjects: ['Machine Learning', 'Data Mining'],
        interests: ['AI Ethics', 'Computer Vision'],
      },
      {
        name: 'Prof. Aditya Rao',
        designation: 'Assistant Professor',
        qualification: 'M.Tech in Computer Networks',
        bio: "Runs the community's infrastructure and networking workshops.",
        subjects: ['Computer Networks', 'Cloud Computing'],
        interests: ['DevOps', 'Cloud Architecture'],
      },
      {
        name: 'Dr. Priya Nair',
        designation: 'Associate Professor',
        qualification: 'Ph.D. in Human-Computer Interaction',
        bio: 'Advises design-track members on UX research and interaction design.',
        subjects: ['HCI', 'UI/UX Design'],
        interests: ['Design Systems', 'Accessibility'],
      },
      {
        name: 'Prof. Karan Malhotra',
        designation: 'Assistant Professor',
        qualification: 'M.Tech in Software Engineering',
        bio: 'Mentors the fullstack development track and code-quality reviews.',
        subjects: ['Software Engineering', 'Web Technologies'],
        interests: ['Clean Architecture', 'Open Source'],
      },
    ])
  }

  // --- Projects ---
  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      {
        title: 'Campus Connect',
        slug: 'campus-connect',
        category: 'Web Platform',
        status: 'Live',
        summary: 'A unified events & announcements hub for every department on campus.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        features: ['Real-time announcements', 'Department-wise event calendars', 'Role-based access'],
        objectives: ['Centralize campus communication', 'Reduce reliance on scattered notice boards'],
        timeline: [
          { phase: 'Research', period: 'Jan 2026' },
          { phase: 'Build', period: 'Feb – Apr 2026' },
          { phase: 'Launch', period: 'May 2026' },
        ],
        team: ['Ishaan Verma', 'Riya Sen', 'Dr. Neha Kapoor (Faculty Advisor)'],
        featured: true,
      },
      {
        title: 'Smart Attendance (ML)',
        slug: 'ml-attendance',
        category: 'Machine Learning',
        status: 'In Progress',
        summary: 'Face-recognition based attendance system built and piloted with faculty support.',
        technologies: ['Python', 'OpenCV', 'Flask', 'React'],
        features: ['Live face detection', 'Attendance analytics dashboard', 'Export to CSV'],
        objectives: ['Cut manual attendance time', 'Pilot AI tooling on real classroom data'],
        timeline: [
          { phase: 'Prototype', period: 'Mar 2026' },
          { phase: 'Faculty Pilot', period: 'Jun 2026' },
        ],
        team: ['Aarav Singh', 'Meera Joshi', 'Prof. Aditya Rao (Faculty Advisor)'],
        featured: true,
      },
      {
        title: 'Community Marketplace',
        slug: 'community-marketplace',
        category: 'Web Platform',
        status: 'Completed',
        summary: 'A peer-to-peer marketplace for students to exchange books, notes and gear.',
        technologies: ['React', 'Firebase'],
        features: ['Listing management', 'In-app chat', 'Saved searches'],
        objectives: ['Encourage resource sharing among students', 'Reduce cost of course materials'],
        timeline: [
          { phase: 'Design', period: 'Aug 2025' },
          { phase: 'Build & Launch', period: 'Sep – Nov 2025' },
        ],
        team: ['Sana Iqbal', 'Dev Patel'],
        featured: true,
      },
    ])
  }

  // --- Events ---
  if ((await Event.countDocuments()) === 0) {
    await Event.insertMany([
      {
        title: 'Google Cloud Study Jams 2025-26',
        date: new Date('2026-04-23'),
        time: '3:00 PM',
        location: 'U - Zone',
        category: 'Workshop',
        organizer: 'Super 60 Community',
        description:
          'A hands-on cloud computing series where members work through real Google Cloud labs together, earn skill badges, and get support from peers who have already cleared the track.',
      },
      {
        title: 'Global Futures Summit 3.0',
        date: new Date('2026-04-11'),
        time: '10:00 AM',
        location: 'SVIET Auditorium',
        category: 'Summit',
        organizer: 'Super 60 Community',
        description:
          'Our flagship summit bringing together speakers from across the industry to talk about where technology, careers and campus innovation are headed next.',
      },
      {
        title: 'Global Futures Summit 3.0 x Google IDEATE 3.0',
        date: new Date('2026-04-10'),
        time: '9:00 AM',
        location: 'SVIET Auditorium',
        category: 'Ideathon',
        organizer: 'Super 60 Community x GDG',
        description:
          'A joint ideation sprint with Google Developer Groups — teams pitch product ideas to a panel of mentors and judges.',
      },
      {
        title: 'Agentic AI Workshop',
        date: new Date('2026-04-09'),
        time: '11:00 AM',
        location: 'SVIET Auditorium',
        category: 'Workshop',
        organizer: 'Super 60 Community',
        description:
          'A hands-on workshop exploring how to design and build agentic AI systems, from tool use and planning loops to evaluation.',
      },
    ])
  }

  // --- Gallery ---
  if ((await GalleryItem.countDocuments()) === 0) {
    await GalleryItem.insertMany([
      { title: 'Induction Day', category: 'Events' },
      { title: 'Hackathon Finals', category: 'Competitions' },
      { title: 'Weekly Build Session', category: 'Community' },
      { title: 'Guest Talk: Systems Design', category: 'Speaker Series' },
      { title: 'Project Showcase', category: 'Projects' },
      { title: 'Community Meetup', category: 'Community' },
    ])
  }

  // --- Announcements ---
  if ((await Announcement.countDocuments()) === 0) {
    await Announcement.insertMany([
      {
        title: 'Applications open for Batch 2026 induction',
        date: new Date('2026-08-01'),
        tag: 'Recruitment',
        excerpt: 'Super 60 is opening a fresh round of inductions for first and second-year students.',
      },
      {
        title: 'Faculty-mentored project showcase — Aug 20',
        date: new Date('2026-07-22'),
        tag: 'Event',
        excerpt: 'Selected member projects will be presented to faculty and industry guests.',
      },
      {
        title: 'New research collaboration with the CS department',
        date: new Date('2026-07-10'),
        tag: 'Research',
        excerpt: 'Members can now apply to assist on ongoing faculty research initiatives.',
      },
    ])
  }

  // --- Homepage content ---
  if ((await Homepage.countDocuments()) === 0) {
    await Homepage.create({
      vision:
        "To build India's most active student-led tech community — a place where curiosity turns into capability, and capability turns into impact.",
      mission: [
        'Give every member hands-on experience through real projects, not just theory.',
        'Connect students with mentors, alumni and industry partners.',
        'Run events that make learning to code, design and build genuinely fun.',
        'Champion inclusivity — Super 60 is open to every branch, every year.',
      ],
      whyChooseUs: [
        { icon: '🚀', title: 'Real Projects', text: 'Ship products that go live, not just classroom assignments.' },
        { icon: '🧑\u200d🏫', title: 'Faculty Mentorship', text: 'Direct guidance from HODs, mentors and senior faculty.' },
        { icon: '🤝', title: 'Strong Network', text: '60+ active members across design, dev and leadership tracks.' },
        { icon: '🏆', title: 'Recognised Achievements', text: 'Award-winning projects and community-driven wins.' },
      ],
      highlights: [
        { icon: '💻', title: 'Weekly Build Sessions', text: 'Hands-on sprints where members ship real features together.' },
        { icon: '🎤', title: 'Speaker Series', text: 'Talks from alumni, faculty and industry engineers.' },
        { icon: '🌐', title: 'Open Source Fridays', text: 'Contributing to real repositories as a community.' },
        { icon: '🎉', title: 'Community Meetups', text: 'Casual, high-energy get-togethers every month.' },
      ],
      stats: [
        { icon: '👥', value: '60+', label: 'Active Members' },
        { icon: '💼', value: '25+', label: 'Projects Shipped' },
        { icon: '🏅', value: '15+', label: 'Awards & Recognitions' },
        { icon: '📅', value: '40+', label: 'Events Hosted' },
      ],
      contact: {
        email: 'hello@super60community.org',
        phone: '+91 98765 43210',
        address: 'Department of Computer Science & Engineering, Main Campus',
        socials: [
          { label: 'Instagram', url: '#' },
          { label: 'LinkedIn', url: '#' },
          { label: 'GitHub', url: '#' },
        ],
      },
    })
  }

  console.log('Seed complete.')
  await mongoose.connection.close()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

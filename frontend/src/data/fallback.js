// Static content used until the backend/admin panel supplies real data.
// Keeping this in one place means every page renders fully even when
// the API is offline, and the shapes here match the Mongoose models
// 1:1 so swapping to live data is seamless.

export const visionMission = {
  vision:
    "To build India's most active student-led tech community — a place where curiosity turns into capability, and capability turns into impact.",
  mission: [
    'Give every member hands-on experience through real projects, not just theory.',
    'Connect students with mentors, alumni and industry partners.',
    'Run events that make learning to code, design and build genuinely fun.',
    'Champion inclusivity — Super 60 is open to every branch, every year.',
  ],
}

export const whyChooseUs = [
  { icon: '🚀', title: 'Real Projects', text: 'Ship products that go live, not just classroom assignments.' },
  { icon: '🧑\u200d🏫', title: 'Faculty Mentorship', text: 'Direct guidance from HODs, mentors and senior faculty.' },
  { icon: '🤝', title: 'Strong Network', text: '60+ active members across design, dev and leadership tracks.' },
  { icon: '🏆', title: 'Recognised Achievements', text: 'Award-winning projects and community-driven wins.' },
]

export const highlights = [
  { icon: '💻', title: 'Weekly Build Sessions', text: 'Hands-on sprints where members ship real features together.' },
  { icon: '🎤', title: 'Speaker Series', text: 'Talks from alumni, faculty and industry engineers.' },
  { icon: '🌐', title: 'Open Source Fridays', text: 'Contributing to real repositories as a community.' },
  { icon: '🎉', title: 'Community Meetups', text: 'Casual, high-energy get-togethers every month.' },
]

export const stats = [
  { icon: '👥', value: '60+', label: 'Active Members' },
  { icon: '💼', value: '25+', label: 'Projects Shipped' },
  { icon: '🏅', value: '15+', label: 'Awards & Recognitions' },
  { icon: '📅', value: '40+', label: 'Events Hosted' },
]

export const announcements = [
  {
    _id: 'a1',
    title: 'Applications open for Batch 2026 induction',
    date: '2026-08-01',
    tag: 'Recruitment',
    excerpt: 'Super 60 is opening a fresh round of inductions for first and second-year students.',
  },
  {
    _id: 'a2',
    title: 'Faculty-mentored project showcase — Aug 20',
    date: '2026-07-22',
    tag: 'Event',
    excerpt: 'Selected member projects will be presented to faculty and industry guests.',
  },
  {
    _id: 'a3',
    title: 'New research collaboration with the CS department',
    date: '2026-07-10',
    tag: 'Research',
    excerpt: 'Members can now apply to assist on ongoing faculty research initiatives.',
  },
]

export const events = [
  {
    _id: 'e1',
    title: 'Google Cloud Study Jams 2025-26',
    date: '2026-04-23',
    time: '3:00 PM',
    location: 'U - Zone',
    category: 'Workshop',
    organizer: 'Super 60 Community',
    description:
      'A hands-on cloud computing series where members work through real Google Cloud labs together, earn skill badges, and get support from peers who have already cleared the track. Bring a laptop — swag and certificates for everyone who completes the track.',
  },
  {
    _id: 'e2',
    title: 'Global Futures Summit 3.0',
    date: '2026-04-11',
    time: '10:00 AM',
    location: 'SVIET Auditorium',
    category: 'Summit',
    organizer: 'Super 60 Community',
    description:
      'Our flagship summit bringing together speakers from across the industry to talk about where technology, careers and campus innovation are headed next. Expect keynotes, panel discussions, and open Q&A with the speaker lineup.',
  },
  {
    _id: 'e3',
    title: 'Global Futures Summit 3.0 x Google IDEATE 3.0',
    date: '2026-04-10',
    time: '9:00 AM',
    location: 'SVIET Auditorium',
    category: 'Ideathon',
    organizer: 'Super 60 Community x GDG',
    description:
      'A joint ideation sprint with Google Developer Groups — teams pitch product ideas to a panel of mentors and judges, with the best ideas fast-tracked into the Super 60 project pipeline.',
  },
  {
    _id: 'e4',
    title: 'Agentic AI Workshop',
    date: '2026-04-09',
    time: '11:00 AM',
    location: 'SVIET Auditorium',
    category: 'Workshop',
    organizer: 'Super 60 Community',
    description:
      'A hands-on workshop exploring how to design and build agentic AI systems — from tool use and planning loops to evaluation. Members leave with a working prototype and a starter repo.',
  },
]

export const galleryPreview = [
  { _id: 'g1', title: 'Induction Day', category: 'Events' },
  { _id: 'g2', title: 'Hackathon Finals', category: 'Competitions' },
  { _id: 'g3', title: 'Weekly Build Session', category: 'Community' },
  { _id: 'g4', title: 'Guest Talk: Systems Design', category: 'Speaker Series' },
  { _id: 'g5', title: 'Project Showcase', category: 'Projects' },
  { _id: 'g6', title: 'Community Meetup', category: 'Community' },
]

export const hod = {
  name: 'Dr. Rajesh Mehta',
  designation: 'Head of Department, Computer Science & Engineering',
  department: 'Computer Science & Engineering',
  bio:
    'Dr. Rajesh Mehta has led the department for over a decade, shaping a curriculum that blends strong fundamentals with real-world, industry-aligned practice. He is the founding faculty sponsor of the Super 60 Community.',
  education: 'Ph.D. in Computer Science, M.Tech in Software Engineering',
  expertise: ['Distributed Systems', 'Software Engineering', 'AI in Education'],
  research: ['Scalable Systems for EdTech', 'Applied Machine Learning'],
  experience: '18+ years in academia and applied research',
}

export const mentor = {
  name: 'Prof. Ananya Sharma',
  designation: 'Faculty Mentor, Super 60 Community',
  bio:
    "Prof. Ananya Sharma mentors the Super 60 core team on project direction, event strategy and member growth. She works closely with student leads every week to keep the community's initiatives aligned with real learning outcomes.",
  contributions: [
    'Designed the mentorship framework connecting seniors with new members',
    'Established the faculty-reviewed project pipeline',
  ],
  responsibilities: 'Strategic oversight, faculty liaison, project reviews',
  background: 'M.Tech in Computer Science, 10+ years of teaching and industry consulting experience',
}

export const academicTeacher = {
  name: 'Vivek',
  designation: 'Academic Teacher & Technical Lead',
  bio:
    'Vivek works directly with Super 60 members on technical depth — code reviews, architecture discussions and workshop delivery. He bridges classroom fundamentals with the hands-on demands of live projects.',
  academicWork: 'Leads applied workshops on web development, data structures and systems fundamentals.',
  expertise: ['Full-Stack Development', 'Data Structures & Algorithms', 'DevOps Fundamentals'],
  experience: '6+ years of teaching and software development experience',
}

export const facultyList = [
  {
    _id: 'f1',
    name: 'Dr. Neha Kapoor',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Artificial Intelligence',
    bio: 'Focuses on applied AI and guides members building ML-driven projects.',
    subjects: ['Machine Learning', 'Data Mining'],
    interests: ['AI Ethics', 'Computer Vision'],
  },
  {
    _id: 'f2',
    name: 'Prof. Aditya Rao',
    designation: 'Assistant Professor',
    qualification: 'M.Tech in Computer Networks',
    bio: "Runs the community's infrastructure and networking workshops.",
    subjects: ['Computer Networks', 'Cloud Computing'],
    interests: ['DevOps', 'Cloud Architecture'],
  },
  {
    _id: 'f3',
    name: 'Dr. Priya Nair',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Human-Computer Interaction',
    bio: 'Advises design-track members on UX research and interaction design.',
    subjects: ['HCI', 'UI/UX Design'],
    interests: ['Design Systems', 'Accessibility'],
  },
  {
    _id: 'f4',
    name: 'Prof. Karan Malhotra',
    designation: 'Assistant Professor',
    qualification: 'M.Tech in Software Engineering',
    bio: 'Mentors the fullstack development track and code-quality reviews.',
    subjects: ['Software Engineering', 'Web Technologies'],
    interests: ['Clean Architecture', 'Open Source'],
  },
]

export const projects = [
  {
    _id: 'p1',
    slug: 'campus-connect',
    title: 'Campus Connect',
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
  },
  {
    _id: 'p2',
    slug: 'ml-attendance',
    title: 'Smart Attendance (ML)',
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
  },
  {
    _id: 'p3',
    slug: 'community-marketplace',
    title: 'Community Marketplace',
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
  },
]

export const contactInfo = {
  email: 'hello@super60community.org',
  phone: '+91 98765 43210',
  address: 'Department of Computer Science & Engineering, Main Campus',
  socials: [
    { label: 'Instagram', url: '#' },
    { label: 'LinkedIn', url: '#' },
    { label: 'GitHub', url: '#' },
  ],
}

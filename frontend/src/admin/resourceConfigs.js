// Field/column definitions consumed by the generic ResourceManager.
// `type: 'tags'` fields are edited as comma-separated text and stored as arrays.

export const resourceConfigs = {
  faculty: {
    title: 'Faculty Members',
    endpoint: '/faculty',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'designation', label: 'Designation' },
      { key: 'qualification', label: 'Qualification' },
    ],
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'designation', label: 'Designation', type: 'text' },
      { name: 'qualification', label: 'Qualification', type: 'text' },
      { name: 'bio', label: 'Short Paragraph', type: 'textarea' },
      { name: 'subjects', label: 'Subjects Taught (comma separated)', type: 'tags' },
      { name: 'interests', label: 'Areas of Interest (comma separated)', type: 'tags' },
      { name: 'image', label: 'Photo', type: 'file' },
    ],
  },
  projects: {
    title: 'Projects',
    endpoint: '/projects',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'slug', label: 'Slug (url-friendly, e.g. campus-connect)', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: ['Live', 'In Progress', 'Completed'] },
      { name: 'summary', label: 'Summary', type: 'textarea' },
      { name: 'technologies', label: 'Technologies (comma separated)', type: 'tags' },
      { name: 'features', label: 'Features (comma separated)', type: 'tags' },
      { name: 'objectives', label: 'Objectives (comma separated)', type: 'tags' },
      { name: 'team', label: 'Team Members (comma separated)', type: 'tags' },
      { name: 'image', label: 'Cover Image', type: 'file' },
      { name: 'featured', label: 'Show in Featured Projects', type: 'checkbox' },
    ],
  },
  events: {
    title: 'Events',
    endpoint: '/events',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'date', label: 'Date' },
      { key: 'time', label: 'Time' },
      { key: 'location', label: 'Location' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'time', label: 'Time (e.g. 3:00 PM)', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'organizer', label: 'Organizer', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Cover Image', type: 'file' },
    ],
  },
  gallery: {
    title: 'Gallery',
    endpoint: '/gallery',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'image', label: 'Photo', type: 'file' },
    ],
  },
  announcements: {
    title: 'Announcements',
    endpoint: '/announcements',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'tag', label: 'Tag' },
      { key: 'date', label: 'Date' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'tag', label: 'Tag', type: 'text' },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
    ],
  },
}

export const singletonConfigs = {
  hod: {
    title: 'Head of Department',
    endpoint: '/hod',
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'designation', label: 'Designation', type: 'text' },
      { name: 'department', label: 'Department', type: 'text' },
      { name: 'bio', label: 'Short Professional Biography', type: 'textarea' },
      { name: 'education', label: 'Academic Background', type: 'text' },
      { name: 'expertise', label: 'Areas of Expertise (comma separated)', type: 'tags' },
      { name: 'research', label: 'Research Interests (comma separated)', type: 'tags' },
      { name: 'experience', label: 'Experience', type: 'text' },
      { name: 'image', label: 'Profile Image', type: 'file' },
    ],
  },
  mentor: {
    title: 'Our Mentor',
    endpoint: '/mentor',
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'designation', label: 'Designation', type: 'text' },
      { name: 'bio', label: 'Detailed Paragraph', type: 'textarea' },
      { name: 'contributions', label: 'Academic Contributions (comma separated)', type: 'tags' },
      { name: 'responsibilities', label: 'Responsibilities', type: 'text' },
      { name: 'background', label: 'Professional Background', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'file' },
    ],
  },
  teacher: {
    title: 'Academic Teacher',
    endpoint: '/teacher',
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'designation', label: 'Designation', type: 'text' },
      { name: 'bio', label: 'Detailed Paragraph', type: 'textarea' },
      { name: 'academicWork', label: 'Academic Work', type: 'textarea' },
      { name: 'expertise', label: 'Teaching Expertise (comma separated)', type: 'tags' },
      { name: 'experience', label: 'Experience', type: 'text' },
      { name: 'image', label: 'Profile Image', type: 'file' },
    ],
  },
}

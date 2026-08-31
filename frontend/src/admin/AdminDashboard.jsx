import { Link } from 'react-router-dom'

const CARDS = [
  { to: '/admin/faculty', label: 'Faculty Members', desc: 'Add, edit or remove faculty profiles.' },
  { to: '/admin/hod', label: 'Head of Department', desc: 'Update the HOD featured card.' },
  { to: '/admin/mentor', label: 'Our Mentor', desc: 'Update the mentor featured card.' },
  { to: '/admin/teacher', label: 'Academic Teacher', desc: 'Update the academic teacher card.' },
  { to: '/admin/projects', label: 'Projects', desc: 'Manage project listings and details.' },
  { to: '/admin/events', label: 'Events', desc: 'Manage upcoming and past events.' },
  { to: '/admin/gallery', label: 'Gallery', desc: 'Manage photo gallery entries.' },
  { to: '/admin/announcements', label: 'Announcements', desc: 'Post and manage announcements.' },
  { to: '/admin/homepage', label: 'Homepage Content', desc: 'Edit vision, highlights, stats & contact info.' },
]

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Welcome back 👋</h1>
      <p className="admin-dashboard-sub">Everything on the site is managed from here — no code changes needed.</p>
      <div className="admin-dashboard-grid">
        {CARDS.map((c) => (
          <Link to={c.to} key={c.to} className="admin-dashboard-card">
            <h3>{c.label}</h3>
            <p>{c.desc}</p>
            <span>Manage ↗</span>
          </Link>
        ))}
      </div>

      <style>{`
        .admin-dashboard h1 { font-family: var(--font-display); font-size: 26px; margin: 0 0 6px; }
        .admin-dashboard-sub { color: var(--grey); margin: 0 0 28px; }
        .admin-dashboard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .admin-dashboard-card {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 22px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .admin-dashboard-card:hover { transform: translateY(-4px); border-color: var(--red); }
        .admin-dashboard-card h3 { font-family: var(--font-display); font-size: 16px; margin: 0 0 8px; }
        .admin-dashboard-card p { color: var(--grey); font-size: 13px; line-height: 1.6; margin: 0 0 14px; }
        .admin-dashboard-card span { color: var(--red); font-size: 13px; font-weight: 600; }
        @media (max-width: 900px) {
          .admin-dashboard-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .admin-dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { adminLogout, adminName } from './adminAuth.js'

const LINKS = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/faculty', label: 'Faculty' },
  { to: '/admin/hod', label: 'HOD' },
  { to: '/admin/mentor', label: 'Mentor' },
  { to: '/admin/teacher', label: 'Academic Teacher' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/gallery', label: 'Gallery' },
  { to: '/admin/announcements', label: 'Announcements' },
  { to: '/admin/homepage', label: 'Homepage Content' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    adminLogout()
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-red">the</span> Super 60 <span>Admin</span>
        </div>
        <nav>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <span>{adminName()}</span>
          <button type="button" className="admin-logout" onClick={handleLogout}>Log Out</button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>

      <style>{`
        .admin-shell {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 240px 1fr;
          background: var(--bg);
        }
        .admin-sidebar {
          border-right: 1px solid var(--line);
          padding: 28px 18px;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .admin-brand {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 28px;
          padding: 0 10px;
        }
        .admin-brand span:last-child { color: var(--grey); font-weight: 500; font-size: 12px; }
        .admin-sidebar nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex-grow: 1;
        }
        .admin-nav-link {
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 14px;
          color: var(--grey);
          transition: background 0.2s ease, color 0.2s ease;
        }
        .admin-nav-link:hover { background: var(--bg-panel); color: var(--white); }
        .admin-nav-link.active { background: var(--red-soft); color: var(--red); font-weight: 600; }
        .admin-sidebar-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          border-top: 1px solid var(--line);
          font-size: 13px;
          color: var(--grey);
        }
        .admin-logout {
          background: transparent;
          border: none;
          color: var(--red);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .admin-content { padding: 32px 40px; overflow-x: hidden; }
        @media (max-width: 860px) {
          .admin-shell { grid-template-columns: 1fr; }
          .admin-sidebar { position: static; height: auto; }
          .admin-content { padding: 24px; }
        }
      `}</style>
    </div>
  )
}

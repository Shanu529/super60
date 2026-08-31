import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from './adminAuth.js'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await adminLogin(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials and that the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit} className="admin-login-card">
        <div className="admin-login-brand">
          <span className="brand-red">the</span> Super 60 <span>Admin</span>
        </div>
        <p className="admin-login-sub">Sign in to manage faculty, projects, events and more.</p>
        {error && <div className="admin-error">{error}</div>}
        <label>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@super60.org" />
        </label>
        <label>
          Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </label>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'} <span className="btn-icon">↗</span>
        </button>
      </form>

      <style>{`
        .admin-login {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          padding: 24px;
        }
        .admin-login-card {
          width: 100%;
          max-width: 380px;
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .admin-login-brand {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 20px;
          color: var(--white);
        }
        .admin-login-brand span:last-child {
          color: var(--grey);
          font-weight: 500;
          font-size: 14px;
        }
        .admin-login-sub { color: var(--grey); font-size: 13px; margin: -8px 0 8px; }
        .admin-login-card label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          color: var(--grey);
          font-family: var(--font-display);
          font-weight: 600;
        }
        .admin-login-card input {
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 12px 14px;
          color: var(--white);
          font-size: 14px;
        }
        .admin-login-card input:focus { outline: none; border-color: var(--red); }
        .admin-error {
          background: rgba(240, 60, 20, 0.12);
          color: #ff8a6a;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 10px;
        }
        .admin-login-card .btn { justify-content: center; margin-top: 8px; }
      `}</style>
    </div>
  )
}

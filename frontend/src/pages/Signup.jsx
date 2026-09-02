import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/motion/Reveal.jsx'
import { signup } from '../lib/userAuth.js'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // Signup always creates a normal ("user") account — admin access
      // is never granted through this form, only via a database role
      // change made by an existing admin.
      await signup(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-enter auth-page">
      <Reveal as="section" className="auth-hero">
        <div className="container auth-inner">
          <span className="eyebrow">Join Us</span>
          <h1>Create your account</h1>
          <p className="lead">Sign up to join the Super 60 Community.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="admin-error">{error}</div>}
            <label>
              Name
              <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@college.edu" />
            </label>
            <label>
              Password
              <input type="password" name="password" required minLength={6} value={form.password} onChange={handleChange} placeholder="At least 6 characters" />
            </label>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating account…' : 'Sign Up'} <span className="btn-icon">↗</span>
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </Reveal>

      <style>{`
        .auth-hero { padding-top: 72px; padding-bottom: 72px; }
        .auth-inner {
          max-width: 420px;
          margin: 0 auto;
          text-align: center;
        }
        .auth-inner h1 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(26px, 4vw, 36px);
          margin: 14px 0 8px;
        }
        .auth-inner .lead { color: var(--grey); margin: 0 0 32px; }
        .auth-form {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }
        .auth-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          color: var(--grey);
          font-family: var(--font-display);
          font-weight: 600;
        }
        .auth-form input {
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 12px 14px;
          color: var(--white);
          font-family: var(--font-body);
          font-size: 14px;
        }
        .auth-form input:focus { outline: none; border-color: var(--red); }
        .auth-form .btn { justify-content: center; margin-top: 4px; }
        .auth-switch { margin-top: 20px; color: var(--grey); font-size: 14px; }
        .auth-switch a { color: var(--red); font-weight: 600; }
      `}</style>
    </div>
  )
}

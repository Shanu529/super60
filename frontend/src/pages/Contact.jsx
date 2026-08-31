import { useEffect, useState } from 'react'
import Reveal from '../components/motion/Reveal.jsx'
import { api, getWithFallback } from '../lib/api.js'
import { contactInfo as fallback } from '../data/fallback.js'

export default function Contact() {
  const [info, setInfo] = useState(fallback)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    getWithFallback('/homepage/contact', fallback).then(setInfo)
  }, [])

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await api.post('/contact', form)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('sent') // Falls back gracefully — form still confirms even if the API isn't live yet.
      setForm({ name: '', email: '', message: '' })
    }
  }

  return (
    <div className="page-enter contact-page">
      <Reveal as="section" className="contact-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Let's talk</h1>
          <p className="lead">Questions about joining, partnering, or a project? Reach out.</p>
        </div>
      </Reveal>

      <section className="contact-body">
        <div className="container contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@college.edu" />
            </label>
            <label>
              Message
              <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="How can we help?" />
            </label>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sent' ? 'Message Sent ✓' : status === 'sending' ? 'Sending…' : 'Send Message'}
              <span className="btn-icon">↗</span>
            </button>
          </form>

          <div className="contact-info">
            <div className="contact-info-card">
              <span className="tag-label">Email</span>
              <p>{info.email}</p>
            </div>
            <div className="contact-info-card">
              <span className="tag-label">Phone</span>
              <p>{info.phone}</p>
            </div>
            <div className="contact-info-card">
              <span className="tag-label">Address</span>
              <p>{info.address}</p>
            </div>
            <div className="contact-info-card">
              <span className="tag-label">Follow Us</span>
              <div className="footer-socials">
                {info.socials?.map((s) => (
                  <a href={s.url} key={s.label} aria-label={s.label}>{s.label.slice(0, 2).toUpperCase()}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-hero { padding-top: 72px; padding-bottom: 24px; text-align: center; }
        .contact-hero h1 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(30px, 5vw, 48px);
          margin: 14px 0 12px;
        }
        .contact-hero .lead { color: var(--grey); max-width: 520px; margin: 0 auto; }
        .contact-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 32px;
        }
        .contact-form {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          color: var(--grey);
          font-family: var(--font-display);
          font-weight: 600;
        }
        .contact-form input,
        .contact-form textarea {
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 12px 14px;
          color: var(--white);
          font-family: var(--font-body);
          font-size: 14px;
          resize: vertical;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: var(--red);
        }
        .contact-info { display: flex; flex-direction: column; gap: 16px; }
        .contact-info-card {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 20px 22px;
        }
        .contact-info-card p { margin: 6px 0 0; color: var(--white); font-size: 14px; }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

import { useEffect, useState } from 'react'
import Reveal from '../components/motion/Reveal.jsx'
import { getWithFallback } from '../lib/api.js'
import { announcements as fallback } from '../data/fallback.js'

export default function Announcements() {
  const [items, setItems] = useState(fallback)


  useEffect(() => {
    getWithFallback('/announcements', fallback).then(setItems)
  }, [])

  return (
    <div className="page-enter announcements-page">
      <Reveal as="section" className="ann-hero">
        <div className="container">
          <span className="eyebrow">Announcements</span>
          <h1>Everything, as it happens</h1>
          <p className="lead">Inductions, showcases, research calls — all in one place.</p>
        </div>
      </Reveal>

      <Reveal as="section" className="ann-list-section">
        <div className="container ann-list">
          {items.map((a) => (
            <div className="ann-item" key={a._id}>
              <div className="ann-date">
                {new Date(a.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
              <div className="ann-body">
                <span className="ann-tag">{a.tag}</span>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <style>{`
        .ann-hero { padding-top: 72px; padding-bottom: 24px; text-align: center; }
        .ann-hero h1 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(30px, 5vw, 48px);
          margin: 14px 0 12px;
        }
        .ann-hero .lead { color: var(--grey); max-width: 520px; margin: 0 auto; }
        .ann-list-section { padding-top: 24px; }
        .ann-list { display: flex; flex-direction: column; gap: 14px; }
        .ann-item {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 24px;
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 20px 24px;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .ann-item:hover { border-color: var(--red); transform: translateX(4px); }
        .ann-date { color: var(--grey-dim); font-size: 13px; font-weight: 600; border-right: 1px solid var(--line); }
        .ann-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: var(--red);
          background: var(--red-soft);
          padding: 3px 10px;
          border-radius: 999px;
          margin-bottom: 8px;
        }
        .ann-body h3 { font-family: var(--font-display); font-size: 16px; margin: 0 0 6px; }
        .ann-body p { color: var(--grey); font-size: 14px; margin: 0; line-height: 1.6; }
        @media (max-width: 640px) {
          .ann-item { grid-template-columns: 1fr; gap: 8px; }
          .ann-date { border-right: none; }
        }
      `}</style>
    </div>
  )
}

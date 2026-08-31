import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/motion/Reveal.jsx'
import RevealGroup from '../components/motion/RevealGroup.jsx'
import RevealItem from '../components/motion/RevealItem.jsx'
import { fadeUp } from '../lib/motion.js'
import { getWithFallback, resolveImage, placeholderFor } from '../lib/api.js'
import { projects as fallback } from '../data/fallback.js'

export default function Projects() {
  const [items, setItems] = useState(fallback)
  const [category, setCategory] = useState('All')


  useEffect(() => {
    getWithFallback('/projects', fallback).then(setItems)
  }, [])

  const categories = useMemo(() => ['All', ...new Set(items.map((p) => p.category))], [items])
  const filtered = category === 'All' ? items : items.filter((p) => p.category === category)

  return (
    <div className="page-enter projects-page">
      <Reveal as="section" className="projects-hero">
        <div className="container">
          <span className="eyebrow">Our Projects</span>
          <h1>Built by members, reviewed by faculty</h1>
          <p className="lead">
            Every project here started as an idea in a weekly build session — some are live, some are
            still in motion.
          </p>

          <div className="category-filters">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-chip ${c === category ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="projects-grid-section">
        <RevealGroup as="div" className="container projects-grid" stagger={0.08}>
          {filtered.map((p) => (
            <RevealItem as="div" variants={fadeUp} key={p._id}>
              <Link to={`/projects/${p.slug}`} className="proj-card">
                <img
                  className="fp-cover-img"
                  src={resolveImage(p.image, 'project')}
                  alt={p.title}
                  onError={(e) => { e.currentTarget.src = placeholderFor('project') }}
                />
                <div className="proj-top">
                  <span className="fp-category">{p.category}</span>
                  <span className={`fp-status fp-status-${p.status?.toLowerCase().replace(' ', '-')}`}>{p.status}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <div className="fp-tech">
                  {p.technologies?.slice(0, 4).map((t) => <span key={t}>{t}</span>)}
                </div>
                <span className="fp-link">View Details ↗</span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Reveal>

      <style>{`
        .projects-hero {
          padding-top: 72px;
          padding-bottom: 24px;
          text-align: center;
        }
        .projects-hero h1 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(30px, 5vw, 48px);
          margin: 14px 0 12px;
        }
        .projects-hero .lead {
          color: var(--grey);
          max-width: 560px;
          margin: 0 auto 28px;
        }
        .category-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .filter-chip {
          border: 1px solid var(--line);
          background: transparent;
          color: var(--grey);
          border-radius: 999px;
          padding: 8px 18px;
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .filter-chip:hover { border-color: var(--red); color: var(--white); }
        .filter-chip.active {
          background: var(--red);
          border-color: var(--red);
          color: var(--white);
        }
        .projects-grid-section { padding-top: 24px; }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .proj-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 24px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .proj-card:hover { transform: translateY(-6px); border-color: var(--red); }
        .fp-cover-img {
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 16px;
          border: 1px solid var(--line);
        }
        .proj-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .proj-card h3 { font-family: var(--font-display); font-size: 18px; margin: 0 0 8px; }
        .proj-card p { color: var(--grey); font-size: 14px; line-height: 1.6; margin: 0 0 16px; flex-grow: 1; }
        @media (max-width: 860px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

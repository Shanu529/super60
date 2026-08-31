import { useEffect, useMemo, useState } from 'react'
import Reveal from '../components/motion/Reveal.jsx'
import RevealGroup from '../components/motion/RevealGroup.jsx'
import RevealItem from '../components/motion/RevealItem.jsx'
import { scaleIn } from '../lib/motion.js'
import { getWithFallback, resolveImage, placeholderFor } from '../lib/api.js'
import { galleryPreview as fallback } from '../data/fallback.js'

export default function Gallery() {
  const [items, setItems] = useState(fallback)
  const [category, setCategory] = useState('All')


  useEffect(() => {
    getWithFallback('/gallery', fallback).then(setItems)
  }, [])

  const categories = useMemo(() => ['All', ...new Set(items.map((g) => g.category))], [items])
  const filtered = category === 'All' ? items : items.filter((g) => g.category === category)

  return (
    <div className="page-enter gallery-page">
      <Reveal as="section" className="gallery-hero">
        <div className="container">
          <span className="eyebrow">Gallery</span>
          <h1>Community, captured</h1>
          <p className="lead">Snapshots from events, build sessions and everything in between.</p>
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

      <Reveal as="section" className="gallery-grid-section">
        <RevealGroup as="div" className="container gp-grid" stagger={0.05}>
          {filtered.map((g) => (
            <RevealItem as="div" className="gp-tile" variants={scaleIn} key={g._id}>
              <img
                className="gp-tile-img"
                src={resolveImage(g.image, 'gallery')}
                alt={g.title}
                onError={(e) => { e.currentTarget.src = placeholderFor('gallery') }}
              />
              <div className="gp-tile-overlay">
                <span className="gp-category">{g.category}</span>
                <span className="gp-title">{g.title}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Reveal>

      <style>{`
        .gallery-hero { padding-top: 72px; padding-bottom: 24px; text-align: center; }
        .gallery-hero h1 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(30px, 5vw, 48px);
          margin: 14px 0 12px;
        }
        .gallery-hero .lead { color: var(--grey); max-width: 560px; margin: 0 auto 28px; }
        .category-filters { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
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
        .filter-chip.active { background: var(--red); border-color: var(--red); color: var(--white); }
        .gallery-grid-section { padding-top: 24px; }
        .gp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .gp-tile {
          aspect-ratio: 4 / 3;
          border-radius: 14px;
          border: 1px solid var(--line);
          position: relative;
          overflow: hidden;
          transition: transform 0.35s ease, border-color 0.35s ease;
        }
        .gp-tile-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .gp-tile-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
          background: linear-gradient(180deg, transparent 40%, rgba(11,11,13,0.85));
        }
        .gp-tile:hover { transform: translateY(-6px) scale(1.02); border-color: var(--red); }
        .gp-category {
          font-size: 11px;
          color: var(--red);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }
        .gp-title { font-family: var(--font-display); font-weight: 600; font-size: 15px; }
        @media (max-width: 720px) {
          .gp-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  )
}

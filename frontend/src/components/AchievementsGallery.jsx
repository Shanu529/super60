import { useEffect, useState } from 'react'
import { getWithFallback, resolveImage } from '../lib/api.js'

// Same content that used to be a hardcoded `ITEMS` array — now backed
// by /api/achievements (managed from the admin panel), with this as
// the fallback so the section still renders fully if the API is ever
// unreachable.
const FALLBACK_ITEMS = [
  { _id: 'a1', tag: 'HACKATHON', title: 'National Hackathon Gold' },
  { _id: 'a2', tag: 'COMMUNITY', title: 'Super 60 Core Team Meetup' },
  { _id: 'a3', tag: 'IDEATHON', title: 'Code Warriors Trophy' },
  { _id: 'a4', tag: 'WORKSHOP', title: 'Industry Mentorship Session' },
  { _id: 'a5', tag: 'COMPETITION', title: 'Ideathon Pitching Day' },
  { _id: 'a6', tag: 'WORKSHOP', title: 'UI/UX Design Masterclass' },
  { _id: 'a7', tag: 'LAUNCH', title: 'TU Community Launch Event' },
  { _id: 'a8', tag: 'EXHIBITION', title: 'SVGOI Project Expo' },
]

export default function AchievementsGallery() {
  const [items, setItems] = useState(FALLBACK_ITEMS)

  useEffect(() => {
    getWithFallback('/achievements', FALLBACK_ITEMS).then(setItems)
  }, [])

  return (
    <section className="gallery">
      <div className="container">
        <span className="eyebrow">Celebrating Excellence</span>
        <h2>
          A Glimpse of
          <br />
          <span className="red-text">Our Achievements</span>
        </h2>

        <div className="gallery-grid">
          {items.map((it) => (
            <div
              key={it._id || it.title}
              className="gallery-tile"
              style={it.image ? { backgroundImage: `url(${resolveImage(it.image, 'gallery')})` } : undefined}
            >
              <span className="gallery-tag">{it.tag}</span>
              <span className="gallery-title">{it.title}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery h2 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(26px, 4vw, 40px);
          line-height: 1.25;
          margin: 14px 0 40px;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .gallery-tile {
          height: 180px;
          border-radius: 12px;
          background: linear-gradient(150deg, #2a2b2f, #17181b);
          background-size: cover;
          background-position: center;
          border: 1px solid var(--line);
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 4px;
          position: relative;
        }
        .gallery-tile[style*="background-image"]::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(11,11,13,0.85));
          border-radius: 12px;
        }
        .gallery-tile:not([style*="background-image"]):nth-child(3n+2) {
          background: linear-gradient(150deg, #33262a, #17181b);
        }
        .gallery-tile:not([style*="background-image"]):nth-child(4n) {
          background: linear-gradient(150deg, #3a1414, #17181b);
        }
        .gallery-tag {
          position: relative;
          z-index: 1;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--red);
          font-weight: 700;
        }
        .gallery-title {
          position: relative;
          z-index: 1;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 14px;
        }
        @media (max-width: 860px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  )
}

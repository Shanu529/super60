const ITEMS = [
  { tag: 'HACKATHON', title: 'National Hackathon Gold' },
  { tag: 'COMMUNITY', title: 'Super 60 Core Team Meetup' },
  { tag: 'IDEATHON', title: 'Code Warriors Trophy' },
  { tag: 'WORKSHOP', title: 'Industry Mentorship Session' },
  { tag: 'COMPETITION', title: 'Ideathon Pitching Day' },
  { tag: 'WORKSHOP', title: 'UI/UX Design Masterclass' },
  { tag: 'LAUNCH', title: 'TU Community Launch Event' },
  { tag: 'EXHIBITION', title: 'SVGOI Project Expo' },
]

export default function AchievementsGallery() {
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
          {ITEMS.map((it) => (
            <div key={it.title} className="gallery-tile">
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
          border: 1px solid var(--line);
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 4px;
        }
        .gallery-tile:nth-child(3n+2) {
          background: linear-gradient(150deg, #33262a, #17181b);
        }
        .gallery-tile:nth-child(4n) {
          background: linear-gradient(150deg, #3a1414, #17181b);
        }
        .gallery-tag {
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--red);
          font-weight: 700;
        }
        .gallery-title {
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

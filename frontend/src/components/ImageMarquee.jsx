const TILES = [
  { label: 'Community Meetups', tone: 1 },
  { label: 'Campus Sessions', tone: 2 },
  { label: 'Super 60 Community Revolution', tone: 3, isCard: true },
  { label: 'Guest Speakers', tone: 2 },
  { label: 'Convocation & Milestones', tone: 1 },
  { label: 'Hands-on Workshops', tone: 3 },
  { label: 'Hackathon Nights', tone: 2 },
]

export default function ImageMarquee() {
  const loop = [...TILES, ...TILES]

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {loop.map((tile, i) => (
          <div key={i} className={`marquee-tile tone-${tile.tone}`}>
            {tile.isCard ? (
              <div className="mini-card">
                <div className="mini-card-head">QUES COMMUNITY</div>
                <div className="mini-card-title">{tile.label}</div>
              </div>
            ) : (
              <span>{tile.label}</span>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .marquee-wrap {
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll-left 40s linear infinite;
        }
        .marquee-tile {
          width: 260px;
          height: 190px;
          flex: 0 0 auto;
          margin: 14px 8px;
          border-radius: 12px;
          display: flex;
          align-items: flex-end;
          padding: 16px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 14px;
          color: var(--white);
        }
        .tone-1 { background: linear-gradient(160deg, #2a2b2f, #1a1b1e); }
        .tone-2 { background: linear-gradient(160deg, #33262a, #1a1b1e); }
        .tone-3 { background: linear-gradient(160deg, #3a1414, #1a1b1e); }
        .mini-card {
          background: var(--red);
          width: 100%;
          height: 100%;
          margin: -16px;
          padding: 16px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .mini-card-head {
          font-size: 10px;
          letter-spacing: 0.1em;
          opacity: 0.85;
        }
        .mini-card-title {
          font-size: 15px;
          font-weight: 700;
          margin-top: 6px;
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  )
}

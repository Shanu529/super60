const LOGOS = [
  'GitHub', 'AWS', 'Cloudflare', 'Figma', 'Notion', 'Postman', 'MongoDB', 'Vercel',
  'Canva', 'Microsoft', 'Google',
]

export default function PartnerLogos() {
  const row1 = [...LOGOS, ...LOGOS]
  const row2 = [...LOGOS.slice().reverse(), ...LOGOS.slice().reverse()]

  return (
    <section className="partners">
      <div className="container partners-head">
        <h2>
          Trusted by <span className="red-text">Industry Leaders</span>
        </h2>
        <div className="partners-stats">
          <div>
            <strong>50+</strong>
            <span>COMMUNITY PARTNERS</span>
          </div>
          <div className="stat-divider" />
          <div>
            <strong>50+</strong>
            <span>CORPORATE PARTNERS</span>
          </div>
        </div>
      </div>

      <div className="logo-row">
        {row1.map((l, i) => (
          <span key={i} className="logo-chip">{l}</span>
        ))}
      </div>
      <div className="logo-row reverse">
        {row2.map((l, i) => (
          <span key={i} className="logo-chip">{l}</span>
        ))}
      </div>

      <style>{`
        .partners {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .partners-head {
          text-align: center;
          margin-bottom: 40px;
        }
        .partners-head h2 {
          font-family: var(--font-display);
          font-size: clamp(24px, 3.6vw, 34px);
          margin: 0 0 24px;
        }
        .partners-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
        }
        .partners-stats div:not(.stat-divider) {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .partners-stats strong {
          font-family: var(--font-display);
          font-size: 28px;
        }
        .partners-stats span {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--grey);
          margin-top: 4px;
        }
        .stat-divider {
          width: 1px;
          height: 36px;
          background: var(--line);
        }
        .logo-row {
          display: flex;
          width: max-content;
          gap: 48px;
          padding: 14px 0;
          animation: scroll-left 34s linear infinite;
        }
        .logo-row.reverse {
          animation-direction: reverse;
        }
        .logo-chip {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 18px;
          color: var(--grey-dim);
          white-space: nowrap;
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-row { animation: none; }
        }
      `}</style>
    </section>
  )
}

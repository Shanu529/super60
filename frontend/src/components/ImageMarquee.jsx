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
          <div
            key={i}
            className={`marquee-tile tone-${tile.tone} ${
              tile.isCard ? 'featured-tile' : ''
            }`}
          >
            {/* Decorative background */}
            <div className="tile-grid" />
            <div className="tile-circle" />
            <div className="tile-circle-small" />

            {/* Top */}
            <div className="tile-top">
              <span className="tile-number">
                {String((i % TILES.length) + 1).padStart(2, '0')}
              </span>

              <span className="tile-symbol">↗</span>
            </div>

            {/* Main visual */}
            <div className="tile-visual">
              {tile.isCard ? (
                <div className="mini-card">
                  <div className="mini-card-shine" />
                  <span className="mini-card-head">
                    SUPER 60
                  </span>

                  <span className="mini-card-title">
                    Community
                    <br />
                    Revolution
                  </span>

                  <span className="mini-card-bottom">
                    CONNECT · BUILD · GROW
                  </span>
                </div>
              ) : (
                <>
                  <span className="big-letter">
                    {tile.label.charAt(0)}
                  </span>

                  <span className="visual-lines">
                    <i />
                    <i />
                    <i />
                  </span>
                </>
              )}
            </div>

            {/* Bottom content */}
            <div className="tile-content">
              <span className="tile-category">
                SUPER 60 COMMUNITY
              </span>

              <span className="tile-label">
                {tile.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .marquee-wrap {
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: var(--bg);
          padding: 8px 0;
        }

        .marquee-wrap::before,
        .marquee-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 5;
          pointer-events: none;
        }

        .marquee-wrap::before {
          left: 0;
          background: linear-gradient(
            90deg,
            var(--bg),
            transparent
          );
        }

        .marquee-wrap::after {
          right: 0;
          background: linear-gradient(
            270deg,
            var(--bg),
            transparent
          );
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll-left 42s linear infinite;
          will-change: transform;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-tile {
          position: relative;
          width: 280px;
          height: 210px;
          flex: 0 0 auto;
          margin: 10px 8px;
          padding: 18px;
          border-radius: 18px;
          overflow: hidden;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          color: var(--white);
          border: 1px solid rgba(255,255,255,0.08);

          isolation: isolate;

          transition:
            transform 0.45s cubic-bezier(.2,.8,.2,1),
            border-color 0.3s ease,
            box-shadow 0.4s ease;
        }

        .marquee-tile:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(229,35,27,0.65);
          box-shadow:
            0 20px 50px rgba(0,0,0,0.35),
            0 0 35px rgba(229,35,27,0.08);
        }

        /* =========================
           BACKGROUNDS
        ========================= */

        .tone-1 {
          background:
            radial-gradient(
              circle at 85% 10%,
              rgba(255,255,255,0.09),
              transparent 32%
            ),
            linear-gradient(
              145deg,
              #303136,
              #17181b 75%
            );
        }

        .tone-2 {
          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(229,35,27,0.18),
              transparent 35%
            ),
            linear-gradient(
              145deg,
              #38282c,
              #17181b 75%
            );
        }

        .tone-3 {
          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(229,35,27,0.35),
              transparent 35%
            ),
            linear-gradient(
              145deg,
              #4a1718,
              #17181b 75%
            );
        }

        /* =========================
           DECORATION
        ========================= */

        .tile-grid {
          position: absolute;
          inset: 0;
          z-index: -1;

          opacity: 0.12;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            );

          background-size: 24px 24px;

          mask-image: linear-gradient(
            135deg,
            black,
            transparent 65%
          );
        }

        .tile-circle {
          position: absolute;
          width: 180px;
          height: 180px;
          right: -70px;
          top: -80px;

          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);

          z-index: -1;

          transition:
            transform 0.6s ease,
            border-color 0.4s ease;
        }

        .tile-circle-small {
          position: absolute;
          width: 100px;
          height: 100px;
          right: -30px;
          top: -40px;

          border-radius: 50%;
          background: rgba(229,35,27,0.08);

          z-index: -1;

          transition: transform 0.6s ease;
        }

        .marquee-tile:hover .tile-circle {
          transform: scale(1.15) rotate(20deg);
          border-color: rgba(229,35,27,0.3);
        }

        .marquee-tile:hover .tile-circle-small {
          transform: scale(1.4);
        }

        /* =========================
           TOP
        ========================= */

        .tile-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tile-number {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.5);
        }

        .tile-symbol {
          width: 30px;
          height: 30px;
          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(255,255,255,0.12);

          color: rgba(255,255,255,0.55);
          font-size: 14px;

          transition:
            transform 0.35s ease,
            color 0.35s ease,
            border-color 0.35s ease;
        }

        .marquee-tile:hover .tile-symbol {
          transform: translate(3px, -3px);
          color: var(--red);
          border-color: var(--red);
        }

        /* =========================
           VISUAL
        ========================= */

        .tile-visual {
          position: absolute;
          top: 58px;
          right: 22px;
          left: 22px;
          height: 90px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .big-letter {
          position: absolute;

          font-family: var(--font-display);
          font-weight: 800;
          font-size: 92px;
          line-height: 1;

          color: rgba(255,255,255,0.055);

          user-select: none;

          transition:
            transform 0.5s ease,
            color 0.5s ease;
        }

        .marquee-tile:hover .big-letter {
          transform: scale(1.08) translateX(8px);
          color: rgba(229,35,27,0.1);
        }

        .visual-lines {
          position: absolute;
          right: 5px;
          top: 28px;

          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .visual-lines i {
          display: block;
          height: 2px;
          border-radius: 10px;
          background: var(--red);
        }

        .visual-lines i:nth-child(1) {
          width: 48px;
        }

        .visual-lines i:nth-child(2) {
          width: 32px;
          opacity: 0.6;
        }

        .visual-lines i:nth-child(3) {
          width: 20px;
          opacity: 0.3;
        }

        /* =========================
           MINI CARD
        ========================= */

        .mini-card {
          position: relative;
          width: 180px;
          height: 92px;

          border-radius: 13px;

          padding: 14px 16px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          background:
            linear-gradient(
              135deg,
              #f02b22,
              #a9140f
            );

          box-shadow:
            0 14px 35px rgba(0,0,0,0.3);

          transform: rotate(-3deg);

          transition:
            transform 0.5s cubic-bezier(.2,.8,.2,1),
            box-shadow 0.5s ease;
        }

        .marquee-tile:hover .mini-card {
          transform: rotate(0deg) translateY(-4px) scale(1.04);

          box-shadow:
            0 20px 45px rgba(0,0,0,0.4);
        }

        .mini-card-shine {
          position: absolute;
          width: 90px;
          height: 180px;

          right: -35px;
          top: -50px;

          transform: rotate(35deg);

          background: rgba(255,255,255,0.1);

          pointer-events: none;
        }

        .mini-card-head {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.18em;
          opacity: 0.8;
        }

        .mini-card-title {
          font-family: var(--font-display);
          font-size: 16px;
          line-height: 1.05;
          font-weight: 800;
        }

        .mini-card-bottom {
          font-size: 7px;
          letter-spacing: 0.12em;
          opacity: 0.7;
        }

        /* =========================
           BOTTOM CONTENT
        ========================= */

        .tile-content {
          position: relative;
          z-index: 3;

          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .tile-category {
          font-size: 8px;
          letter-spacing: 0.16em;
          font-weight: 700;
          color: var(--red);
        }

        .tile-label {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          line-height: 1.2;

          max-width: 210px;

          transition:
            transform 0.35s ease,
            color 0.35s ease;
        }

        .marquee-tile:hover .tile-label {
          transform: translateX(4px);
          color: #fff;
        }

        /* =========================
           ANIMATION
        ========================= */

        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 600px) {
          .marquee-tile {
            width: 240px;
            height: 190px;
          }

          .tile-visual {
            top: 52px;
          }

          .big-letter {
            font-size: 78px;
          }

          .mini-card {
            width: 165px;
            height: 82px;
          }
        }

        /* =========================
           REDUCED MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }

          .marquee-tile,
          .mini-card,
          .tile-circle,
          .tile-circle-small,
          .big-letter {
            transition: none;
          }
        }
      `}</style>
    </div>
  )
}
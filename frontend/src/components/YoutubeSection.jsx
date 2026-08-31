const LINKS = [
  { icon: '🎬', title: 'Event Recaps', desc: 'Relive every seminar, hackathon, and workshop.' },
  { icon: '💡', title: 'Tech Talks', desc: 'Insights from industry experts and community leaders.' },
  { icon: '❤️', title: 'Community Stories', desc: 'Real journeys from real Super 60 members.' },
]

export default function YoutubeSection() {
  return (
    <section className="youtube">
      <div className="container">
        <div className="yt-head">
          <span className="eyebrow center">Our Channel</span>
          <h2>
            Super 60 Community <span className="red-text">is Live</span> on YouTube
          </h2>
          <p>
            Watch our story, events, and community moments – all captured and shared live
            on our YouTube channel.
          </p>
        </div>

        <div className="yt-grid">
          <div className="yt-video">
            <span className="yt-play">▶</span>
            <div className="yt-caption">
              <strong>BEYOND COLLEGE</strong>
              <span>300+ Projects · 1.5 Cr Revenue.</span>
            </div>
          </div>

          <div className="yt-side">
            <div className="yt-channel">
              <span className="yt-icon">▶</span>
              <div>
                <strong>Super 60 Official</strong>
                <span>@TheUniquesOfficial</span>
              </div>
            </div>
            <p className="yt-desc">
              Subscribe to our channel for event highlights, tech talks, member stories,
              and behind-the-scenes community moments.
            </p>

            {LINKS.map((l) => (
              <div key={l.title} className="yt-link">
                <span>{l.icon}</span>
                <div>
                  <strong>{l.title}</strong>
                  <span>{l.desc}</span>
                </div>
              </div>
            ))}

            <a href="#" className="btn btn-primary yt-cta">
              Visit Our Channel <span className="btn-icon">↗</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .yt-head {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 48px;
        }
        .eyebrow.center::before {
          margin-right: 0;
        }
        .yt-head h2 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(24px, 4vw, 36px);
          margin: 14px 0 12px;
        }
        .yt-head p {
          color: var(--grey);
        }
        .yt-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 24px;
          align-items: stretch;
        }
        .yt-video {
          border-radius: 16px;
          background: linear-gradient(150deg, #2a2b2f, #111214);
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 24px;
        }
        .yt-play {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--red);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .yt-caption {
          position: absolute;
          left: 24px;
          bottom: 24px;
          display: flex;
          flex-direction: column;
        }
        .yt-caption strong {
          font-family: var(--font-display);
          font-size: 20px;
        }
        .yt-caption span {
          color: var(--grey);
          font-size: 13px;
          margin-top: 4px;
        }
        .yt-side {
          display: flex;
          flex-direction: column;
          gap: 14px;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 20px;
        }
        .yt-channel {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .yt-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--red);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }
        .yt-channel strong {
          display: block;
          font-family: var(--font-display);
          font-size: 14px;
        }
        .yt-channel span {
          color: var(--grey-dim);
          font-size: 12px;
        }
        .yt-desc {
          color: var(--grey);
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }
        .yt-link {
          display: flex;
          gap: 10px;
          border-top: 1px solid var(--line);
          padding-top: 12px;
          font-size: 13px;
        }
        .yt-link strong {
          display: block;
        }
        .yt-link span {
          color: var(--grey-dim);
          font-size: 12px;
        }
        .yt-cta {
          justify-content: center;
          margin-top: 8px;
        }
        @media (max-width: 860px) {
          .yt-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

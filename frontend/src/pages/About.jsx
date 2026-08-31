const VALUES = [
  { title: 'Skill-Driven Education', desc: 'Practical, project-based learning over rote theory.' },
  { title: 'Entrepreneurship', desc: 'Turning ideas into ventures with real-world mentorship.' },
  { title: 'Earn-While-You-Learn', desc: 'Paid opportunities that build experience as you grow.' },
]

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <span className="eyebrow">About Our Community</span>
          <h1>
            The <span className="highlight">Super</span> Community
          </h1>
          <p className="tagline">Learn, Build, and Grow Together.</p>

          <blockquote>
            "Super 60 Community is a global hub where everyone is welcome. We empower
            students to bridge the gap between theory and practice through peer-to-peer
            learning and real-world solutions."
          </blockquote>

          <h3 className="focus-heading">Our Main Focus</h3>
        </div>
      </section>

      <section className="values">
        <div className="container values-grid">
          {VALUES.map((v) => (
            <div key={v.title} className="value-card">
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mission">
        <div className="container mission-inner">
          <div>
            <span className="eyebrow">Our Mission</span>
            <h2>Redefining learning with community at the core</h2>
            <p>
              Super 60 Community brings together students, developers, designers and
              future leaders to learn by building — through workshops, mentorship and
              real projects that go beyond the classroom.
            </p>
          </div>
          <div>
            <span className="eyebrow">Our Vision</span>
            <h2>A global hub of creators, dreamers &amp; doers</h2>
            <p>
              We want every member to leave with more than a certificate — with a
              network, a portfolio, and the confidence to build what's next.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .about-hero {
          padding-top: 72px;
          padding-bottom: 40px;
        }
        .about-hero h1 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(32px, 6vw, 56px);
          margin: 14px 0 4px;
        }
        .tagline {
          font-size: 20px;
          color: var(--grey);
          margin: 0 0 40px;
        }
        blockquote {
          font-family: var(--font-quote);
          font-style: italic;
          font-size: 19px;
          line-height: 1.7;
          max-width: 640px;
          margin-left: auto;
          text-align: right;
          color: var(--white);
        }
        .focus-heading {
          font-family: var(--font-display);
          letter-spacing: 0.16em;
          font-size: 15px;
          margin-top: 56px;
          border-top: 1px solid var(--line);
          padding-top: 28px;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .value-card {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 28px;
        }
        .value-card h4 {
          font-family: var(--font-display);
          margin: 0 0 10px;
        }
        .value-card p {
          color: var(--grey);
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }
        .mission {
          border-top: 1px solid var(--line);
        }
        .mission-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        .mission-inner h2 {
          font-family: var(--font-display);
          font-size: 26px;
          margin: 12px 0 14px;
        }
        .mission-inner p {
          color: var(--grey);
          line-height: 1.7;
        }
        @media (max-width: 860px) {
          .values-grid, .mission-inner {
            grid-template-columns: 1fr;
          }
          blockquote {
            text-align: left;
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  )
}

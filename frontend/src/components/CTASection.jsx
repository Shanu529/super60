import { Link } from 'react-router-dom'
import Reveal from './motion/Reveal.jsx'

export default function CTASection() {
  return (
    <Reveal as="section" className="cta-section">
      <div className="container cta-inner">
        <h2>Ready to build something with us?</h2>
        <p>Join Super 60 and get hands-on with real projects, real mentors, and a community that ships.</p>
        <div className="cta-actions">
          <a href="#join" className="btn btn-primary">Join Us <span className="btn-icon">↗</span></a>
          <Link to="/contact" className="btn btn-outline">Contact Us</Link>
        </div>
      </div>

      <style>{`
        .cta-section {
          position: relative;
          overflow: hidden;
        }
        .cta-inner {
          background: linear-gradient(135deg, rgba(240,112,20,0.16), var(--bg-panel));
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 64px 32px;
          text-align: center;
        }
        .cta-inner h2 {
          font-family: var(--font-display);
          font-size: clamp(24px, 4vw, 36px);
          margin: 0 0 14px;
        }
        .cta-inner p {
          color: var(--grey);
          max-width: 520px;
          margin: 0 auto 28px;
          line-height: 1.7;
        }
        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
      `}</style>
    </Reveal>
  )
}

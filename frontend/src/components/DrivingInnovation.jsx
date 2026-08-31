import { useEffect, useRef } from 'react'

export default function DrivingInnovation() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.innovation-reveal')

    if (!elements) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="innovation">
      <div className="container">

        {/* =========================
            HEADER
        ========================= */}

        <div className="innovation-header innovation-reveal">

          <span className="eyebrow">
            A Community Like No Other
          </span>

          <h2 className="innovation-title">
            Driving <span className="highlight">Innovation</span> Through
            <br />
            <span className="red-text">
              Collaboration &amp; Visionary Thinking
            </span>
          </h2>

        </div>


        {/* =========================
            GRID
        ========================= */}

        <div className="innovation-grid">

          {/* MAP */}

          <div
            className="i-card i-map innovation-reveal"
            style={{ '--delay': '0ms' }}
          >
            <span className="card-index">
              01
            </span>

            <div className="map-background">
              <span className="map-line line-one" />
              <span className="map-line line-two" />
              <span className="map-line line-three" />
            </div>

            <div className="map-plate">
              <span className="map-glyph">
                🌐
              </span>
            </div>

            <div className="visual-label">
              GLOBAL NETWORK
            </div>
          </div>


          {/* GLOBAL NETWORKING */}

          <div
            className="i-card i-text innovation-reveal"
            style={{ '--delay': '100ms' }}
          >
            <div className="card-top">
              <span className="card-index">
                02
              </span>

              <span className="card-arrow">
                ↗
              </span>
            </div>

            <div className="text-card-content">

              <span className="small-label">
                CONNECTION
              </span>

              <h4>
                Global Networking
              </h4>

              <h5>
                Build Connections That Matter
              </h5>

              <p>
                Connect with founders, investors, and industry leaders worldwide to
                collaborate, grow, and scale your startup with the right mentorship.
              </p>

            </div>

            <span className="card-line" />
          </div>


          {/* HANDS-ON LEARNING */}

          <div
            className="i-card i-red innovation-reveal"
            style={{ '--delay': '200ms' }}
          >
            <span className="red-number">
              03
            </span>

            <span className="i-icon">
              +
            </span>

            <div className="red-card-content">

              <span className="small-label">
                LEARNING
              </span>

              <h4>
                Hands-On Learning
              </h4>

              <p>
                Get exclusive access to expert-led workshops, panel discussions, and
                case studies to refine your business strategy.
              </p>

            </div>

            <span className="red-decoration">
              +
            </span>
          </div>


          {/* STARTUP ACCELERATION */}

          <div
            className="i-card i-red innovation-reveal"
            style={{ '--delay': '300ms' }}
          >
            <span className="red-number">
              04
            </span>

            <span className="i-icon">
              💻
            </span>

            <div className="red-card-content">

              <span className="small-label">
                GROWTH
              </span>

              <h4>
                Startup Acceleration
              </h4>

              <p>
                Get access to funding opportunities, pitch competitions, and
                acceleration programs designed to take your startup to the next level.
              </p>

            </div>

            <span className="red-decoration">
              ↗
            </span>
          </div>


          {/* LIGHTBULB */}

          <div
            className="i-card i-illustration innovation-reveal"
            style={{ '--delay': '400ms' }}
          >
            <span className="card-index">
              05
            </span>

            <div className="bulb-orbit orbit-a" />
            <div className="bulb-orbit orbit-b" />

            <span className="bulb">
              💡
            </span>

            <span className="visual-label">
              IDEAS → IMPACT
            </span>
          </div>


          {/* SHOWCASE */}

          <div
            className="i-card i-text innovation-reveal"
            style={{ '--delay': '500ms' }}
          >
            <div className="card-top">

              <span className="card-index">
                06
              </span>

              <span className="card-arrow">
                ↗
              </span>

            </div>

            <div className="text-card-content">

              <span className="i-icon-outline">
                ◐
              </span>

              <span className="small-label">
                EXPOSURE
              </span>

              <h4>
                Showcase Your Innovation
              </h4>

              <p>
                Pitch your ideas in exclusive startup showcases and competitions,
                attracting investors, mentors, and potential co-founders.
              </p>

            </div>

            <span className="card-line" />

          </div>

        </div>

      </div>


      <style>{`

        /* =====================================
           HEADER
        ===================================== */

        .innovation-header {
          margin-bottom: 45px;
        }

        .innovation-title {
          font-family: var(--font-display);

          font-weight: 700;

          font-size: clamp(26px, 4.2vw, 42px);

          line-height: 1.2;

          letter-spacing: -0.025em;

          margin: 14px 0 0;
        }

        .highlight {
          color: var(--white);
        }

        .red-text {
          color: var(--red);
        }


        /* =====================================
           SCROLL REVEAL
        ===================================== */

        .innovation-reveal {
          opacity: 0;

          transform:
            translateY(50px)
            scale(0.97);

          transition:
            opacity 0.8s ease,
            transform 0.8s
            cubic-bezier(.2,.8,.2,1);

          transition-delay: var(--delay, 0ms);
        }

        .innovation-reveal.is-visible {
          opacity: 1;

          transform:
            translateY(0)
            scale(1);
        }


        /* =====================================
           GRID
        ===================================== */

        .innovation-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          grid-auto-rows:
            minmax(210px, auto);

          gap: 18px;
        }


        /* =====================================
           BASE CARD
        ===================================== */

        .i-card {
          position: relative;

          min-height: 220px;

          border-radius: 20px;

          padding: 24px;

          overflow: hidden;

          transition:
            transform 0.45s
            cubic-bezier(.2,.8,.2,1),
            border-color 0.35s ease,
            box-shadow 0.4s ease;
        }


        /* =====================================
           CARD NUMBER
        ===================================== */

        .card-index {
          position: absolute;

          top: 18px;
          left: 20px;

          font-family: var(--font-display);

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 0.15em;

          color: var(--grey);

          z-index: 5;
        }


        /* =====================================
           MAP CARD
        ===================================== */

        .i-map {
          background: #f2f1ee;

          display: flex;

          align-items: center;

          justify-content: center;

          color: #171717;
        }

        .map-background {
          position: absolute;

          inset: 0;

          overflow: hidden;

          opacity: 0.4;
        }

        .map-line {
          position: absolute;

          border: 1px solid rgba(0,0,0,0.08);

          border-radius: 50%;
        }

        .line-one {
          width: 280px;
          height: 180px;

          left: -50px;
          top: 30px;

          transform: rotate(20deg);
        }

        .line-two {
          width: 220px;
          height: 300px;

          right: -50px;
          top: -40px;

          transform: rotate(-25deg);
        }

        .line-three {
          width: 350px;
          height: 100px;

          left: -30px;
          bottom: 20px;

          transform: rotate(-10deg);
        }

        .map-plate {
          position: relative;

          z-index: 3;

          width: 100px;
          height: 100px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background: rgba(255,255,255,0.55);

          border: 1px solid rgba(0,0,0,0.08);

          box-shadow:
            0 15px 40px rgba(0,0,0,0.08);

          transition:
            transform 0.6s ease;
        }

        .map-glyph {
          font-size: 42px;
        }

        .visual-label {
          position: absolute;

          left: 20px;
          bottom: 18px;

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 0.16em;

          color: rgba(0,0,0,0.45);

          z-index: 5;
        }


        /* =====================================
           TEXT CARDS
        ===================================== */

        .i-text {
          background: var(--bg-panel);

          border: 1px solid var(--line);

          display: flex;

          flex-direction: column;
        }

        .card-top {
          display: flex;

          justify-content: space-between;

          align-items: center;
        }

        .card-top .card-index {
          position: static;
        }

        .card-arrow {
          width: 30px;
          height: 30px;

          border-radius: 50%;

          border: 1px solid var(--line);

          display: flex;

          align-items: center;

          justify-content: center;

          color: var(--grey);

          transition:
            transform 0.35s ease,
            color 0.35s ease,
            background 0.35s ease,
            border-color 0.35s ease;
        }

        .text-card-content {
          margin-top: auto;
        }

        .small-label {
          display: block;

          color: var(--red);

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 0.15em;

          margin-bottom: 8px;
        }

        .i-text h4 {
          font-family: var(--font-display);

          font-size: 19px;

          line-height: 1.2;

          margin: 0 0 5px;
        }

        .i-text h5 {
          font-family: var(--font-display);

          font-size: 13px;

          font-weight: 500;

          color: var(--grey);

          margin: 0;
        }

        .i-text p {
          color: var(--grey);

          font-size: 13px;

          line-height: 1.65;

          margin: 12px 0 0;
        }

        .card-line {
          width: 28px;
          height: 3px;

          border-radius: 4px;

          background: var(--grey-dim);

          margin-top: 20px;

          transition:
            width 0.4s ease,
            background 0.3s ease;
        }


        /* =====================================
           RED CARDS
        ===================================== */

        .i-red {
          background:
            linear-gradient(
              145deg,
              #e5231b,
              #7a120d
            );

          color: var(--white);
        }

        .red-number {
          position: absolute;

          top: 18px;
          left: 20px;

          font-family: var(--font-display);

          font-size: 10px;

          letter-spacing: 0.15em;

          color: rgba(255,255,255,0.55);
        }

        .i-icon {
          position: relative;

          width: 40px;
          height: 40px;

          border-radius: 11px;

          background: rgba(255,255,255,0.92);

          color: var(--red);

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 18px;

          margin-top: 28px;

          transition:
            transform 0.4s ease;
        }

        .red-card-content {
          position: relative;

          z-index: 3;

          margin-top: 18px;
        }

        .i-red .small-label {
          color: rgba(255,255,255,0.65);
        }

        .i-red h4 {
          font-family: var(--font-display);

          font-size: 19px;

          line-height: 1.2;

          margin: 0 0 9px;
        }

        .i-red p {
          font-size: 13px;

          line-height: 1.6;

          color: rgba(255,255,255,0.85);

          margin: 0;
        }

        .red-decoration {
          position: absolute;

          right: -5px;
          bottom: -25px;

          font-size: 100px;

          font-family: var(--font-display);

          font-weight: 700;

          color: rgba(255,255,255,0.05);

          line-height: 1;
        }


        /* =====================================
           LIGHTBULB
        ===================================== */

        .i-illustration {
          background: #f2f1ee;

          color: #171717;

          display: flex;

          align-items: center;

          justify-content: center;
        }

        .bulb {
          position: relative;

          z-index: 4;

          font-size: 55px;

          filter:
            drop-shadow(
              0 10px 20px
              rgba(0,0,0,0.12)
            );

          transition:
            transform 0.5s ease;
        }

        .bulb-orbit {
          position: absolute;

          border: 1px solid rgba(0,0,0,0.08);

          border-radius: 50%;
        }

        .orbit-a {
          width: 150px;
          height: 150px;

          transform: rotate(20deg);
        }

        .orbit-b {
          width: 100px;
          height: 180px;

          transform: rotate(-25deg);
        }


        /* =====================================
           OUTLINE ICON
        ===================================== */

        .i-icon-outline {
          display: flex;

          width: 38px;
          height: 38px;

          border-radius: 50%;

          border: 1px solid var(--line);

          align-items: center;

          justify-content: center;

          margin-bottom: 16px;

          color: var(--red);
        }


        /* =====================================
           HOVER
        ===================================== */

        .i-card:hover {
          transform:
            translateY(-8px)
            scale(1.01);

          box-shadow:
            0 25px 55px rgba(0,0,0,0.25);
        }

        .i-text:hover {
          border-color: rgba(255,60,60,0.4);
        }

        .i-card:hover .card-arrow {
          color: var(--white);

          background: var(--red);

          border-color: var(--red);

          transform:
            translate(3px,-3px)
            rotate(8deg);
        }

        .i-card:hover .card-line {
          width: 55px;

          background: var(--red);
        }

        .i-card:hover .map-plate {
          transform:
            scale(1.08)
            rotate(8deg);
        }

        .i-card:hover .bulb {
          transform:
            translateY(-6px)
            rotate(-6deg)
            scale(1.08);
        }

        .i-red:hover .i-icon {
          transform:
            translateY(-4px)
            rotate(-5deg)
            scale(1.08);
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 900px) {

          .innovation-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 600px) {

          .innovation-header {
            margin-bottom: 32px;
          }

          .innovation-title {
            font-size: 28px;

            line-height: 1.2;
          }

          .innovation-grid {
            grid-template-columns: 1fr;

            gap: 14px;
          }

          .i-card {
            min-height: 240px;

            padding: 22px;
          }

        }


        /* =====================================
           REDUCED MOTION
        ===================================== */

        @media (prefers-reduced-motion: reduce) {

          .innovation-reveal {
            opacity: 1;

            transform: none;

            transition: none;
          }

          .i-card:hover {
            transform: none;
          }

        }

      `}</style>
    </section>
  )
}
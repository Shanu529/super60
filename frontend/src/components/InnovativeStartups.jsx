import { useEffect, useRef } from 'react'

const STARTUPS = [
  {
    n: '01',
    title: 'Godigitify',
    desc: 'Explore the advancements in AI, its impact across industries, and what the future holds for artificial intelligence.',
  },
  {
    n: '02',
    title: 'Techlearns Academy',
    desc: 'Learn from industry experts how AI and ML are transforming healthcare, finance, education, and more.',
    active: true,
  },
  {
    n: '03',
    title: 'Wirely',
    desc: 'A discussion on the ethical concerns surrounding AI, data privacy, and responsible innovation in AI/ML.',
  },
]

export default function InnovativeStartups() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.startup-reveal')

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
    <section ref={sectionRef} className="startups">
      <div className="container startups-grid">

        {/* =========================
            LEFT CONTENT
        ========================= */}

        <div className="startups-content">

          <div className="startup-heading startup-reveal">

            <span className="eyebrow">
              Our Innovative Startups
            </span>

            <h2>
              Pioneering the Future with
              <br />
              <span className="red-text">
                Disruptive Ideas &amp; Technology
              </span>
            </h2>

          </div>


          {/* =========================
              STARTUP LIST
          ========================= */}

          <div className="startup-list">

            {STARTUPS.map((s, index) => (
              <div
                key={s.n}
                className={
                  'startup-item startup-reveal' +
                  (s.active ? ' active' : '')
                }
                style={{
                  '--delay': `${index * 120}ms`,
                }}
              >

                {/* Number */}

                <div className="startup-number">
                  {s.n}
                </div>


                {/* Content */}

                <div className="startup-content">

                  <div className="startup-title-row">

                    <h4>
                      {s.title}
                    </h4>

                    <span className="startup-arrow">
                      ↗
                    </span>

                  </div>

                  <p>
                    {s.desc}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>


        {/* =========================
            PREVIEW
        ========================= */}

        <div
          className="startup-preview startup-reveal"
          style={{
            '--delay': '250ms',
          }}
        >

          <div className="preview-decoration decoration-one" />
          <div className="preview-decoration decoration-two" />

          <div className="preview-window">

            {/* Browser bar */}

            <div className="preview-bar">

              <div className="browser-dots">
                <span />
                <span />
                <span />
              </div>

              <span className="browser-address">
                techlearns.academy
              </span>

              <span className="browser-icon">
                ↗
              </span>

            </div>


            {/* Website */}

            <div className="preview-body">

              <div className="preview-top">

                <span className="preview-brand">
                  techlearns
                  <strong> ACADEMY</strong>
                </span>

                <span className="preview-menu">
                  MENU
                </span>

              </div>


              <div className="preview-center">

                <span className="preview-eyebrow">
                  LEARN • BUILD • GROW
                </span>

                <h3>
                  Learn from
                  <br />
                  <span>anywhere.</span>
                </h3>

                <p>
                  Learn from anywhere, anytime.
                </p>

                <div className="preview-button">
                  Explore Courses
                  <span>→</span>
                </div>

              </div>


              <div className="preview-footer">

                <span>
                  01 — EDUCATION
                </span>

                <span>
                  TECHLEARN ACADEMY
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      <style>{`

        /* =====================================
           SECTION
        ===================================== */

        .startups {
          padding: 100px 0 120px;

          overflow: hidden;
        }


        /* =====================================
           GRID
        ===================================== */

        .startups-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 60px;

          align-items: center;
        }


        /* =====================================
           HEADING
        ===================================== */

        .startup-heading {
          margin-bottom: 38px;
        }

        .startups h2 {
          font-family: var(--font-display);

          font-weight: 700;

          font-size:
            clamp(24px, 3.6vw, 38px);

          line-height: 1.2;

          letter-spacing: -0.025em;

          margin: 14px 0 0;
        }

        .red-text {
          color: var(--red);
        }


        /* =====================================
           SCROLL REVEAL
        ===================================== */

        .startup-reveal {
          opacity: 0;

          transform:
            translateY(45px)
            scale(0.97);

          transition:
            opacity 0.8s ease,
            transform 0.8s
            cubic-bezier(.2,.8,.2,1);

          transition-delay:
            var(--delay, 0ms);
        }

        .startup-reveal.is-visible {
          opacity: 1;

          transform:
            translateY(0)
            scale(1);
        }


        /* =====================================
           LIST
        ===================================== */

        .startup-list {
          display: flex;

          flex-direction: column;

          gap: 8px;
        }


        /* =====================================
           STARTUP ITEM
        ===================================== */

        .startup-item {
          position: relative;

          display: flex;

          gap: 18px;

          padding: 20px 18px;

          border-radius: 15px;

          border-left:
            2px solid var(--line);

          background: transparent;

          transition:
            background 0.35s ease,
            border-color 0.35s ease,
            transform 0.35s ease;
        }


        /* Active */

        .startup-item.active {
          background: var(--bg-panel);

          border-left-color:
            var(--red);

          box-shadow:
            0 15px 35px
            rgba(0,0,0,0.12);
        }


        /* Hover */

        .startup-item:hover {
          transform:
            translateX(7px);

          background:
            var(--bg-panel);

          border-left-color:
            var(--red);
        }


        /* =====================================
           NUMBER
        ===================================== */

        .startup-number {
          width: 38px;
          height: 38px;

          flex-shrink: 0;

          border-radius: 50%;

          border: 1px solid var(--line);

          display: flex;

          align-items: center;

          justify-content: center;

          font-family:
            var(--font-display);

          font-size: 11px;

          font-weight: 700;

          color: var(--grey);

          transition:
            background 0.35s ease,
            color 0.35s ease,
            border-color 0.35s ease,
            transform 0.35s ease;
        }


        .active .startup-number {
          border-color:
            var(--red);

          color:
            var(--red);
        }


        .startup-item:hover .startup-number {
          transform:
            scale(1.08);

          border-color:
            var(--red);

          color:
            var(--red);
        }


        /* =====================================
           CONTENT
        ===================================== */

        .startup-content {
          flex: 1;

          min-width: 0;
        }


        /* =====================================
           TITLE
        ===================================== */

        .startup-title-row {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 12px;
        }

        .startup-item h4 {
          font-family:
            var(--font-display);

          font-size: 17px;

          font-weight: 600;

          margin: 4px 0 7px;

          color:
            var(--grey);

          transition:
            color 0.3s ease;
        }

        .active h4 {
          color:
            var(--white);
        }

        .startup-item:hover h4 {
          color:
            var(--white);
        }


        /* =====================================
           ARROW
        ===================================== */

        .startup-arrow {
          color: var(--grey-dim);

          font-size: 17px;

          opacity: 0;

          transform:
            translate(-5px, 5px);

          transition:
            opacity 0.3s ease,
            transform 0.3s ease,
            color 0.3s ease;
        }

        .startup-item:hover .startup-arrow,
        .active .startup-arrow {
          opacity: 1;

          color:
            var(--red);

          transform:
            translate(0, 0);
        }


        /* =====================================
           DESCRIPTION
        ===================================== */

        .startup-item p {
          color:
            var(--grey-dim);

          font-size: 13px;

          line-height: 1.65;

          margin: 0;
        }

        .active p {
          color:
            var(--grey);
        }


        /* =====================================
           PREVIEW
        ===================================== */

        .startup-preview {
          position: relative;

          min-height: 500px;

          display: flex;

          align-items: center;

          justify-content: center;
        }


        /* Decorative circles */

        .preview-decoration {
          position: absolute;

          border-radius: 50%;

          border: 1px solid var(--line);

          pointer-events: none;
        }

        .decoration-one {
          width: 430px;
          height: 430px;

          opacity: 0.45;
        }

        .decoration-two {
          width: 320px;
          height: 320px;

          opacity: 0.25;

          transform:
            rotate(30deg);
        }


        /* =====================================
           BROWSER
        ===================================== */

        .preview-window {
          position: relative;

          z-index: 3;

          width: 100%;

          max-width: 540px;

          border-radius: 20px;

          overflow: hidden;

          background: #f2f1ee;

          box-shadow:
            0 35px 80px
            rgba(0,0,0,0.3);

          transform:
            rotate(1deg);

          transition:
            transform 0.6s
            cubic-bezier(.2,.8,.2,1),
            box-shadow 0.5s ease;
        }


        .startup-preview:hover
        .preview-window {
          transform:
            rotate(0deg)
            translateY(-8px);

          box-shadow:
            0 45px 100px
            rgba(0,0,0,0.4);
        }


        /* =====================================
           BROWSER BAR
        ===================================== */

        .preview-bar {
          height: 42px;

          padding: 0 14px;

          display: flex;

          align-items: center;

          gap: 14px;

          background:
            #e5e3de;

          border-bottom:
            1px solid rgba(0,0,0,0.08);
        }

        .browser-dots {
          display: flex;

          gap: 5px;
        }

        .browser-dots span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background:
            rgba(0,0,0,0.2);
        }

        .browser-address {
          flex: 1;

          font-size: 9px;

          color: #777;

          text-align: center;

          letter-spacing: 0.04em;
        }

        .browser-icon {
          font-size: 12px;

          color: #777;
        }


        /* =====================================
           PREVIEW BODY
        ===================================== */

        .preview-body {
          min-height: 400px;

          padding: 28px;

          color: #17181a;

          display: flex;

          flex-direction: column;

          justify-content:
            space-between;

          background:
            linear-gradient(
              145deg,
              #f8f7f3,
              #e9e7e1
            );
        }


        /* =====================================
           PREVIEW TOP
        ===================================== */

        .preview-top {
          display: flex;

          align-items: center;

          justify-content:
            space-between;
        }

        .preview-brand {
          font-family:
            var(--font-display);

          font-size: 15px;

          font-weight: 700;

          letter-spacing: -0.02em;
        }

        .preview-brand strong {
          color:
            #e5231b;

          font-size: 10px;
        }

        .preview-menu {
          font-size: 8px;

          font-weight: 700;

          letter-spacing:
            0.15em;

          color:
            #777;
        }


        /* =====================================
           PREVIEW CENTER
        ===================================== */

        .preview-center {
          max-width: 340px;

          margin: auto 0;
        }

        .preview-eyebrow {
          display: block;

          margin-bottom: 13px;

          font-size: 8px;

          font-weight: 800;

          letter-spacing:
            0.15em;

          color:
            #e5231b;
        }

        .preview-center h3 {
          font-family:
            var(--font-display);

          font-size:
            clamp(36px, 5vw, 58px);

          line-height: 0.95;

          letter-spacing:
            -0.055em;

          margin: 0;
        }

        .preview-center h3 span {
          color:
            #e5231b;
        }

        .preview-center p {
          margin: 18px 0;

          color: #666;

          font-size: 12px;
        }


        /* Button */

        .preview-button {
          display: inline-flex;

          align-items: center;

          gap: 15px;

          padding: 11px 15px;

          border-radius: 7px;

          background:
            #17181a;

          color: white;

          font-size: 10px;

          font-weight: 600;
        }

        .preview-button span {
          color:
            #e5231b;

          font-size: 14px;
        }


        /* =====================================
           PREVIEW FOOTER
        ===================================== */

        .preview-footer {
          display: flex;

          justify-content:
            space-between;

          padding-top: 18px;

          border-top:
            1px solid rgba(0,0,0,0.1);

          font-size: 7px;

          letter-spacing:
            0.12em;

          color: #888;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 900px) {

          .startups-grid {
            grid-template-columns: 1fr;

            gap: 45px;
          }

          .startup-preview {
            min-height: 420px;
          }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 600px) {

          .startups {
            padding:
              70px 0 90px;
          }

          .startups h2 {
            font-size: 27px;
          }

          .startup-item {
            padding: 17px 14px;

            gap: 13px;
          }

          .startup-number {
            width: 32px;
            height: 32px;
          }

          .startup-item h4 {
            font-size: 15px;
          }

          .startup-item p {
            font-size: 12px;
          }

          .startup-preview {
            min-height: 330px;
          }

          .preview-window {
            max-width: 100%;
          }

          .preview-body {
            min-height: 330px;

            padding: 22px;
          }

          .decoration-one {
            width: 300px;
            height: 300px;
          }

          .decoration-two {
            width: 220px;
            height: 220px;
          }

        }


        /* =====================================
           REDUCED MOTION
        ===================================== */

        @media (prefers-reduced-motion: reduce) {

          .startup-reveal {
            opacity: 1;

            transform: none;

            transition: none;
          }

          .startup-preview:hover
          .preview-window {
            transform: none;
          }

          .startup-item:hover {
            transform: none;
          }

        }

      `}</style>
    </section>
  )
}
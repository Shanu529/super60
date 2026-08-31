import { useEffect, useRef } from 'react'

const PILLARS = [
  {
    n: '01',
    icon: '👥',
    title: 'Community Engagement',
    desc: 'Bringing people together through events and support.',
  },
  {
    n: '02',
    icon: '🤝',
    title: 'Volunteer Programs',
    desc: 'Join hands to make a difference with impactful initiatives.',
  },
  {
    n: '03',
    icon: '💡',
    title: 'Skill Development & Implementation',
    desc: 'From theory to skill implementation – hands-on workshops, live projects, and mentorship to sharpen your technical and professional expertise.',
    featured: true,
  },
  {
    n: '04',
    icon: '🫂',
    title: 'Inclusive Environment',
    desc: 'A welcoming space for everyone, regardless of background.',
  },
  {
    n: '05',
    icon: '🤲',
    title: 'Collaboration',
    desc: 'Partner with others to drive meaningful community change.',
  },
]

export default function CommunityPillars() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.pillar-reveal')

    if (!cards) return

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

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="pillars">
      <div className="container pillars-grid">

        {PILLARS.map((p, index) => (
          <div
            key={p.n}
            className={
              'pillar-card pillar-reveal' +
              (p.featured ? ' featured' : '')
            }
            style={{
              '--delay': `${index * 100}ms`,
            }}
          >

            {/* Background number */}

            <span className="pillar-ghost">
              {p.n}
            </span>


            {/* Top */}

            <div className="pillar-top">

              <span className="pillar-badge">
                {p.n.replace('0', '')}
              </span>

              <span className="pillar-arrow">
                ↗
              </span>

            </div>


            {/* Icon */}

            <div className="pillar-icon-wrap">

              <div className="pillar-icon">
                {p.icon}
              </div>

            </div>


            {/* Content */}

            <div className="pillar-content">

              <span className="pillar-label">
                COMMUNITY PILLAR
              </span>

              <h4>
                {p.title}
              </h4>

              <p>
                {p.desc}
              </p>

            </div>


            {/* Bottom */}

            <div className="pillar-bottom">

              <span className="pillar-rule" />

              <span className="pillar-number">
                {p.n}
              </span>

            </div>

          </div>
        ))}

      </div>


      <style>{`

        /* =====================================
           SECTION
        ===================================== */

        .pillars {
          position: relative;

          padding: 30px 0 110px;
        }


        /* =====================================
           GRID
        ===================================== */

        .pillars-grid {
          display: grid;

          grid-template-columns: repeat(3, 1fr);

          gap: 18px;
        }


        /* =====================================
           CARD
        ===================================== */

        .pillar-card {
          position: relative;

          min-height: 330px;

          padding: 22px;

          display: flex;

          flex-direction: column;

          overflow: hidden;

          border-radius: 20px;

          border: 1px solid var(--line);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.035),
              rgba(255,255,255,0.008)
            );

          opacity: 0;

          transform:
            translateY(55px)
            scale(0.96);

          transition:
            opacity 0.75s ease,
            transform 0.75s cubic-bezier(.2,.8,.2,1),
            border-color 0.35s ease,
            box-shadow 0.4s ease;

          transition-delay: var(--delay);
        }


        /* Scroll visible */

        .pillar-card.is-visible {
          opacity: 1;

          transform:
            translateY(0)
            scale(1);
        }


        /* =====================================
           CARD GLOW
        ===================================== */

        .pillar-card::before {
          content: '';

          position: absolute;

          width: 220px;
          height: 220px;

          right: -100px;
          bottom: -100px;

          border-radius: 50%;

          background: var(--red);

          opacity: 0;

          filter: blur(70px);

          transition:
            opacity 0.5s ease,
            transform 0.6s ease;
        }


        .pillar-card:hover::before {
          opacity: 0.13;

          transform: scale(1.3);
        }


        /* =====================================
           FEATURED
        ===================================== */

        .pillar-card.featured {
          background:
            linear-gradient(
              145deg,
              #e5231b,
              #8b1510
            );

          border-color: transparent;
        }

        .pillar-card.featured::before {
          background: white;

          opacity: 0.06;
        }


        /* =====================================
           TOP
        ===================================== */

        .pillar-top {
          position: relative;

          z-index: 5;

          display: flex;

          justify-content: space-between;

          align-items: center;
        }


        /* Badge */

        .pillar-badge {
          width: 32px;
          height: 32px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 9px;

          background: var(--red);

          color: var(--white);

          font-family: var(--font-display);

          font-size: 12px;

          font-weight: 700;

          transition:
            transform 0.35s ease;
        }


        .featured .pillar-badge {
          background: #17181a;

          color: white;
        }


        /* Arrow */

        .pillar-arrow {
          width: 31px;
          height: 31px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          border: 1px solid var(--line);

          color: var(--grey);

          font-size: 15px;

          transition:
            transform 0.35s ease,
            color 0.35s ease,
            background 0.35s ease,
            border-color 0.35s ease;
        }


        .featured .pillar-arrow {
          border-color: rgba(255,255,255,0.3);

          color: rgba(255,255,255,0.8);
        }


        /* =====================================
           GHOST NUMBER
        ===================================== */

        .pillar-ghost {
          position: absolute;

          top: 18px;
          right: 55px;

          font-family: var(--font-display);

          font-size: 90px;

          line-height: 1;

          font-weight: 800;

          color: rgba(255,255,255,0.025);

          pointer-events: none;

          transition:
            transform 0.6s ease,
            color 0.4s ease;
        }


        .featured .pillar-ghost {
          color: rgba(255,255,255,0.08);
        }


        /* =====================================
           ICON
        ===================================== */

        .pillar-icon-wrap {
          position: relative;

          z-index: 4;

          margin-top: 45px;

          margin-bottom: 24px;
        }


        .pillar-icon {
          width: 60px;
          height: 60px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 16px;

          background: var(--red-soft);

          border: 1px solid rgba(255,255,255,0.04);

          font-size: 24px;

          transition:
            transform 0.45s cubic-bezier(.2,.8,.2,1),
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }


        .featured .pillar-icon {
          background: rgba(255,255,255,0.92);
        }


        /* =====================================
           CONTENT
        ===================================== */

        .pillar-content {
          position: relative;

          z-index: 4;
        }


        .pillar-label {
          display: block;

          margin-bottom: 8px;

          color: var(--red);

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 0.15em;
        }


        .featured .pillar-label {
          color: rgba(255,255,255,0.75);
        }


        .pillar-card h4 {
          margin: 0 0 10px;

          font-family: var(--font-display);

          font-size: 19px;

          line-height: 1.2;

          font-weight: 600;
        }


        .pillar-card p {
          margin: 0;

          color: var(--grey);

          font-size: 13px;

          line-height: 1.65;
        }


        .featured p {
          color: rgba(255,255,255,0.84);
        }


        /* =====================================
           BOTTOM
        ===================================== */

        .pillar-bottom {
          position: relative;

          z-index: 4;

          margin-top: auto;

          padding-top: 24px;

          display: flex;

          justify-content: space-between;

          align-items: center;
        }


        .pillar-rule {
          width: 30px;
          height: 3px;

          border-radius: 5px;

          background: var(--grey-dim);

          transition:
            width 0.4s ease,
            background 0.35s ease;
        }


        .featured .pillar-rule {
          background: rgba(255,255,255,0.6);
        }


        .pillar-number {
          font-family: var(--font-display);

          font-size: 10px;

          color: var(--grey);

          letter-spacing: 0.12em;
        }


        .featured .pillar-number {
          color: rgba(255,255,255,0.65);
        }


        /* =====================================
           HOVER
        ===================================== */

        .pillar-card:hover {
          transform:
            translateY(-9px)
            scale(1.01);

          border-color: rgba(255,60,60,0.45);

          box-shadow:
            0 25px 60px rgba(0,0,0,0.28);
        }


        .pillar-card.featured:hover {
          border-color: transparent;

          box-shadow:
            0 25px 60px rgba(130,20,15,0.35);
        }


        .pillar-card:hover .pillar-icon {
          transform:
            translateY(-4px)
            rotate(-4deg)
            scale(1.06);

          border-color: var(--red);

          box-shadow:
            0 10px 30px rgba(0,0,0,0.18);
        }


        .pillar-card:hover .pillar-badge {
          transform:
            rotate(-5deg)
            scale(1.08);
        }


        .pillar-card:hover .pillar-arrow {
          transform:
            translate(3px,-3px)
            rotate(8deg);

          color: var(--red);

          border-color: var(--red);
        }


        .featured:hover .pillar-arrow {
          color: white;

          border-color: rgba(255,255,255,0.7);
        }


        .pillar-card:hover .pillar-ghost {
          transform:
            translate(-8px, 5px)
            scale(1.05);

          color: rgba(255,255,255,0.045);
        }


        .pillar-card:hover .pillar-rule {
          width: 55px;

          background: var(--red);
        }


        .featured:hover .pillar-rule {
          background: white;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 900px) {

          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 600px) {

          .pillars {
            padding-bottom: 80px;
          }

          .pillars-grid {
            grid-template-columns: 1fr;

            gap: 14px;
          }

          .pillar-card {
            min-height: 300px;
          }

        }


        /* =====================================
           REDUCED MOTION
        ===================================== */

        @media (prefers-reduced-motion: reduce) {

          .pillar-card {
            opacity: 1;

            transform: none;

            transition: none;
          }

          .pillar-card:hover {
            transform: none;
          }

        }

      `}</style>
    </section>
  )
}
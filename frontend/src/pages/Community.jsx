import { useEffect, useRef } from 'react'

import CommunityPillars from '../components/CommunityPillars.jsx'
import DrivingInnovation from '../components/DrivingInnovation.jsx'
import PartnerLogos from '../components/PartnerLogos.jsx'
import InnovativeStartups from '../components/InnovativeStartups.jsx'

const GROUPS = [
  'Fullstack Developers',
  'UI/UX Designers',
  'Graphic Designers',
  'Web Developers',
  'Future Leaders',
  'Tech Enthusiasts',
  'Visionaries',
  'Philanthropists',
]

export default function Community() {
  const pageRef = useRef(null)

  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll('.scroll-reveal')

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
        threshold: 0.15,
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={pageRef} className="community-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="community-hero">
        <div className="container community-hero-content">

          <span className="eyebrow hero-reveal">
            Our Community
          </span>

          <h1 className="community-title hero-reveal">
            Built by members, for members
          </h1>

          <p className="lead community-lead hero-reveal">
            A Super 60 member wears many hats — here's who makes up the community.
          </p>

        </div>
      </section>


      {/* =========================
          COMMUNITY GROUPS
      ========================= */}

      <section className="groups">
        <div className="container">

          <div className="groups-header scroll-reveal">

            <div className="groups-header-number">
              01
            </div>

            <div>
              <span className="eyebrow">
                Our Members
              </span>

              <h2>
                Different skills.
                <br />
                <span>One community.</span>
              </h2>
            </div>

          </div>


          <div className="groups-grid">

            {GROUPS.map((g, index) => (
              <div
                key={g}
                className="group-card scroll-reveal"
                style={{
                  '--delay': `${index * 90}ms`,
                }}
              >

                {/* Top */}

                <div className="group-top">

                  <span className="group-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="group-arrow">
                    ↗
                  </span>

                </div>


                {/* Center Visual */}

                <div className="group-visual">

                  <div className="visual-orbit orbit-one" />
                  <div className="visual-orbit orbit-two" />

                  <div className="visual-glow" />

                  <div className="visual-core">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                </div>


                {/* Bottom */}

                <div className="group-bottom">

                  <span className="group-label">
                    MEMBER TYPE
                  </span>

                  <h3 className="group-name">
                    {g}
                  </h3>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =========================
          EXISTING SECTIONS
      ========================= */}

      <CommunityPillars />

      <DrivingInnovation />

      <PartnerLogos />

      <InnovativeStartups />


      {/* =========================
          STYLES
      ========================= */}

      <style>{`

        /* =====================================
           HERO
        ===================================== */

        .community-hero {
          position: relative;

          padding-top: 90px;
          padding-bottom: 90px;

          text-align: center;

          overflow: hidden;
        }

        .community-hero::before {
          content: '';

          position: absolute;

          width: 520px;
          height: 520px;

          left: 50%;
          top: 45%;

          transform: translate(-50%, -50%);

          background: var(--red);

          opacity: 0.035;

          border-radius: 50%;

          filter: blur(120px);

          pointer-events: none;
        }

        .community-hero-content {
          position: relative;
          z-index: 2;
        }

        .community-hero .eyebrow {
          display: inline-block;

          margin-bottom: 18px;
        }

        .community-title {
          margin: 0;

          font-family: var(--font-display);

          font-size: clamp(36px, 6vw, 64px);

          font-weight: 700;

          line-height: 1.05;

          letter-spacing: -0.04em;
        }

        .community-lead {
          margin-top: 22px;

          max-width: 560px;

          color: var(--grey);

          line-height: 1.7;
        }


        /* =====================================
           HERO ANIMATION
        ===================================== */

        .hero-reveal {
          opacity: 0;

          transform: translateY(35px);

          animation:
            heroReveal 0.9s
            cubic-bezier(.2,.8,.2,1)
            forwards;
        }

        .community-title {
          animation-delay: 150ms;
        }

        .community-lead {
          animation-delay: 300ms;
        }

        @keyframes heroReveal {

          from {
            opacity: 0;

            transform: translateY(35px);
          }

          to {
            opacity: 1;

            transform: translateY(0);
          }

        }


        /* =====================================
           GROUP SECTION
        ===================================== */

        .groups {
          padding-bottom: 110px;
        }


        /* =====================================
           GROUP HEADER
        ===================================== */

        .groups-header {
          display: grid;

          grid-template-columns: 60px 1fr;

          gap: 20px;

          margin-bottom: 42px;

          align-items: start;
        }

        .groups-header-number {
          padding-top: 5px;

          color: var(--red);

          font-family: var(--font-display);

          font-size: 12px;

          font-weight: 700;

          letter-spacing: 0.12em;
        }

        .groups-header h2 {
          margin: 10px 0 0;

          font-family: var(--font-display);

          font-size: clamp(30px, 4vw, 48px);

          font-weight: 700;

          line-height: 1.05;

          letter-spacing: -0.035em;
        }

        .groups-header h2 span {
          color: var(--red);
        }


        /* =====================================
           SCROLL REVEAL
        ===================================== */

        .scroll-reveal {
          opacity: 0;

          transform: translateY(45px) scale(0.97);

          transition:
            opacity 0.8s ease,
            transform 0.8s
            cubic-bezier(.2,.8,.2,1);

          transition-delay: var(--delay, 0ms);
        }

        .scroll-reveal.is-visible {
          opacity: 1;

          transform: translateY(0) scale(1);
        }


        /* =====================================
           GRID
        ===================================== */

        .groups-grid {
          display: grid;

          grid-template-columns: repeat(4, 1fr);

          gap: 16px;
        }


        /* =====================================
           CARD
        ===================================== */

        .group-card {
          position: relative;

          height: 285px;

          padding: 18px;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          overflow: hidden;

          border-radius: 20px;

          border: 1px solid var(--line);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.035),
              rgba(255,255,255,0.008)
            );

          transition:
            transform 0.45s
            cubic-bezier(.2,.8,.2,1),
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }


        /* Card background glow */

        .group-card::before {
          content: '';

          position: absolute;

          width: 220px;
          height: 220px;

          left: 50%;
          top: 48%;

          transform:
            translate(-50%, -50%)
            scale(0.7);

          border-radius: 50%;

          background: var(--red);

          opacity: 0.025;

          filter: blur(70px);

          transition:
            opacity 0.5s ease,
            transform 0.6s ease;
        }


        /* =====================================
           TOP
        ===================================== */

        .group-top {
          position: relative;

          z-index: 5;

          display: flex;

          justify-content: space-between;

          align-items: center;
        }

        .group-number {
          font-family: var(--font-display);

          font-size: 11px;

          font-weight: 600;

          letter-spacing: 0.14em;

          color: var(--grey);
        }


        /* =====================================
           ARROW
        ===================================== */

        .group-arrow {
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


        /* =====================================
           CENTER VISUAL
        ===================================== */

        .group-visual {
          position: absolute;

          left: 50%;
          top: 47%;

          width: 125px;
          height: 125px;

          transform: translate(-50%, -50%);

          display: flex;

          align-items: center;

          justify-content: center;
        }


        /* Orbit */

        .visual-orbit {
          position: absolute;

          border-radius: 50%;

          border: 1px solid var(--line);

          transition:
            transform 0.7s ease,
            border-color 0.4s ease;
        }

        .orbit-one {
          width: 125px;
          height: 125px;
        }

        .orbit-two {
          width: 85px;
          height: 85px;

          border-color: rgba(255,255,255,0.07);
        }


        /* Glow */

        .visual-glow {
          position: absolute;

          width: 42px;
          height: 42px;

          border-radius: 50%;

          background: var(--red);

          opacity: 0.08;

          filter: blur(18px);

          transition:
            transform 0.5s ease,
            opacity 0.4s ease;
        }


        /* Center */

        .visual-core {
          position: relative;

          z-index: 3;

          width: 50px;
          height: 50px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 50%;

          background: var(--bg-panel);

          border: 1px solid var(--line);

          color: var(--red);

          font-family: var(--font-display);

          font-size: 11px;

          font-weight: 700;

          transition:
            transform 0.4s ease,
            border-color 0.4s ease;
        }


        /* =====================================
           CARD BOTTOM
        ===================================== */

        .group-bottom {
          position: relative;

          z-index: 5;

          margin-top: auto;
        }

        .group-label {
          display: block;

          margin-bottom: 7px;

          color: var(--red);

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 0.16em;
        }

        .group-name {
          margin: 0;

          color: var(--white);

          font-family: var(--font-display);

          font-size: 17px;

          font-weight: 600;

          line-height: 1.25;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }


        /* =====================================
           HOVER
        ===================================== */

        .group-card:hover {
          transform:
            translateY(-9px)
            scale(1.015);

          border-color: rgba(255, 60, 60, 0.45);

          box-shadow:
            0 25px 60px rgba(0,0,0,0.3);
        }

        .group-card:hover::before {
          opacity: 0.1;

          transform:
            translate(-50%, -50%)
            scale(1.25);
        }

        .group-card:hover .group-arrow {
          color: var(--white);

          background: var(--red);

          border-color: var(--red);

          transform:
            translate(2px, -2px)
            rotate(8deg);
        }

        .group-card:hover .orbit-one {
          transform:
            scale(1.08)
            rotate(18deg);

          border-color:
            rgba(255,60,60,0.25);
        }

        .group-card:hover .orbit-two {
          transform:
            scale(0.88)
            rotate(-18deg);

          border-color:
            rgba(255,60,60,0.2);
        }

        .group-card:hover .visual-glow {
          opacity: 0.28;

          transform: scale(1.5);
        }

        .group-card:hover .visual-core {
          border-color: var(--red);

          transform: scale(1.08);
        }

        .group-card:hover .group-name {
          color: var(--red);

          transform: translateX(3px);
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 900px) {

          .groups-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 600px) {

          .community-hero {
            padding-top: 65px;

            padding-bottom: 65px;
          }

          .community-title {
            font-size: clamp(36px, 11vw, 52px);
          }

          .groups {
            padding-bottom: 80px;
          }

          .groups-header {
            grid-template-columns: 40px 1fr;

            gap: 14px;

            margin-bottom: 30px;
          }

          .groups-grid {
            grid-template-columns: 1fr;

            gap: 13px;
          }

          .group-card {
            height: 245px;
          }

        }


        /* =====================================
           REDUCED MOTION
        ===================================== */

        @media (prefers-reduced-motion: reduce) {

          .hero-reveal {
            animation: none;

            opacity: 1;

            transform: none;
          }

          .scroll-reveal {
            opacity: 1;

            transform: none;

            transition: none;
          }

          .group-card,
          .group-card:hover {
            transform: none;
          }

        }

      `}</style>
    </div>
  )
}
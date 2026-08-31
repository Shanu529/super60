import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { getWithFallback } from '../lib/api.js'
import { visionMission as fallback } from '../data/fallback.js'

gsap.registerPlugin(ScrollTrigger)

export default function VisionMission() {
  const [data, setData] = useState(fallback)

  const sectionRef = useRef(null)
  const visionCardRef = useRef(null)
  const missionCardRef = useRef(null)
  const visionTextRef = useRef(null)

  useEffect(() => {
    getWithFallback(
      '/homepage/vision-mission',
      fallback
    ).then(setData)
  }, [])

  useLayoutEffect(() => {
    if (!data) return

    const ctx = gsap.context(() => {
      const visionCard = visionCardRef.current
      const missionCard = missionCardRef.current

      const cards = gsap.utils.toArray('.vm-card')
      const eyebrows = gsap.utils.toArray('.vm-eyebrow')
      const checks = gsap.utils.toArray('.vm-check')
      const missionTexts =
        gsap.utils.toArray('.vm-mission-text')
      const borders =
        gsap.utils.toArray('.vm-border-glow')

      /*
      =====================================================
      INITIAL STATES
      =====================================================
      */

      gsap.set(visionCard, {
        opacity: 0,
        x: -90,
        rotateY: -8,
        scale: 0.96,
      })

      gsap.set(missionCard, {
        opacity: 0,
        x: 90,
        rotateY: 8,
        scale: 0.96,
      })

      gsap.set(eyebrows, {
        opacity: 0,
        y: 20,
      })

      gsap.set(visionTextRef.current, {
        opacity: 0,
        y: 35,
      })

      gsap.set(checks, {
        opacity: 0,
        scale: 0,
        rotate: -30,
      })

      gsap.set(missionTexts, {
        opacity: 0,
        x: 25,
      })

      gsap.set(borders, {
        scaleX: 0,
        transformOrigin: 'left center',
      })

      /*
      =====================================================
      SCROLL REVEAL
      =====================================================
      */

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          end: 'top 42%',
          scrub: 1.2,
        },
      })

      revealTimeline
        .to(visionCard, {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power4.out',
        })
        .to(
          missionCard,
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power4.out',
          },
          '-=0.9'
        )
        .to(
          eyebrows,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.7'
        )
        .to(
          visionTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power4.out',
          },
          '-=0.45'
        )
        .to(
          checks,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: 'back.out(1.7)',
          },
          '-=0.65'
        )
        .to(
          missionTexts,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.55'
        )
        .to(
          borders,
          {
            scaleX: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.6'
        )

      /*
      =====================================================
      CONTINUOUS CARD FLOAT
      =====================================================
      */

      gsap.to(visionCard, {
        y: -5,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(missionCard, {
        y: 5,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.3,
      })

      /*
      =====================================================
      VISION TEXT BREATHING
      =====================================================
      */

      gsap.to(visionTextRef.current, {
        y: -4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      /*
      =====================================================
      CHECKMARK CONTINUOUS PULSE
      =====================================================
      */

      checks.forEach((check, index) => {
        gsap.to(check, {
          scale: 1.08,
          boxShadow:
            '0 0 18px rgba(229,35,27,0.35)',
          duration: 1.8 + index * 0.15,
          repeat: -1,
          yoyo: true,
          delay: index * 0.25,
          ease: 'sine.inOut',
        })
      })

      /*
      =====================================================
      BORDER GLOW
      =====================================================
      */

      borders.forEach((border, index) => {
        gsap.to(border, {
          opacity: 0.8,
          duration: 2.5 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.4,
        })
      })

      /*
      =====================================================
      SECTION PARALLAX
      =====================================================
      */

      gsap.to('.vm-grid', {
        y: -18,
        ease: 'none',

        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [data])

  /*
  =====================================================
  MOUSE TILT
  =====================================================
  */

  const handleMouseMove = (event) => {
    const card = event.currentTarget

    const rect = card.getBoundingClientRect()

    const x =
      event.clientX -
      rect.left -
      rect.width / 2

    const y =
      event.clientY -
      rect.top -
      rect.height / 2

    const rotateY =
      (x / rect.width) * 3

    const rotateX =
      -(y / rect.height) * 3

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  /*
  =====================================================
  MOUSE ENTER
  =====================================================
  */

  const handleMouseEnter = (event) => {
    const card = event.currentTarget

    const glow =
      card.querySelector('.vm-card-glow')

    gsap.to(card, {
      borderColor:
        'rgba(229,35,27,0.45)',
      boxShadow:
        '0 25px 80px rgba(0,0,0,0.25)',
      duration: 0.4,
      ease: 'power2.out',
    })

    gsap.to(glow, {
      opacity: 1,
      scale: 1.15,
      duration: 0.7,
      ease: 'power3.out',
    })
  }

  /*
  =====================================================
  MOUSE LEAVE
  =====================================================
  */

  const handleMouseLeave = (event) => {
    const card = event.currentTarget

    const glow =
      card.querySelector('.vm-card-glow')

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      borderColor:
        'rgba(255,255,255,0.05)',
      boxShadow: 'none',
      duration: 0.6,
      ease: 'power3.out',
    })

    gsap.to(glow, {
      opacity: 0.45,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  return (
    <section
      ref={sectionRef}
      className="vision-mission"
    >
      {/* Background grid */}

      <div className="vm-grid-bg" />

      {/* Ambient red glow */}

      <div className="vm-ambient-glow" />

      <div className="container vm-grid">

        {/* =================================================
            VISION
        ================================================= */}

        <div
          ref={visionCardRef}
          className="vm-card vm-vision"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          <div className="vm-card-glow" />

          <div className="vm-border-glow" />

          <div className="vm-number">
            01
          </div>

          <div className="content-wrapper">

            <span className="eyebrow vm-eyebrow">
              Our Vision
            </span>

            <p ref={visionTextRef}>
              {data.vision}
            </p>

          </div>

          <div className="vm-corner">
            ↗
          </div>

        </div>

        {/* =================================================
            MISSION
        ================================================= */}

        <div
          ref={missionCardRef}
          className="vm-card vm-mission"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          <div className="vm-card-glow" />

          <div className="vm-border-glow" />

          <div className="vm-number">
            02
          </div>

          <div className="content-wrapper">

            <span className="eyebrow vm-eyebrow">
              Our Mission
            </span>

            <ul>
              {data.mission.map((item, index) => (
                <li key={index}>

                  <span className="vm-check">
                    ✓
                  </span>

                  <span className="vm-mission-text">
                    {item}
                  </span>

                </li>
              ))}
            </ul>

          </div>

          <div className="vm-corner">
            ↗
          </div>

        </div>
      </div>

      <style>{`

        /* =================================================
           SECTION
        ================================================= */

        .vision-mission {
          position: relative;

          overflow: hidden;

          padding: 95px 0;

          background:
            var(--bg-body, #0a0a0a);
        }

        /* =================================================
           BACKGROUND GRID
        ================================================= */

        .vm-grid-bg {
          position: absolute;

          inset: 0;

          opacity: 0.025;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.5) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.5) 1px,
              transparent 1px
            );

          background-size:
            55px 55px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 20%,
              black 80%,
              transparent
            );

          pointer-events: none;
        }

        /* =================================================
           AMBIENT GLOW
        ================================================= */

        .vm-ambient-glow {
          position: absolute;

          width: 500px;
          height: 500px;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            var(--red);

          opacity: 0.025;

          filter: blur(150px);

          pointer-events: none;
        }

        /* =================================================
           GRID
        ================================================= */

        .vm-grid {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            1fr 1.15fr;

          gap: 20px;

          perspective: 1400px;

          will-change: transform;
        }

        /* =================================================
           CARD
        ================================================= */

        .vm-card {
          position: relative;

          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              var(--bg-panel, #141414),
              #0d0d0d
            );

          border:
            1px solid
            rgba(255,255,255,0.05);

          border-radius: 20px;

          padding: 44px 40px;

          transform-style: preserve-3d;

          will-change:
            transform,
            opacity;

          transition:
            border-color 0.4s ease,
            box-shadow 0.4s ease;
        }

        /* =================================================
           CARD GLOW
        ================================================= */

        .vm-card-glow {
          position: absolute;

          width: 280px;
          height: 280px;

          top: -120px;
          right: -120px;

          border-radius: 50%;

          background:
            var(--red);

          opacity: 0.35;

          filter: blur(100px);

          pointer-events: none;

          transition:
            opacity 0.5s ease,
            transform 0.7s ease;
        }

        /* =================================================
           BORDER GLOW
        ================================================= */

        .vm-border-glow {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--red),
              transparent
            );

          opacity: 0.6;

          transform-origin: left;

          pointer-events: none;
        }

        /* =================================================
           NUMBER
        ================================================= */

        .vm-number {
          position: absolute;

          top: 20px;
          right: 24px;

          font-family: monospace;

          font-size: 10px;

          color:
            var(--grey-dim);

          letter-spacing:
            0.12em;

          opacity: 0.5;
        }

        /* =================================================
           CONTENT
        ================================================= */

        .content-wrapper {
          position: relative;

          z-index: 3;
        }

        /* =================================================
           EYEBROW
        ================================================= */

        .vm-eyebrow {
          display: block;

          text-transform: uppercase;

          font-weight: 600;

          letter-spacing:
            0.16em;

          color:
            var(--red);

          font-size: 10px;

          margin-bottom: 22px;
        }

        /* =================================================
           VISION
        ================================================= */

        .vm-vision {
          display: flex;

          flex-direction: column;

          justify-content: center;

          min-height: 330px;
        }

        .vm-vision p {
          font-family:
            var(--font-display,
            system-ui,
            sans-serif);

          font-size:
            clamp(
              22px,
              3vw,
              31px
            );

          font-weight: 500;

          letter-spacing:
            -0.025em;

          line-height: 1.35;

          margin: 0;

          color:
            var(--white, #fff);

          will-change:
            transform,
            opacity;
        }

        /* =================================================
           MISSION
        ================================================= */

        .vm-mission {
          min-height: 330px;

          display: flex;

          align-items: center;
        }

        .vm-mission ul {
          list-style: none;

          margin: 0;
          padding: 0;

          display: flex;

          flex-direction: column;

          gap: 20px;
        }

        .vm-mission li {
          display: flex;

          align-items: flex-start;

          gap: 14px;

          color:
            var(--grey,
            #a1a1aa);

          font-size: 14px;

          line-height: 1.65;
        }

        /* =================================================
           CHECK
        ================================================= */

        .vm-check {
          flex-shrink: 0;

          width: 24px;
          height: 24px;

          border-radius: 50%;

          background:
            rgba(
              229,
              35,
              27,
              0.1
            );

          color:
            var(--red);

          border:
            1px solid
            rgba(
              229,
              35,
              27,
              0.2
            );

          display: flex;

          align-items: center;
          justify-content: center;

          font-size: 10px;

          font-weight: 700;

          margin-top: 1px;

          will-change:
            transform,
            box-shadow,
            opacity;
        }

        .vm-mission-text {
          flex: 1;

          will-change:
            transform,
            opacity;
        }

        /* =================================================
           CORNER ARROW
        ================================================= */

        .vm-corner {
          position: absolute;

          right: 22px;
          bottom: 18px;

          color:
            var(--red);

          font-size: 15px;

          opacity: 0.25;

          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .vm-card:hover .vm-corner {
          opacity: 1;

          transform:
            translate(3px, -3px);
        }

        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 860px) {

          .vision-mission {
            padding: 75px 0;
          }

          .vm-grid {
            grid-template-columns: 1fr;

            gap: 14px;
          }

          .vm-card {
            padding: 38px 28px;
          }

          .vm-vision,
          .vm-mission {
            min-height: 0;
          }
        }

        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 520px) {

          .vision-mission {
            padding: 65px 0;
          }

          .vm-card {
            padding: 32px 22px;

            border-radius: 16px;
          }

          .vm-vision p {
            font-size: 22px;

            line-height: 1.4;
          }

          .vm-mission ul {
            gap: 16px;
          }

          .vm-mission li {
            font-size: 13px;

            gap: 11px;
          }

          .vm-check {
            width: 22px;
            height: 22px;

            font-size: 9px;
          }

          .vm-number {
            top: 16px;
            right: 18px;
          }
        }

        /* =================================================
           REDUCED MOTION
        ================================================= */

        @media (prefers-reduced-motion: reduce) {

          .vm-card,
          .vm-check,
          .vm-vision p {
            transition: none !important;
          }
        }

      `}</style>
    </section>
  )
}
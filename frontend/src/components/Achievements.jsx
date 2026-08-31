import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  {
    icon: '📊',
    num: 860000,
    prefix: '₹',
    label: 'Revenue Generated',
  },
  {
    icon: '👤',
    num: 100,
    prefix: '',
    label: 'Tech Partners',
  },
  {
    icon: '💡',
    num: 150,
    prefix: '',
    label: 'Projects Delivered',
  },
  {
    icon: '📅',
    num: 40,
    prefix: '',
    label: 'Community Events',
  },
]

export default function Achievements() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stat-card')
      const icons = gsap.utils.toArray('.stat-icon')
      const values = gsap.utils.toArray('.stat-value')
      const labels = gsap.utils.toArray('.stat-label')
      const rings = gsap.utils.toArray('.stat-ring')
      const sweeps = gsap.utils.toArray('.stat-sweep')

      /*
      =====================================================
      INITIAL HEADER STATE
      =====================================================
      */

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 20,
      })

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 40,
        clipPath: 'inset(0 0 100% 0)',
      })

      /*
      =====================================================
      INITIAL CARD STATE
      =====================================================
      */

      gsap.set(cards, {
        opacity: 0,
        y: 80,
        scale: 0.88,
        rotateX: 12,
        transformPerspective: 1400,
      })

      gsap.set(icons, {
        opacity: 0,
        scale: 0,
        rotate: -25,
      })

      gsap.set(values, {
        opacity: 0,
        y: 15,
      })

      gsap.set(labels, {
        opacity: 0,
        y: 12,
      })

      gsap.set(rings, {
        rotate: -90,
        scale: 0.8,
        opacity: 0,
      })

      gsap.set(sweeps, {
        xPercent: -120,
      })

      /*
      =====================================================
      HEADER SCROLL REVEAL
      =====================================================
      */

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 88%',
          end: 'top 55%',
          scrub: 1.2,
        },
      })

      headerTimeline
        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1,
            ease: 'power4.out',
          },
          '-=0.45'
        )

      /*
      =====================================================
      CARD REVEAL
      =====================================================
      */

      cards.forEach((card, index) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            end: 'top 58%',
            scrub: 1.1,
          },
        })

        timeline
          .to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: 'power4.out',
          })
          .to(
            icons[index],
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.55,
              ease: 'back.out(1.8)',
            },
            '-=0.7'
          )
          .to(
            rings[index],
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power3.out',
            },
            '-=0.5'
          )
          .to(
            values[index],
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.4'
          )
          .to(
            labels[index],
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.3'
          )
      })

      /*
      =====================================================
      NUMBER COUNTERS
      =====================================================
      */

      values.forEach((node) => {
        const targetNum = parseInt(
          node.getAttribute('data-num'),
          10
        )

        const prefix =
          node.getAttribute('data-prefix') || ''

        const counter = {
          value: 0,
        }

        gsap.to(counter, {
          value: targetNum,
          duration: 2.2,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: node,
            start: 'top 82%',
            once: true,
          },

          onUpdate: () => {
            node.textContent =
              prefix +
              Math.round(counter.value).toLocaleString(
                'en-IN'
              )
          },

          onComplete: () => {
            gsap.fromTo(
              node,
              {
                scale: 1,
                textShadow: '0 0 0px transparent',
              },
              {
                scale: 1.06,
                textShadow:
                  '0 0 22px rgba(255,255,255,0.18)',
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out',
              }
            )
          },
        })
      })

      /*
      =====================================================
      CONTINUOUS FLOATING
      =====================================================
      */

      cards.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -5 : 5,
          duration: 2.8 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.25,
        })
      })

      /*
      =====================================================
      ICON FLOATING
      =====================================================
      */

      icons.forEach((icon, index) => {
        gsap.to(icon, {
          y: -3,
          rotate: index % 2 === 0 ? 3 : -3,
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        })
      })

      /*
      =====================================================
      CONTINUOUS LIGHT SWEEP
      =====================================================
      */

      sweeps.forEach((sweep, index) => {
        gsap.to(sweep, {
          xPercent: 120,
          duration: 3.5,
          repeat: -1,
          delay: index * 0.8,
          ease: 'power2.inOut',
        })
      })

      /*
      =====================================================
      RING ROTATION
      =====================================================
      */

      rings.forEach((ring, index) => {
        gsap.to(ring, {
          rotate: 270,
          duration: 8 + index,
          repeat: -1,
          ease: 'none',
        })
      })

      /*
      =====================================================
      GRID PARALLAX
      =====================================================
      */

      gsap.to(gridRef.current, {
        y: -20,
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
  }, [])

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
      (x / rect.width) * 5

    const rotateX =
      -(y / rect.height) * 5

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.025,
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

    const icon =
      card.querySelector('.stat-icon')

    const value =
      card.querySelector('.stat-value')

    gsap.to(card, {
      borderColor: 'var(--red)',
      boxShadow:
        '0 25px 70px rgba(0,0,0,0.25)',
      duration: 0.35,
      ease: 'power2.out',
    })

    gsap.to(icon, {
      scale: 1.08,
      duration: 0.35,
      ease: 'back.out(1.7)',
    })

    gsap.to(value, {
      color: 'var(--red)',
      duration: 0.3,
    })
  }

  /*
  =====================================================
  MOUSE LEAVE
  =====================================================
  */

  const handleMouseLeave = (event) => {
    const card = event.currentTarget

    const icon =
      card.querySelector('.stat-icon')

    const value =
      card.querySelector('.stat-value')

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      borderColor: 'var(--line)',
      boxShadow: 'none',
      duration: 0.6,
      ease: 'power3.out',
    })

    gsap.to(icon, {
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
    })

    gsap.to(value, {
      color: 'var(--white)',
      duration: 0.4,
    })
  }

  return (
    <section
      ref={sectionRef}
      className="achievements"
    >
      {/* Background decorative grid */}

      <div className="achievement-grid-bg" />

      {/* Red glow */}

      <div className="achievement-glow" />

      <div className="container">

        {/* ================================================
            HEADER
        ================================================ */}

        <div
          ref={headingRef}
          className="section-head"
        >
          <span
            ref={eyebrowRef}
            className="eyebrow"
          >
            Our Achievements
          </span>

          <h2 ref={titleRef}>
            Making an{' '}
            <span className="achievement-red">
              Impact
            </span>
          </h2>
        </div>

        {/* ================================================
            STAT GRID
        ================================================ */}

        <div
          ref={gridRef}
          className="stat-grid"
        >
          {STATS.map((s, index) => (
            <div
              key={s.label}
              className="stat-card"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >

              {/* Light sweep */}

              <div className="stat-sweep" />

              {/* Number */}

              <span className="stat-index">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Icon */}

              <div className="stat-icon-wrapper">

                <div className="stat-ring" />

                <div className="stat-icon">
                  {s.icon}
                </div>

              </div>

              {/* Number */}

              <div
                className="stat-value"
                data-num={s.num}
                data-prefix={s.prefix}
              >
                {s.prefix}0
              </div>

              {/* Label */}

              <div className="stat-label">
                {s.label}
              </div>

              {/* Bottom indicator */}

              <div className="stat-indicator">
                <span />
              </div>

            </div>
          ))}
        </div>
      </div>

      <style>{`

        /* ================================================
           SECTION
        ================================================ */

        .achievements {
          position: relative;
          overflow: hidden;
          padding: 90px 0;
        }

        /* ================================================
           BACKGROUND GRID
        ================================================ */

        .achievement-grid-bg {
          position: absolute;

          inset: 0;

          opacity: 0.025;

          background-image:
            linear-gradient(
              var(--white) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              var(--white) 1px,
              transparent 1px
            );

          background-size: 55px 55px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 25%,
              black 75%,
              transparent
            );

          pointer-events: none;
        }

        /* ================================================
           RED GLOW
        ================================================ */

        .achievement-glow {
          position: absolute;

          width: 450px;
          height: 450px;

          top: 50%;
          left: 50%;

          transform:
            translate(-50%, -50%);

          background: var(--red);

          opacity: 0.025;

          filter: blur(140px);

          border-radius: 50%;

          pointer-events: none;
        }

        /* ================================================
           HEADER
        ================================================ */

        .section-head {
          position: relative;

          z-index: 2;

          text-align: center;

          margin-bottom: 48px;
        }

        .section-head h2 {
          font-family: var(--font-display);

          font-weight: 700;

          font-size:
            clamp(28px, 4vw, 40px);

          line-height: 1.1;

          letter-spacing: -0.025em;

          margin: 10px 0 0;
        }

        .achievement-red {
          color: var(--red);
        }

        /* ================================================
           GRID
        ================================================ */

        .stat-grid {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 16px;

          perspective: 1400px;

          will-change: transform;
        }

        /* ================================================
           CARD
        ================================================ */

        .stat-card {
          position: relative;

          overflow: hidden;

          min-height: 245px;

          padding: 22px;

          background:
            linear-gradient(
              145deg,
              var(--bg-panel),
              rgba(255,255,255,0.01)
            );

          border: 1px solid var(--line);

          border-radius: 17px;

          display: flex;

          flex-direction: column;

          justify-content: flex-start;

          transform-style: preserve-3d;

          will-change:
            transform,
            opacity;

          transition:
            background 0.4s ease;
        }

        .stat-card:hover {
          background:
            linear-gradient(
              145deg,
              var(--bg-panel),
              rgba(255,255,255,0.025)
            );
        }

        /* ================================================
           LIGHT SWEEP
        ================================================ */

        .stat-sweep {
          position: absolute;

          top: 0;
          bottom: 0;

          left: -30%;

          width: 25%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.05),
              transparent
            );

          transform:
            skewX(-18deg);

          pointer-events: none;
        }

        /* ================================================
           CARD INDEX
        ================================================ */

        .stat-index {
          position: absolute;

          top: 15px;
          right: 17px;

          color: var(--grey-dim);

          font-family: monospace;

          font-size: 9px;

          letter-spacing: 0.12em;

          opacity: 0.5;
        }

        /* ================================================
           ICON
        ================================================ */

        .stat-icon-wrapper {
          position: relative;

          width: 48px;
          height: 48px;

          margin-bottom: 28px;

          display: flex;

          align-items: center;
          justify-content: center;
        }

        .stat-icon {
          position: relative;

          z-index: 2;

          width: 42px;
          height: 42px;

          border-radius: 12px;

          background: var(--red-soft);

          display: flex;

          align-items: center;
          justify-content: center;

          font-size: 18px;

          border:
            1px solid
            rgba(255,255,255,0.04);

          will-change: transform;
        }

        /* ================================================
           ROTATING RING
        ================================================ */

        .stat-ring {
          position: absolute;

          inset: -3px;

          border-radius: 50%;

          border:
            1px dashed
            rgba(255,255,255,0.12);

          border-top-color: var(--red);

          border-right-color: var(--red);

          will-change: transform;
        }

        /* ================================================
           VALUE
        ================================================ */

        .stat-value {
          position: relative;

          z-index: 2;

          font-family: var(--font-display);

          font-weight: 700;

          font-size:
            clamp(25px, 3vw, 32px);

          line-height: 1.1;

          letter-spacing: -0.02em;

          font-variant-numeric:
            tabular-nums;

          color: var(--white);

          white-space: nowrap;

          will-change:
            transform,
            opacity,
            color;
        }

        /* ================================================
           LABEL
        ================================================ */

        .stat-label {
          position: relative;

          z-index: 2;

          color: var(--grey);

          font-size: 12px;

          margin-top: 6px;

          line-height: 1.4;

          will-change:
            transform,
            opacity;
        }

        /* ================================================
           BOTTOM INDICATOR
        ================================================ */

        .stat-indicator {
          position: absolute;

          left: 22px;
          right: 22px;

          bottom: 18px;

          height: 1px;

          background: var(--line);

          overflow: hidden;
        }

        .stat-indicator span {
          display: block;

          width: 35%;

          height: 100%;

          background: var(--red);

          box-shadow:
            0 0 10px var(--red);

          animation:
            statLine 2.5s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes statLine {
          from {
            transform: translateX(-20%);
            opacity: 0.3;
          }

          to {
            transform: translateX(200%);
            opacity: 1;
          }
        }

        /* ================================================
           TABLET
        ================================================ */

        @media (max-width: 900px) {

          .achievements {
            padding: 75px 0;
          }

          .stat-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }
        }

        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 480px) {

          .achievements {
            padding: 65px 0;
          }

          .section-head {
            margin-bottom: 32px;
          }

          .stat-grid {
            grid-template-columns: 1fr;

            gap: 12px;
          }

          .stat-card {
            min-height: 205px;

            padding: 19px;
          }

          .stat-icon-wrapper {
            margin-bottom: 23px;
          }

          .stat-value {
            font-size: 27px;
          }

          .stat-label {
            font-size: 11px;
          }
        }

        /* ================================================
           REDUCED MOTION
        ================================================ */

        @media (prefers-reduced-motion: reduce) {

          .stat-indicator span {
            animation: none;
          }

          .stat-card,
          .stat-icon,
          .stat-ring {
            transition: none !important;
          }
        }

      `}</style>
    </section>
  )
}
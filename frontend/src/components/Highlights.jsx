import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { getWithFallback } from '../lib/api.js'
import { highlights as fallback } from '../data/fallback.js'

gsap.registerPlugin(ScrollTrigger)

export default function Highlights() {
  const [items, setItems] = useState(fallback)

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const rowRef = useRef(null)

  useEffect(() => {
    getWithFallback(
      '/homepage/highlights',
      fallback
    ).then(setItems)
  }, [])

  useLayoutEffect(() => {
    if (!items.length) return

    const ctx = gsap.context(() => {
      const cards =
        gsap.utils.toArray('.highlight-card')

      const icons =
        gsap.utils.toArray('.highlight-icon')

      const rings =
        gsap.utils.toArray('.highlight-icon-ring')

      const titles =
        gsap.utils.toArray('.highlight-title')

      const descriptions =
        gsap.utils.toArray('.highlight-text')

      const sweeps =
        gsap.utils.toArray('.highlight-sweep')

      const lines =
        gsap.utils.toArray('.highlight-line span')

      /*
      =====================================================
      INITIAL HEADER
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
      INITIAL CARDS
      =====================================================
      */

      gsap.set(cards, {
        opacity: 0,
        y: 70,
        scale: 0.9,
        rotateX: 10,
        transformPerspective: 1400,
      })

      gsap.set(icons, {
        opacity: 0,
        scale: 0,
        rotate: -25,
      })

      gsap.set(rings, {
        opacity: 0,
        scale: 0.6,
      })

      gsap.set(titles, {
        opacity: 0,
        x: -15,
      })

      gsap.set(descriptions, {
        opacity: 0,
        x: -15,
      })

      gsap.set(sweeps, {
        xPercent: -120,
      })

      /*
      =====================================================
      HEADER REVEAL
      =====================================================
      */

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 88%',
          end: 'top 52%',
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
          '-=0.4'
        )

      /*
      =====================================================
      CARD SCROLL REVEAL
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
            rings[index],
            {
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: 'power3.out',
            },
            '-=0.7'
          )
          .to(
            icons[index],
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.55,
              ease: 'back.out(1.7)',
            },
            '-=0.55'
          )
          .to(
            titles[index],
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.35'
          )
          .to(
            descriptions[index],
            {
              opacity: 1,
              x: 0,
              duration: 0.55,
              ease: 'power3.out',
            },
            '-=0.35'
          )
      })

      /*
      =====================================================
      SCROLL-LINKED ROW PARALLAX
      =====================================================
      */

      gsap.fromTo(
        rowRef.current,
        {
          x: -35,
        },
        {
          x: 35,
          ease: 'none',

          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )

      /*
      =====================================================
      CONTINUOUS CARD FLOAT
      =====================================================
      */

      cards.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -4 : 4,
          duration:
            2.8 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        })
      })

      /*
      =====================================================
      ICON FLOAT
      =====================================================
      */

      icons.forEach((icon, index) => {
        gsap.to(icon, {
          y: -4,
          rotate:
            index % 2 === 0
              ? 3
              : -3,
          duration:
            2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        })
      })

      /*
      =====================================================
      RING ROTATION
      =====================================================
      */

      rings.forEach((ring, index) => {
        gsap.to(ring, {
          rotate: 360,
          duration:
            7 + index,
          repeat: -1,
          ease: 'none',
        })
      })

      /*
      =====================================================
      LIGHT SWEEP
      =====================================================
      */

      sweeps.forEach((sweep, index) => {
        gsap.to(sweep, {
          xPercent: 120,
          duration: 3.5,
          repeat: -1,
          delay: index * 0.7,
          ease: 'power2.inOut',
        })
      })

      /*
      =====================================================
      BOTTOM PROGRESS LINES
      =====================================================
      */

      lines.forEach((line, index) => {
        gsap.to(line, {
          xPercent: 250,
          duration: 2.8,
          repeat: -1,
          delay: index * 0.4,
          ease: 'power2.inOut',
        })
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [items])

  /*
  =====================================================
  MOUSE MOVE
  =====================================================
  */

  const handleMouseMove = (event) => {
    const card = event.currentTarget

    const rect =
      card.getBoundingClientRect()

    const x =
      event.clientX -
      rect.left -
      rect.width / 2

    const y =
      event.clientY -
      rect.top -
      rect.height / 2

    const rotateY =
      (x / rect.width) * 4.5

    const rotateX =
      -(y / rect.height) * 4.5

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.025,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: true,
    })

    const glow =
      card.querySelector(
        '.highlight-card-glow'
      )

    gsap.to(glow, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.6,
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
      card.querySelector(
        '.highlight-icon'
      )

    const title =
      card.querySelector(
        '.highlight-title'
      )

    const arrow =
      card.querySelector(
        '.highlight-arrow'
      )

    gsap.to(card, {
      borderColor:
        'rgba(229,35,27,0.45)',

      boxShadow:
        '0 25px 70px rgba(0,0,0,0.28)',

      duration: 0.35,
      ease: 'power2.out',
    })

    gsap.to(icon, {
      scale: 1.1,
      duration: 0.35,
      ease: 'back.out(1.7)',
    })

    gsap.to(title, {
      x: 5,
      color: 'var(--red)',
      duration: 0.35,
      ease: 'power3.out',
    })

    gsap.to(arrow, {
      x: 6,
      opacity: 1,
      duration: 0.35,
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

    const icon =
      card.querySelector(
        '.highlight-icon'
      )

    const title =
      card.querySelector(
        '.highlight-title'
      )

    const arrow =
      card.querySelector(
        '.highlight-arrow'
      )

    const glow =
      card.querySelector(
        '.highlight-card-glow'
      )

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,

      borderColor:
        'rgba(255,255,255,0.05)',

      boxShadow: 'none',

      duration: 0.6,
      ease: 'power3.out',
    })

    gsap.to(icon, {
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
    })

    gsap.to(title, {
      x: 0,
      color: 'var(--white)',
      duration: 0.5,
      ease: 'power3.out',
    })

    gsap.to(arrow, {
      x: 0,
      opacity: 0.35,
      duration: 0.5,
      ease: 'power3.out',
    })

    gsap.to(glow, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    })
  }

  return (
    <section
      ref={sectionRef}
      className="highlights"
    >

      {/* Background grid */}

      <div className="highlight-grid-bg" />

      {/* Ambient glow */}

      <div className="highlight-ambient-glow" />

      <div className="container">

        {/* ================================================
            HEADER
        ================================================= */}

        <div
          ref={headingRef}
          className="section-head"
        >
          <span
            ref={eyebrowRef}
            className="eyebrow"
          >
            Highlights
          </span>

          <h2 ref={titleRef}>
            What happens inside{' '}
            <span className="highlight-red">
              Super 60
            </span>
          </h2>
        </div>

        {/* ================================================
            CARDS
        ================================================= */}

        <div
          ref={rowRef}
          className="highlight-row"
        >
          {items.map((item, index) => (
            <div
              className="highlight-card"
              key={item.title || index}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >

              {/* Cursor glow */}

              <div className="highlight-card-glow" />

              {/* Moving light */}

              <div className="highlight-sweep" />

              {/* Number */}

              <span className="highlight-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Icon */}

              <div className="highlight-icon-wrap">

                <div className="highlight-icon-ring" />

                <div className="highlight-icon">
                  {item.icon}
                </div>

              </div>

              {/* Content */}

              <div className="highlight-content">

                <h3 className="highlight-title">
                  {item.title}
                </h3>

                <p className="highlight-text">
                  {item.text}
                </p>

              </div>

              {/* Arrow */}

              <span className="highlight-arrow">
                →
              </span>

              {/* Bottom line */}

              <div className="highlight-line">
                <span />
              </div>

            </div>
          ))}
        </div>

      </div>

      <style>{`

        /* =================================================
           SECTION
        ================================================= */

        .highlights {
          position: relative;

          overflow: hidden;

          padding: 95px 0;

          background:
            var(--bg-body, #0a0a0a);
        }

        /* =================================================
           GRID BACKGROUND
        ================================================= */

        .highlight-grid-bg {
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

        .highlight-ambient-glow {
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
           HEADER
        ================================================= */

        .section-head {
          position: relative;

          z-index: 2;

          margin-bottom: 48px;
        }

        .eyebrow {
          text-transform: uppercase;

          font-weight: 600;

          letter-spacing:
            0.16em;

          color:
            var(--red);

          font-size: 10px;

          display: block;

          margin-bottom: 12px;
        }

        .section-head h2 {
          font-family:
            var(
              --font-display,
              system-ui,
              sans-serif
            );

          font-size:
            clamp(
              28px,
              3.5vw,
              38px
            );

          font-weight: 600;

          letter-spacing:
            -0.025em;

          line-height: 1.1;

          color:
            var(--white);

          margin: 0;
        }

        .highlight-red {
          color:
            var(--red);
        }

        /* =================================================
           ROW
        ================================================= */

        .highlight-row {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 16px;

          perspective: 1400px;

          will-change: transform;
        }

        /* =================================================
           CARD
        ================================================= */

        .highlight-card {
          position: relative;

          overflow: hidden;

          min-height: 185px;

          display: flex;

          align-items: center;

          gap: 20px;

          padding: 24px;

          background:
            linear-gradient(
              145deg,
              var(--bg-panel, #141414),
              #0d0d0d
            );

          border:
            1px solid
            rgba(255,255,255,0.05);

          border-radius: 17px;

          transform-style: preserve-3d;

          will-change:
            transform,
            opacity;

          transition:
            background 0.4s ease;
        }

        .highlight-card:hover {
          background:
            linear-gradient(
              145deg,
              var(--bg-panel),
              rgba(255,255,255,0.025)
            );
        }

        /* =================================================
           CURSOR GLOW
        ================================================= */

        .highlight-card-glow {
          position: absolute;

          width: 220px;
          height: 220px;

          top: -110px;
          right: -100px;

          border-radius: 50%;

          background:
            var(--red);

          opacity: 0.16;

          filter: blur(80px);

          pointer-events: none;

          will-change: transform;
        }

        /* =================================================
           LIGHT SWEEP
        ================================================= */

        .highlight-sweep {
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

        /* =================================================
           NUMBER
        ================================================= */

        .highlight-number {
          position: absolute;

          top: 15px;
          right: 18px;

          font-family: monospace;

          font-size: 9px;

          color:
            var(--grey-dim);

          letter-spacing:
            0.12em;

          opacity: 0.45;
        }

        /* =================================================
           ICON
        ================================================= */

        .highlight-icon-wrap {
          position: relative;

          flex-shrink: 0;

          width: 52px;
          height: 52px;

          display: flex;

          align-items: center;
          justify-content: center;
        }

        .highlight-icon {
          position: relative;

          z-index: 2;

          width: 44px;
          height: 44px;

          border-radius: 13px;

          background:
            rgba(
              229,
              35,
              27,
              0.08
            );

          border:
            1px solid
            rgba(
              229,
              35,
              27,
              0.18
            );

          display: flex;

          align-items: center;
          justify-content: center;

          font-size: 18px;

          filter:
            grayscale(100%)
            contrast(180%)
            brightness(150%);

          box-shadow:
            0 10px 25px
            rgba(0,0,0,0.2);

          will-change:
            transform,
            opacity;
        }

        /* =================================================
           ICON RING
        ================================================= */

        .highlight-icon-ring {
          position: absolute;

          inset: -3px;

          border-radius: 50%;

          border:
            1px dashed
            rgba(255,255,255,0.12);

          border-top-color:
            var(--red);

          border-right-color:
            var(--red);

          will-change:
            transform,
            opacity;
        }

        /* =================================================
           CONTENT
        ================================================= */

        .highlight-content {
          position: relative;

          z-index: 2;

          display: flex;

          flex-direction: column;

          justify-content: center;

          padding-right: 18px;
        }

        .highlight-title {
          font-family:
            var(
              --font-display,
              system-ui,
              sans-serif
            );

          font-size: 16px;

          font-weight: 600;

          color:
            var(--white);

          line-height: 1.3;

          margin: 0 0 7px;

          will-change:
            transform,
            opacity,
            color;
        }

        .highlight-text {
          color:
            var(--grey);

          font-size: 12px;

          line-height: 1.65;

          margin: 0;

          will-change:
            transform,
            opacity;
        }

        /* =================================================
           ARROW
        ================================================= */

        .highlight-arrow {
          position: absolute;

          right: 20px;
          bottom: 18px;

          color:
            var(--red);

          font-size: 15px;

          opacity: 0.35;

          will-change:
            transform,
            opacity;
        }

        /* =================================================
           BOTTOM LINE
        ================================================= */

        .highlight-line {
          position: absolute;

          left: 24px;
          right: 24px;

          bottom: 10px;

          height: 1px;

          background:
            var(--line);

          overflow: hidden;
        }

        .highlight-line span {
          display: block;

          width: 28%;

          height: 100%;

          background:
            var(--red);

          box-shadow:
            0 0 10px
            var(--red);

          will-change:
            transform;
        }

        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 860px) {

          .highlights {
            padding: 75px 0;
          }

          .highlight-row {
            grid-template-columns:
              1fr;
          }
        }

        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 520px) {

          .highlights {
            padding: 65px 0;
          }

          .section-head {
            margin-bottom: 34px;
          }

          .highlight-row {
            gap: 12px;
          }

          .highlight-card {
            min-height: 175px;

            padding: 20px;

            gap: 15px;

            border-radius: 15px;
          }

          .highlight-icon-wrap {
            width: 46px;
            height: 46px;
          }

          .highlight-icon {
            width: 40px;
            height: 40px;

            font-size: 16px;
          }

          .highlight-title {
            font-size: 15px;
          }

          .highlight-text {
            font-size: 11px;

            line-height: 1.6;
          }

          .highlight-arrow {
            right: 16px;
            bottom: 15px;
          }
        }

        /* =================================================
           REDUCED MOTION
        ================================================= */

        @media (prefers-reduced-motion: reduce) {

          .highlight-card,
          .highlight-icon,
          .highlight-icon-ring {
            transition: none !important;
          }
        }

      `}</style>
    </section>
  )
}
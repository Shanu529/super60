import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { getWithFallback } from '../lib/api.js'
import { whyChooseUs as fallback } from '../data/fallback.js'

gsap.registerPlugin(ScrollTrigger)

export default function WhyChooseUs() {
  const [items, setItems] = useState(fallback)

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    getWithFallback(
      '/homepage/why-choose-us',
      fallback
    ).then(setItems)
  }, [])

  useLayoutEffect(() => {
    if (!items.length) return

    const ctx = gsap.context(() => {
      const cards =
        gsap.utils.toArray('.why-card')

      const icons =
        gsap.utils.toArray('.why-icon')

      const titles =
        gsap.utils.toArray('.why-card-title')

      const descriptions =
        gsap.utils.toArray('.why-card-text')

      const rings =
        gsap.utils.toArray('.why-icon-ring')

      const sweeps =
        gsap.utils.toArray('.why-sweep')

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
        y: 45,
        clipPath: 'inset(0 0 100% 0)',
      })

      /*
      =====================================================
      INITIAL CARDS
      =====================================================
      */

      gsap.set(cards, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotateX: 10,
        rotateY: -3,
        transformPerspective: 1400,
      })

      gsap.set(icons, {
        opacity: 0,
        scale: 0,
        rotate: -20,
      })

      gsap.set(titles, {
        opacity: 0,
        y: 15,
      })

      gsap.set(descriptions, {
        opacity: 0,
        y: 15,
      })

      gsap.set(rings, {
        scale: 0.5,
        opacity: 0,
        rotate: -90,
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
            start: 'top 93%',
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
            rotateY: 0,
            duration: 1,
            ease: 'power4.out',
          })
          .to(
            rings[index],
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
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
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.35'
          )
          .to(
            descriptions[index],
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power3.out',
            },
            '-=0.35'
          )
      })

      /*
      =====================================================
      CONTINUOUS CARD FLOAT
      =====================================================
      */

      cards.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -4 : 4,
          duration: 3 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        })
      })

      /*
      =====================================================
      CONTINUOUS ICON FLOAT
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
            2.2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        })
      })

      /*
      =====================================================
      ICON RING ROTATION
      =====================================================
      */

      rings.forEach((ring, index) => {
        gsap.to(ring, {
          rotate: 270,
          duration: 7 + index,
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
          delay: index * 0.8,
          ease: 'power2.inOut',
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

    /*
    ---------------------------------------------
    Move the internal glow toward cursor
    ---------------------------------------------
    */

    const glow =
      card.querySelector('.why-card-glow')

    gsap.to(glow, {
      x: x * 0.12,
      y: y * 0.12,
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
      card.querySelector('.why-icon')

    const title =
      card.querySelector('.why-card-title')

    const arrow =
      card.querySelector('.why-arrow')

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
      x: 4,
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
      card.querySelector('.why-icon')

    const title =
      card.querySelector('.why-card-title')

    const arrow =
      card.querySelector('.why-arrow')

    const glow =
      card.querySelector('.why-card-glow')

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
      className="why-choose"
    >

      {/* Background grid */}

      <div className="why-grid-bg" />

      {/* Ambient red glow */}

      <div className="why-ambient-glow" />

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
            Why Choose Us
          </span>

          <h2 ref={titleRef}>
            Built different,
            <span className="why-red">
              {' '}on purpose
            </span>
          </h2>
        </div>

        {/* ================================================
            GRID
        ================================================= */}

        <div
          ref={gridRef}
          className="why-grid"
        >
          {items.map((item, index) => (
            <div
              className="why-card"
              key={item.title || index}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >

              {/* Internal glow */}

              <div className="why-card-glow" />

              {/* Moving light */}

              <div className="why-sweep" />

              {/* Card number */}

              <span className="why-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Icon */}

              <div className="why-icon-wrap">

                <div className="why-icon-ring" />

                <div className="why-icon">
                  {item.icon}
                </div>

              </div>

              {/* Content */}

              <h3 className="why-card-title">
                {item.title}
              </h3>

              <p className="why-card-text">
                {item.text}
              </p>

              {/* Arrow */}

              <span className="why-arrow">
                →
              </span>

              {/* Bottom line */}

              <div className="why-bottom-line">
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

        .why-choose {
          position: relative;

          overflow: hidden;

          padding: 95px 0;

          background:
            var(--bg-body, #0a0a0a);
        }

        /* =================================================
           BACKGROUND GRID
        ================================================= */

        .why-grid-bg {
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

        .why-ambient-glow {
          position: absolute;

          width: 500px;
          height: 500px;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background: var(--red);

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

          text-align: center;

          margin-bottom: 48px;
        }

        .eyebrow {
          text-transform: uppercase;

          font-weight: 600;

          letter-spacing: 0.16em;

          color: var(--red);

          font-size: 10px;

          display: block;

          margin-bottom: 12px;
        }

        .section-head h2 {
          font-family:
            var(--font-display,
            system-ui,
            sans-serif);

          font-size:
            clamp(
              28px,
              4vw,
              40px
            );

          font-weight: 600;

          letter-spacing:
            -0.025em;

          line-height: 1.1;

          color:
            var(--white);

          margin: 0;
        }

        .why-red {
          color: var(--red);
        }

        /* =================================================
           GRID
        ================================================= */

        .why-grid {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 16px;

          perspective: 1400px;

          will-change: transform;
        }

        /* =================================================
           CARD
        ================================================= */

        .why-card {
          position: relative;

          overflow: hidden;

          min-height: 270px;

          padding: 24px;

          display: flex;

          flex-direction: column;

          align-items: flex-start;

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

        .why-card:hover {
          background:
            linear-gradient(
              145deg,
              var(--bg-panel, #141414),
              rgba(255,255,255,0.025)
            );
        }

        /* =================================================
           CARD GLOW
        ================================================= */

        .why-card-glow {
          position: absolute;

          width: 220px;
          height: 220px;

          top: -100px;
          right: -100px;

          border-radius: 50%;

          background: var(--red);

          opacity: 0.18;

          filter: blur(80px);

          pointer-events: none;

          will-change: transform;
        }

        /* =================================================
           LIGHT SWEEP
        ================================================= */

        .why-sweep {
          position: absolute;

          top: 0;
          bottom: 0;

          left: -30%;

          width: 25%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.045),
              transparent
            );

          transform:
            skewX(-18deg);

          pointer-events: none;
        }

        /* =================================================
           NUMBER
        ================================================= */

        .why-number {
          position: absolute;

          top: 16px;
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

        .why-icon-wrap {
          position: relative;

          width: 50px;
          height: 50px;

          display: flex;

          align-items: center;
          justify-content: center;

          margin-bottom: 24px;
        }

        .why-icon {
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
              0.1
            );

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

          font-size: 19px;

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

        .why-icon-ring {
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
           TITLE
        ================================================= */

        .why-card-title {
          position: relative;

          z-index: 2;

          font-family:
            var(--font-display,
            system-ui,
            sans-serif);

          font-size: 17px;

          font-weight: 600;

          color:
            var(--white);

          line-height: 1.3;

          margin: 0 0 9px;

          will-change:
            transform,
            opacity,
            color;
        }

        /* =================================================
           TEXT
        ================================================= */

        .why-card-text {
          position: relative;

          z-index: 2;

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

        .why-arrow {
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

        .why-bottom-line {
          position: absolute;

          left: 24px;
          right: 24px;

          bottom: 12px;

          height: 1px;

          background:
            var(--line);

          overflow: hidden;
        }

        .why-bottom-line span {
          display: block;

          width: 30%;

          height: 100%;

          background:
            var(--red);

          box-shadow:
            0 0 10px
            var(--red);

          animation:
            whyLine 2.8s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes whyLine {

          from {
            transform:
              translateX(-20%);

            opacity: 0.25;
          }

          to {
            transform:
              translateX(260%);

            opacity: 1;
          }
        }

        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 1024px) {

          .why-grid {
            grid-template-columns:
              repeat(2, 1fr);

            gap: 14px;
          }
        }

        /* =================================================
           MOBILE
        ================================================= */

        @media (max-width: 640px) {

          .why-choose {
            padding: 65px 0;
          }

          .section-head {
            margin-bottom: 34px;
          }

          .why-grid {
            grid-template-columns: 1fr;

            gap: 12px;
          }

          .why-card {
            min-height: 225px;

            padding: 21px;

            border-radius: 15px;
          }

          .why-card-title {
            font-size: 16px;
          }

          .why-card-text {
            font-size: 12px;

            line-height: 1.6;

            padding-right: 10px;
          }
        }

        /* =================================================
           REDUCED MOTION
        ================================================= */

        @media (prefers-reduced-motion: reduce) {

          .why-bottom-line span {
            animation: none;
          }

          .why-card,
          .why-icon,
          .why-icon-ring {
            transition: none !important;
          }
        }

      `}</style>
    </section>
  )
}
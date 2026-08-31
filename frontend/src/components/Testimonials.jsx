import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    tag: 'Industry Alignment',
    quote:
      'The curriculum designed by Super 60 Community bridges the gap between academic learning and industry requirements perfectly. My students who engage with their programs consistently perform better in real-world applications.',
    name: 'Dr. Rajesh Sharma',
    role: 'Professor of Computer Science, IIT Delhi',
  },
  {
    tag: 'Skill Enhancement',
    quote:
      "I've witnessed a remarkable transformation in students who participate in Super 60 programs. Their confidence, technical skills, and problem-solving abilities show significant improvement.",
    name: 'Prof. Anita Desai',
    role: 'Head of IT Department, Delhi University',
  },
  {
    tag: 'Practical Approach',
    quote:
      "Super 60 Community's approach to practical learning complements our academic curriculum perfectly. Their industry connections provide our students with invaluable networking opportunities.",
    name: 'Dr. Vikram Mehta',
    role: 'Dean of Engineering, Chandigarh University',
  },
  {
    tag: 'Enhanced Placements',
    quote:
      'Companies actively seek out students who have trained with Super 60 Community. Their program significantly enhances our placement statistics and student career outcomes.',
    name: 'Prof. Sunita Patel',
    role: 'Director of Placements, Panjab University',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const pillRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const gridRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.t-card')
      const quoteMarks = gsap.utils.toArray('.t-quote-mark')
      const tags = gsap.utils.toArray('.t-tag')
      const stars = gsap.utils.toArray('.t-stars')
      const quotes = gsap.utils.toArray('.t-quote')
      const people = gsap.utils.toArray('.t-person')
      const sweeps = gsap.utils.toArray('.t-sweep')

      /*
      =====================================================
      INITIAL HEADER STATE
      =====================================================
      */

      gsap.set(pillRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.85,
      })

      gsap.set(headingRef.current, {
        opacity: 0,
        y: 45,
        clipPath: 'inset(0 0 100% 0)',
      })

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 20,
      })

      /*
      =====================================================
      INITIAL CARD STATE
      =====================================================
      */

      gsap.set(cards, {
        opacity: 0,
        y: 90,
        scale: 0.9,
        rotateX: 12,
        rotateY: 0,
        transformPerspective: 1400,
        transformOrigin: 'center bottom',
      })

      gsap.set(quoteMarks, {
        opacity: 0,
        scale: 0,
        rotate: -25,
      })

      gsap.set(tags, {
        opacity: 0,
        x: 20,
        scale: 0.85,
      })

      gsap.set(stars, {
        opacity: 0,
        y: 10,
      })

      gsap.set(quotes, {
        opacity: 0,
        y: 20,
      })

      gsap.set(people, {
        opacity: 0,
        y: 20,
      })

      gsap.set(sweeps, {
        xPercent: -120,
      })

      /*
      =====================================================
      HEADER SCROLL ANIMATION
      =====================================================
      */

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 88%',
          end: 'top 52%',
          scrub: 1.2,
        },
      })

      headerTimeline
        .to(pillRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.7)',
        })
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1,
            ease: 'power4.out',
          },
          '-=0.45'
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.5'
        )

      /*
      =====================================================
      CARD SCROLL ANIMATION
      =====================================================
      */

      cards.forEach((card, index) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 94%',
            end: 'top 55%',
            scrub: 1.15,
          },
        })

        timeline
          .to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.1,
            ease: 'power4.out',
          })
          .to(
            quoteMarks[index],
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.5,
              ease: 'back.out(1.8)',
            },
            '-=0.75'
          )
          .to(
            tags[index],
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.5,
              ease: 'back.out(1.5)',
            },
            '-=0.6'
          )
          .to(
            stars[index],
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: 'power3.out',
            },
            '-=0.4'
          )
          .to(
            quotes[index],
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power3.out',
            },
            '-=0.25'
          )
          .to(
            people[index],
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
      QUOTE MARK FLOAT
      =====================================================
      */

      quoteMarks.forEach((mark, index) => {
        gsap.to(mark, {
          y: -4,
          rotate: index % 2 === 0 ? 3 : -3,
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      /*
      =====================================================
      STAR ANIMATION
      =====================================================
      */

      stars.forEach((star, index) => {
        gsap.to(star, {
          letterSpacing: '2px',
          duration: 1.8 + index * 0.15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      /*
      =====================================================
      RED LIGHT SWEEP
      =====================================================
      */

      sweeps.forEach((sweep, index) => {
        gsap.to(sweep, {
          xPercent: 120,
          duration: 3.5,
          repeat: -1,
          delay: index * 1.1,
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
  }, [])

  /*
  =====================================================
  MAGNETIC CARD HOVER
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

    const rotateY = (x / rect.width) * 5
    const rotateX = -(y / rect.height) * 5

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.025,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  const handleMouseEnter = (event) => {
    const card = event.currentTarget

    const quoteMark =
      card.querySelector('.t-quote-mark')

    const tag =
      card.querySelector('.t-tag')

    const arrow =
      card.querySelector('.t-arrow')

    gsap.to(card, {
      borderColor: 'var(--red)',
      duration: 0.3,
    })

    gsap.to(quoteMark, {
      scale: 1.1,
      rotate: 5,
      duration: 0.35,
      ease: 'back.out(2)',
    })

    gsap.to(tag, {
      x: 4,
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

  const handleMouseLeave = (event) => {
    const card = event.currentTarget

    const quoteMark =
      card.querySelector('.t-quote-mark')

    const tag =
      card.querySelector('.t-tag')

    const arrow =
      card.querySelector('.t-arrow')

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      borderColor: 'var(--line)',
      duration: 0.6,
      ease: 'power3.out',
    })

    gsap.to(quoteMark, {
      scale: 1,
      rotate: 0,
      duration: 0.5,
      ease: 'power3.out',
    })

    gsap.to(tag, {
      x: 0,
      duration: 0.5,
      ease: 'power3.out',
    })

    gsap.to(arrow, {
      x: 0,
      opacity: 0.4,
      duration: 0.5,
      ease: 'power3.out',
    })
  }

  return (
    <section
      ref={sectionRef}
      className="testimonials"
    >
      <div className="container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          ref={headRef}
          className="t-head"
        >
          <span
            ref={pillRef}
            className="t-pill"
          >
            Testimonials
          </span>

          <h2 ref={headingRef}>
            Testimonials from{' '}
            <span className="red-text">
              Our Students
            </span>
          </h2>

          <p ref={descriptionRef}>
            Hear from our alumni who have successfully
            launched their careers through Super 60
            Community
          </p>
        </div>

        {/* =================================================
            CARDS
        ================================================= */}

        <div
          ref={gridRef}
          className="t-grid"
        >
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.name}
              className="t-card"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >

              {/* Animated red sweep */}

              <div className="t-sweep" />

              {/* Top */}

              <div className="t-top">

                <span className="t-quote-mark">
                  "
                </span>

                <span className="t-tag">
                  {t.tag}
                </span>

              </div>

              {/* Stars */}

              <div className="t-stars">
                ★★★★★
              </div>

              {/* Quote */}

              <p className="t-quote">
                "{t.quote}"
              </p>

              {/* Person */}

              <div className="t-person">

                <span className="t-avatar">
                  {t.name.charAt(0)}
                </span>

                <div>
                  <strong>
                    {t.name}
                  </strong>

                  <span>
                    {t.role}
                  </span>
                </div>

                <span className="t-arrow">
                  →
                </span>

              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`

        /* ================================================
           SECTION
        ================================================ */

        .testimonials {
          position: relative;
          overflow: hidden;
          padding: 90px 0;
        }

        /* ================================================
           HEADER
        ================================================ */

        .t-head {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 48px;
        }

        .t-pill {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          background: var(--white);
          color: var(--bg);

          font-family: var(--font-display);
          font-weight: 600;

          font-size: 10px;

          padding: 6px 14px;

          border-radius: 999px;

          margin-bottom: 14px;

          letter-spacing: 0.04em;
        }

        .t-head h2 {
          font-family: var(--font-display);

          font-weight: 700;

          font-size:
            clamp(26px, 4vw, 38px);

          line-height: 1.1;

          letter-spacing: -0.025em;

          margin: 0 0 12px;
        }

        .t-head p {
          color: var(--grey);

          font-size: 13px;

          line-height: 1.6;

          max-width: 520px;

          margin: 0 auto;
        }

        /* ================================================
           GRID
        ================================================ */

        .t-grid {
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

        .t-card {
          position: relative;

          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              var(--bg-panel),
              rgba(255,255,255,0.01)
            );

          border: 1px solid var(--line);

          border-radius: 16px;

          padding: 20px;

          display: flex;

          flex-direction: column;

          min-height: 310px;

          transform-style: preserve-3d;

          will-change:
            transform,
            opacity;

          transition:
            box-shadow 0.4s ease,
            background 0.4s ease;
        }

        .t-card:hover {
          box-shadow:
            0 25px 70px rgba(0,0,0,0.25);
        }

        /* ================================================
           LIGHT SWEEP
        ================================================ */

        .t-sweep {
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

          transform: skewX(-18deg);

          pointer-events: none;

          z-index: 0;
        }

        /* ================================================
           TOP
        ================================================ */

        .t-top {
          position: relative;

          z-index: 2;

          display: flex;

          justify-content: space-between;

          align-items: flex-start;

          margin-bottom: 12px;
        }

        /* ================================================
           QUOTE MARK
        ================================================ */

        .t-quote-mark {
          width: 28px;
          height: 28px;

          border-radius: 50%;

          border: 1px solid var(--line);

          display: flex;

          align-items: center;
          justify-content: center;

          color: var(--grey);

          font-family: Georgia, serif;

          font-size: 17px;

          will-change:
            transform,
            opacity;
        }

        /* ================================================
           TAG
        ================================================ */

        .t-tag {
          background: var(--red-soft);

          color: var(--red);

          font-size: 9px;

          font-weight: 700;

          padding: 4px 9px;

          border-radius: 999px;

          text-transform: uppercase;

          letter-spacing: 0.05em;

          will-change: transform;
        }

        /* ================================================
           STARS
        ================================================ */

        .t-stars {
          position: relative;

          z-index: 2;

          color: #f5b400;

          font-size: 11px;

          letter-spacing: 1px;

          margin-bottom: 12px;

          will-change:
            letter-spacing,
            opacity;
        }

        /* ================================================
           QUOTE
        ================================================ */

        .t-quote {
          position: relative;

          z-index: 2;

          font-size: 13px;

          line-height: 1.65;

          color: #d8d8da;

          flex: 1;

          margin: 0 0 18px;

          will-change:
            transform,
            opacity;
        }

        /* ================================================
           PERSON
        ================================================ */

        .t-person {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          gap: 10px;

          border-top:
            1px solid var(--line);

          padding-top: 14px;

          will-change:
            transform,
            opacity;
        }

        /* ================================================
           AVATAR
        ================================================ */

        .t-avatar {
          width: 34px;
          height: 34px;

          border-radius: 50%;

          background:
            linear-gradient(
              135deg,
              var(--bg-panel-2),
              var(--bg-panel)
            );

          border: 1px solid var(--line);

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          color: var(--red);

          font-size: 12px;

          font-weight: 700;
        }

        /* ================================================
           NAME
        ================================================ */

        .t-person strong {
          display: block;

          font-size: 12px;

          line-height: 1.3;

          margin-bottom: 2px;
        }

        .t-person div span {
          color: var(--grey-dim);

          font-size: 9px;

          line-height: 1.4;

          display: block;
        }

        /* ================================================
           ARROW
        ================================================ */

        .t-arrow {
          margin-left: auto;

          color: var(--red);

          font-size: 15px;

          opacity: 0.4;

          will-change: transform;
        }

        /* ================================================
           TABLET
        ================================================ */

        @media (max-width: 1100px) {

          .t-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .t-card {
            min-height: 280px;
          }
        }

        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 600px) {

          .testimonials {
            padding: 65px 0;
          }

          .t-head {
            margin-bottom: 34px;
          }

          .t-grid {
            grid-template-columns: 1fr;

            gap: 12px;
          }

          .t-card {
            min-height: 260px;

            padding: 18px;

            border-radius: 14px;
          }

          .t-head h2 {
            font-size: 28px;
          }

          .t-head p {
            font-size: 12px;
          }

          .t-quote {
            font-size: 12px;

            line-height: 1.6;
          }
        }

      `}</style>
    </section>
  )
}
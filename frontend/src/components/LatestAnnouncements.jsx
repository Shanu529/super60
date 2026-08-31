import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { getWithFallback } from '../lib/api.js'
import { announcements as fallback } from '../data/fallback.js'

gsap.registerPlugin(ScrollTrigger)

export default function LatestAnnouncements() {
  const [items, setItems] = useState(fallback)

  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    getWithFallback('/announcements?limit=3', fallback).then(setItems)
  }, [])

  useLayoutEffect(() => {
    if (!items.length) return

    const ctx = gsap.context(() => {
      const announcementItems =
        gsap.utils.toArray('.ann-item')

      const dates =
        gsap.utils.toArray('.ann-date')

      const tags =
        gsap.utils.toArray('.ann-tag')

      const titles =
        gsap.utils.toArray('.ann-title')

      const excerpts =
        gsap.utils.toArray('.ann-excerpt')

      const lines =
        gsap.utils.toArray('.ann-line')

      /*
      =====================================================
      INITIAL HEADER STATE
      =====================================================
      */

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 25,
      })

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 45,
        clipPath: 'inset(0 0 100% 0)',
      })

      /*
      =====================================================
      INITIAL ANNOUNCEMENT STATE
      =====================================================
      */

      gsap.set(announcementItems, {
        opacity: 0,
        y: 80,
        scale: 0.96,
        rotateX: 6,
        transformPerspective: 1200,
      })

      gsap.set(dates, {
        opacity: 0,
        x: -25,
      })

      gsap.set(tags, {
        opacity: 0,
        y: 10,
        scale: 0.85,
      })

      gsap.set(titles, {
        opacity: 0,
        y: 15,
      })

      gsap.set(excerpts, {
        opacity: 0,
        y: 10,
      })

      /*
      =====================================================
      HEADER SCROLL REVEAL
      =====================================================
      */

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
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
          '-=0.45'
        )

      /*
      =====================================================
      ANNOUNCEMENT REVEAL
      =====================================================
      */

      announcementItems.forEach((item, index) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 92%',
            end: 'top 60%',
            scrub: 1.1,
          },
        })

        timeline
          .to(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: 'power4.out',
          })
          .to(
            dates[index],
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power3.out',
            },
            '-=0.7'
          )
          .to(
            tags[index],
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'back.out(1.5)',
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
            excerpts[index],
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
      CONTINUOUS FLOATING
      =====================================================
      */

      announcementItems.forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -4 : 4,
          duration: 2.8 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.25,
        })
      })

      /*
      =====================================================
      CONTINUOUS ACCENT LINE
      =====================================================
      */

      lines.forEach((line, index) => {
        gsap.fromTo(
          line,
          {
            scaleX: 0,
            transformOrigin: 'left center',
          },
          {
            scaleX: 1,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3,
          }
        )
      })

      /*
      =====================================================
      SECTION PARALLAX
      =====================================================
      */

      gsap.to(listRef.current, {
        y: -18,
        ease: 'none',

        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })

      /*
      =====================================================
      REFRESH
      =====================================================
      */

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [items])

  /*
  =====================================================
  MAGNETIC HOVER
  =====================================================
  */

  const handleMouseMove = (event) => {
    const item = event.currentTarget
    const rect = item.getBoundingClientRect()

    const x =
      event.clientX -
      rect.left -
      rect.width / 2

    const y =
      event.clientY -
      rect.top -
      rect.height / 2

    gsap.to(item, {
      x: x * 0.025,
      y: y * 0.025,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  const handleMouseEnter = (event) => {
    const item = event.currentTarget

    const tag = item.querySelector('.ann-tag')
    const title = item.querySelector('.ann-title')
    const arrow = item.querySelector('.ann-arrow')

    gsap.to(item, {
      borderColor: 'var(--red)',
      duration: 0.35,
      ease: 'power2.out',
    })

    gsap.to(tag, {
      x: 5,
      scale: 1.04,
      duration: 0.35,
      ease: 'power3.out',
    })

    gsap.to(title, {
      x: 5,
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
    const item = event.currentTarget

    const tag = item.querySelector('.ann-tag')
    const title = item.querySelector('.ann-title')
    const arrow = item.querySelector('.ann-arrow')

    gsap.to(item, {
      x: 0,
      y: 0,
      borderColor: 'var(--line)',
      duration: 0.5,
      ease: 'power3.out',
    })

    gsap.to(tag, {
      x: 0,
      scale: 1,
      duration: 0.45,
      ease: 'power3.out',
    })

    gsap.to(title, {
      x: 0,
      duration: 0.45,
      ease: 'power3.out',
    })

    gsap.to(arrow, {
      x: 0,
      opacity: 0.5,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  return (
    <section
      ref={sectionRef}
      className="announcements"
    >
      <div className="container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          ref={headerRef}
          className="section-head"
        >
          <span
            ref={eyebrowRef}
            className="eyebrow"
          >
            Latest Announcements
          </span>

          <h2 ref={titleRef}>
            Stay in the loop
          </h2>
        </div>

        {/* =================================================
            ANNOUNCEMENT LIST
        ================================================= */}

        <div
          ref={listRef}
          className="ann-list"
        >
          {items.map((a, index) => (
            <div
              className="ann-item"
              key={a._id || index}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >

              {/* Animated accent */}

              <div className="ann-line" />

              {/* Number */}

              <div className="ann-number">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Date */}

              <div className="ann-date">
                {new Date(
                  a.date
                ).toLocaleDateString(
                  'en-IN',
                  {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }
                )}
              </div>

              {/* Body */}

              <div className="ann-body">

                <span className="ann-tag">
                  {a.tag}
                </span>

                <h3 className="ann-title">
                  {a.title}
                </h3>

                <p className="ann-excerpt">
                  {a.excerpt}
                </p>

              </div>

              {/* Arrow */}

              <div className="ann-arrow">
                →
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`

        /* ================================================
           SECTION
        ================================================ */

        .announcements {
          position: relative;
          overflow: hidden;
          padding: 90px 0;
        }

        /* ================================================
           LIST
        ================================================ */

        .ann-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          perspective: 1200px;
          will-change: transform;
        }

        /* ================================================
           ITEM
        ================================================ */

        .ann-item {
          position: relative;

          display: grid;
          grid-template-columns:
            42px
            105px
            1fr
            30px;

          align-items: center;

          gap: 20px;

          min-height: 115px;

          padding: 20px 24px;

          background: var(--bg-panel);

          border: 1px solid var(--line);

          border-radius: 16px;

          overflow: hidden;

          transform-style: preserve-3d;

          will-change:
            transform,
            opacity;

          transition:
            box-shadow 0.4s ease,
            background 0.4s ease;
        }

        .ann-item:hover {
          background:
            linear-gradient(
              105deg,
              var(--bg-panel),
              rgba(255,255,255,0.015)
            );

          box-shadow:
            0 18px 55px rgba(0,0,0,0.22);
        }

        /* ================================================
           ACCENT LINE
        ================================================ */

        .ann-line {
          position: absolute;

          left: 0;
          top: 0;
          bottom: 0;

          width: 2px;

          background: var(--red);

          transform-origin: top;

          opacity: 0.8;

          box-shadow:
            0 0 14px var(--red);
        }

        /* ================================================
           NUMBER
        ================================================ */

        .ann-number {
          font-family: monospace;

          font-size: 10px;

          color: var(--grey-dim);

          letter-spacing: 0.12em;

          opacity: 0.65;
        }

        /* ================================================
           DATE
        ================================================ */

        .ann-date {
          color: var(--grey-dim);

          font-size: 12px;

          font-weight: 600;

          line-height: 1.4;

          padding-right: 20px;

          border-right:
            1px solid var(--line);

          will-change:
            transform,
            opacity;
        }

        /* ================================================
           BODY
        ================================================ */

        .ann-body {
          min-width: 0;
        }

        /* ================================================
           TAG
        ================================================ */

        .ann-tag {
          display: inline-flex;

          align-items: center;

          font-size: 9px;

          font-weight: 700;

          color: var(--red);

          background: var(--red-soft);

          padding: 4px 9px;

          border-radius: 999px;

          margin-bottom: 7px;

          text-transform: uppercase;

          letter-spacing: 0.08em;

          will-change: transform;
        }

        /* ================================================
           TITLE
        ================================================ */

        .ann-title {
          font-family: var(--font-display);

          font-size: 17px;

          line-height: 1.3;

          margin: 0 0 5px;

          font-weight: 600;

          color: var(--white);

          will-change: transform;
        }

        /* ================================================
           EXCERPT
        ================================================ */

        .ann-excerpt {
          color: var(--grey);

          font-size: 13px;

          margin: 0;

          line-height: 1.6;

          max-width: 700px;

          will-change:
            transform,
            opacity;
        }

        /* ================================================
           ARROW
        ================================================ */

        .ann-arrow {
          font-size: 20px;

          color: var(--red);

          opacity: 0.5;

          will-change: transform;

          justify-self: end;
        }

        /* ================================================
           TABLET
        ================================================ */

        @media (max-width: 800px) {

          .announcements {
            padding: 75px 0;
          }

          .ann-item {
            grid-template-columns:
              35px
              90px
              1fr
              25px;

            gap: 15px;

            padding: 18px;
          }

          .ann-title {
            font-size: 16px;
          }

          .ann-excerpt {
            font-size: 12px;
          }
        }

        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 640px) {

          .announcements {
            padding: 65px 0;
          }

          .ann-list {
            gap: 10px;
          }

          .ann-item {
            grid-template-columns:
              1fr
              auto;

            gap: 5px;

            padding: 18px;

            min-height: 0;
          }

          .ann-number {
            position: absolute;

            top: 14px;
            right: 16px;
          }

          .ann-date {
            border-right: none;

            padding-right: 0;

            font-size: 11px;

            order: 1;
          }

          .ann-body {
            order: 2;
          }

          .ann-arrow {
            position: absolute;

            right: 16px;
            bottom: 17px;

            font-size: 17px;
          }

          .ann-tag {
            font-size: 8px;

            padding: 3px 8px;

            margin-bottom: 6px;
          }

          .ann-title {
            font-size: 15px;

            padding-right: 25px;
          }

          .ann-excerpt {
            font-size: 12px;

            line-height: 1.55;

            padding-right: 10px;
          }
        }

      `}</style>
    </section>
  )
}
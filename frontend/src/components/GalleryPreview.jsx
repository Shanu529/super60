import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import {
  getWithFallback,
  resolveImage,
  placeholderFor,
} from '../lib/api.js'

import { galleryPreview as fallback } from '../data/fallback.js'

gsap.registerPlugin(ScrollTrigger)

export default function GalleryPreview() {
  const [items, setItems] = useState(fallback)

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const buttonRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    getWithFallback('/gallery?limit=6', fallback).then(setItems)
  }, [])

  useLayoutEffect(() => {
    if (!items.length) return

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray('.gp-tile')
      const images = gsap.utils.toArray('.gp-tile-img')
      const overlays = gsap.utils.toArray('.gp-tile-overlay')

      /*
      =====================================================
      INITIAL STATES
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

      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 25,
      })

      gsap.set(tiles, {
        opacity: 0,
        y: 80,
        scale: 0.92,
        rotateX: 8,
        transformPerspective: 1200,
      })

      gsap.set(overlays, {
        opacity: 0.75,
      })

      /*
      =====================================================
      HEADER SCROLL ANIMATION
      =====================================================
      */

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 88%',
          end: 'top 50%',
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
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.55'
        )

      /*
      =====================================================
      TILE SCROLL REVEAL
      =====================================================
      */

      tiles.forEach((tile, index) => {
        gsap.to(tile, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: 'power4.out',

          scrollTrigger: {
            trigger: tile,
            start: 'top 94%',
            end: 'top 60%',
            scrub: 1.1,
          },

          delay: index * 0.05,
        })
      })

      /*
      =====================================================
      CONTINUOUS SCROLL PARALLAX
      =====================================================
      */

      images.forEach((image, index) => {
        const direction = index % 2 === 0 ? 1 : -1

        gsap.fromTo(
          image,
          {
            scale: 1.12,
            yPercent: -8 * direction,
          },
          {
            scale: 1.03,
            yPercent: 8 * direction,
            ease: 'none',

            scrollTrigger: {
              trigger: image,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        )
      })

      /*
      =====================================================
      GRID PARALLAX
      =====================================================
      */

      gsap.to(gridRef.current, {
        y: -25,
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
      CONTINUOUS FLOATING ANIMATION
      =====================================================
      */

      tiles.forEach((tile, index) => {
        gsap.to(tile, {
          y: index % 2 === 0 ? -5 : 5,
          duration: 2.5 + index * 0.15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.15,
        })
      })

      /*
      =====================================================
      IMAGE BREATHING ANIMATION
      =====================================================
      */

      images.forEach((image, index) => {
        gsap.to(image, {
          scale: 1.06,
          duration: 3 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        })
      })

      /*
      =====================================================
      OVERLAY ANIMATION
      =====================================================
      */

      overlays.forEach((overlay, index) => {
        gsap.fromTo(
          overlay,
          {
            background:
              'linear-gradient(180deg, transparent 30%, rgba(11,11,13,0.35) 100%)',
          },
          {
            background:
              'linear-gradient(180deg, transparent 25%, rgba(11,11,13,0.9) 100%)',
            duration: 1,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: overlay,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
            },
          }
        )
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
  HOVER ANIMATION
  =====================================================
  */

  const handleMouseEnter = (event) => {
    const tile = event.currentTarget
    const image = tile.querySelector('.gp-tile-img')
    const overlay = tile.querySelector('.gp-tile-overlay')
    const title = tile.querySelector('.gp-title')
    const category = tile.querySelector('.gp-category')

    gsap.killTweensOf([
      tile,
      image,
      overlay,
      title,
      category,
    ])

    gsap.to(tile, {
      y: -8,
      scale: 1.025,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: true,
    })

    gsap.to(image, {
      scale: 1.12,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: true,
    })

    gsap.to(overlay, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
    })

    gsap.to(title, {
      y: -4,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: true,
    })

    gsap.to(category, {
      x: 4,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  const handleMouseLeave = (event) => {
    const tile = event.currentTarget
    const image = tile.querySelector('.gp-tile-img')
    const overlay = tile.querySelector('.gp-tile-overlay')
    const title = tile.querySelector('.gp-title')
    const category = tile.querySelector('.gp-category')

    gsap.to(tile, {
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: true,
    })

    gsap.to(image, {
      scale: 1.04,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: true,
    })

    gsap.to(overlay, {
      opacity: 0.8,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    })

    gsap.to(title, {
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: true,
    })

    gsap.to(category, {
      x: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  return (
    <section
      ref={sectionRef}
      className="gallery-preview"
    >
      <div className="container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          ref={headingRef}
          className="section-head row-head"
        >
          <div>

            <span
              ref={eyebrowRef}
              className="eyebrow"
            >
              Gallery
            </span>

            <h2 ref={titleRef}>
              Moments from the community
            </h2>

          </div>

          <div ref={buttonRef}>
            <Link
              to="/gallery"
              className="btn btn-outline gallery-button"
            >
              View Gallery ↗
            </Link>
          </div>
        </div>

        {/* =================================================
            GALLERY GRID
        ================================================= */}

        <div
          ref={gridRef}
          className="gp-grid"
        >
          {items.map((g, index) => (
            <div
              key={g._id || index}
              className="gp-tile"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="gp-tile-img"
                src={resolveImage(
                  g.image,
                  'gallery'
                )}
                alt={g.title}
                onError={(e) => {
                  e.currentTarget.src =
                    placeholderFor('gallery')
                }}
              />

              <div className="gp-tile-overlay">
                <span className="gp-category">
                  {g.category}
                </span>

                <span className="gp-title">
                  {g.title}
                </span>
              </div>

              {/* Tile number */}

              <span className="gp-number">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ================================================
           GALLERY
        ================================================ */

        .gallery-preview {
          position: relative;
          overflow: hidden;
          padding: 90px 0;
        }

        /* ================================================
           GRID
        ================================================ */

        .gp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          perspective: 1200px;
          will-change: transform;
        }

        /* ================================================
           TILE
        ================================================ */

        .gp-tile {
          aspect-ratio: 4 / 3;
          border-radius: 16px;
          border: 1px solid var(--line);
          position: relative;
          overflow: hidden;
          background: var(--bg-panel);
          cursor: pointer;

          transform-style: preserve-3d;
          backface-visibility: hidden;

          will-change: transform, opacity;

          transition:
            border-color 0.4s ease,
            box-shadow 0.4s ease;
        }

        .gp-tile:hover {
          border-color: var(--red);

          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.25);
        }

        /* ================================================
           IMAGE
        ================================================ */

        .gp-tile-img {
          position: absolute;
          inset: -6%;
          width: 112%;
          height: 112%;
          object-fit: cover;

          will-change: transform;

          transform: translateZ(0);
        }

        /* ================================================
           OVERLAY
        ================================================ */

        .gp-tile-overlay {
          position: absolute;
          inset: 0;

          display: flex;
          flex-direction: column;
          justify-content: flex-end;

          padding: 18px;

          background:
            linear-gradient(
              180deg,
              transparent 25%,
              rgba(11, 11, 13, 0.85) 100%
            );

          pointer-events: none;

          will-change: opacity;
        }

        /* ================================================
           CATEGORY
        ================================================ */

        .gp-category {
          font-size: 10px;
          color: var(--red);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 5px;

          will-change: transform;
        }

        /* ================================================
           TITLE
        ================================================ */

        .gp-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 16px;
          line-height: 1.3;

          color: var(--white);

          will-change: transform;
        }

        /* ================================================
           NUMBER
        ================================================ */

        .gp-number {
          position: absolute;
          top: 12px;
          right: 14px;

          font-family: monospace;
          font-size: 10px;

          color: rgba(255, 255, 255, 0.55);

          letter-spacing: 0.08em;

          pointer-events: none;
        }

        /* ================================================
           BUTTON
        ================================================ */

        .gallery-button {
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .gallery-button:hover {
          transform: translateY(-2px);
        }

        /* ================================================
           TABLET
        ================================================ */

        @media (max-width: 900px) {
          .gallery-preview {
            padding: 75px 0;
          }

          .gp-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ================================================
           MOBILE
        ================================================ */

        @media (max-width: 720px) {
          .gallery-preview {
            padding: 65px 0;
          }

          .gp-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .gp-tile {
            border-radius: 12px;
          }

          .gp-tile-overlay {
            padding: 12px;
          }

          .gp-title {
            font-size: 13px;
          }

          .gp-category {
            font-size: 8px;
          }

          .gp-number {
            top: 9px;
            right: 10px;
            font-size: 8px;
          }
        }

        /* ================================================
           VERY SMALL MOBILE
        ================================================ */

        @media (max-width: 420px) {
          .gp-grid {
            gap: 8px;
          }

          .gp-title {
            font-size: 12px;
          }

          .gp-tile-overlay {
            padding: 10px;
          }
        }

        /* ================================================
           REDUCED MOTION
        ================================================ */

        @media (prefers-reduced-motion: reduce) {
          .gp-tile,
          .gp-tile-img,
          .gp-tile-overlay,
          .gp-title,
          .gp-category {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}
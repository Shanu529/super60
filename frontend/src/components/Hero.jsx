import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from './motion/TextReveal.jsx'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

gsap.registerPlugin(ScrollTrigger)

const TAGS = [
  'Corporate Culture',
  'Fullstack Developers',
  'Future Leaders',
  'Graphic Designers',
  'Philanthropists',
  'Tech Enthusiasts',
  'Visionaries',
  'Web Developers',
  'UI/UX Designers',
]

export default function Hero() {
  const heroRef = useRef(null)
  const glowRef = useRef(null)
  const badgeRef = useRef(null)
  const pillRef = useRef(null)
  const copyRef = useRef(null)
  const ctaRef = useRef(null)
  const tagsRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      // Entrance timeline — orchestrates everything except the headline
      // (that's handled by <TextReveal>, so the two libraries divide
      // the work: GSAP for the overall sequence + parallax, Framer
      // Motion for the word-level text reveal).
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(badgeRef.current, { opacity: 0, y: 16, duration: 0.6 })
        .from(pillRef.current, { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
        .from(copyRef.current, { opacity: 0, y: 18, duration: 0.6 }, '-=0.45')
        .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.55 }, '-=0.4')
        .from(
          tagsRef.current ? Array.from(tagsRef.current.children) : [],
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.04 },
          '-=0.35'
        )

      // Subtle scroll-linked parallax on the ambient background glow —
      // purely decorative, gated behind reduced-motion, cleaned up on unmount.
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          yPercent: 22,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-glow" ref={glowRef} aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-badge" ref={badgeRef}>
          <span>
            <span className="brand-red">The</span> Super 60 Community
          </span>
        </div>

        <a href="#events" className="pill-link" ref={pillRef}>
          View Our Vibrant Events <span aria-hidden>✨</span>
        </a>

        <h1 className="hero-title">
          <TextReveal text="A Community of Creators," as="span" className="hero-title-line" />
          <br />
          <span className="ribbon">
            <TextReveal text="Dreamers & Doers." as="span" delay={0.25} />
          </span>
        </h1>

        <p className="hero-copy" ref={copyRef}>
          Experience tech like never before with Super 60 Community – vibrant events,
          hands-on sessions, and pure innovation.
        </p>

        <a href="#join" className="btn btn-primary" ref={ctaRef}>
          Join Us <span className="btn-icon">↗</span>
        </a>

        <div className="hero-tags" ref={tagsRef}>
          {TAGS.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <style>{`
        .hero {
          padding-top: 72px;
          padding-bottom: 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          width: 900px;
          height: 500px;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(240, 112, 20, 0.22), transparent 65%);
          pointer-events: none;
          z-index: 0;
        }
        .hero-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .hero-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 28px;
        }
        .hero-badge-mark {
          width: 30px;
          height: 34px;
          background: var(--red);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
        }
        .pill-link {
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 8px 18px;
          font-size: 13px;
          margin-bottom: 28px;
          transition: border-color 0.25s ease, transform 0.25s ease, color 0.25s ease;
          display: inline-block;
        }
        .pill-link:hover {
          border-color: var(--red);
          color: var(--red);
          transform: translateY(-2px);
        }
        .hero-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(34px, 6vw, 64px);
          line-height: 1.15;
          margin: 0 0 24px;
          max-width: 880px;
        }
        .ribbon {
          position: relative;
          display: inline-block;
          color: var(--white);
          padding: 4px 16px;
        }
        .ribbon::before {
          content: '';
          position: absolute;
          inset: 6% -10px;
          background: var(--red);
          z-index: -1;
          transform: rotate(-1.3deg);
          border-radius: 4px 18px 4px 18px;
        }
        .hero-copy {
          max-width: 640px;
          color: var(--grey);
          font-size: 16px;
          line-height: 1.7;
          margin: 0 0 32px;
        }
        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 28px;
          margin-top: 56px;
          color: var(--grey-dim);
          font-size: 14px;
        }
        @media (max-width: 720px) {
          .hero-tags {
            gap: 16px;
            font-size: 12px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-glow { display: none; }
        }
      `}</style>
    </section>
  )
}

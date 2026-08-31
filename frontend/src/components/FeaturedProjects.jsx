import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getWithFallback, resolveImage, placeholderFor } from '../lib/api.js'
import { projects as fallback } from '../data/fallback.js'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const [items, setItems] = useState(fallback)
  const sectionRef = useRef(null)

  useEffect(() => {
    getWithFallback('/projects?featured=true', fallback).then((data) => setItems(data.slice(0, 3)))
  }, [])

  useEffect(() => {
    // gsap.context scopes the animations safely to this component
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', // Triggers when the section reaches 80% down the viewport
        }
      });

      // 1. Reveal the section header and button
      tl.from('.row-head > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
      
      // 2. Staggered reveal for the project cards
      .from('.fp-item', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'expo.out',
        clearProps: 'all' // CRITICAL: Removes GSAP inline styles after completion so your CSS :hover works!
      }, "-=0.4")
      
      // 3. Subtle image scale-down effect for a premium cinematic feel
      .from('.fp-cover-img', {
        scale: 1.05,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all'
      }, "-=1.2");

    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, [items]); // Re-run animation when fetched items are ready

  return (
    <section ref={sectionRef} className="featured-projects">
      <div className="container">
        <div className="section-head row-head">
          <div>
            <span className="eyebrow">Featured Projects</span>
            <h2>Things we've actually shipped</h2>
          </div>
          <Link to="/projects" className="btn btn-outline">View All Projects ↗</Link>
        </div>

        <div className="fp-grid">
          {items.map((p) => (
            /* Replaced RevealItem with a standard div wrapper */
            <div className="fp-item" key={p._id}>
              <Link to={`/projects/${p.slug}`} className="fp-card">
                <img
                  className="fp-cover-img"
                  src={resolveImage(p.image, 'project')}
                  alt={p.title}
                  onError={(e) => { e.currentTarget.src = placeholderFor('project') }}
                />
                <div className="fp-top">
                  <span className="fp-category">{p.category}</span>
                  <span className={`fp-status fp-status-${p.status?.toLowerCase().replace(' ', '-')}`}>{p.status}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <div className="fp-tech">
                  {p.technologies?.slice(0, 3).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className="fp-link">View Details ↗</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Keeping your exact CSS intact */
        .featured-projects {
          padding: 80px 0; /* Added standard padding just in case your wrapper had it */
        }
        .row-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          text-align: left;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 48px; /* Added margin bottom based on typical section-head spacing */
        }
        .eyebrow {
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--red, #e5231b);
          font-size: 13px;
          display: block;
          margin-bottom: 12px;
        }
        .row-head h2 {
          font-family: var(--font-display, system-ui, sans-serif);
          font-size: clamp(28px, 3.5vw, 36px);
          font-weight: 600;
          margin: 0;
        }
        .btn-outline {
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 10px 20px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.3s ease, color 0.3s ease;
        }
        .btn-outline:hover { border-color: var(--red); color: var(--red); }
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .fp-item {
          display: flex;
          flex-direction: column;
        }
        .fp-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 24px;
          text-decoration: none;
          color: inherit;
          height: 100%;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .fp-card:hover {
          transform: translateY(-6px);
          border-color: var(--red);
        }
        .fp-cover-img {
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 16px;
          border: 1px solid var(--line);
        }
        .fp-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .fp-category { font-size: 12px; color: var(--grey); }
        .fp-status {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          background: var(--red-soft);
          color: var(--red);
        }
        .fp-card h3 {
          font-family: var(--font-display);
          font-size: 18px;
          margin: 0 0 8px;
        }
        .fp-card p {
          color: var(--grey);
          font-size: 14px;
          line-height: 1.6;
          margin: 0 0 16px;
          flex-grow: 1;
        }
        .fp-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }
        .fp-tech span {
          font-size: 11px;
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 4px 10px;
          color: var(--grey);
        }
        .fp-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--red);
        }
        @media (max-width: 860px) {
          .fp-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
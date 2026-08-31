import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/motion/Reveal.jsx'
import { getWithFallback, resolveImage, placeholderFor } from '../lib/api.js'
import { projects as fallback } from '../data/fallback.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(() => fallback.find((p) => p.slug === slug) || fallback[0])

  useEffect(() => {
    let cancelled = false
    getWithFallback(`/projects/${slug}`, fallback.find((p) => p.slug === slug) || fallback[0]).then((data) => {
      if (!cancelled) setProject(data)
    })
    return () => { cancelled = true }
  }, [slug])

  if (!project) return null

  return (
    <div className="page-enter project-detail">
      <Reveal as="section" className="pd-hero">
        <div className="container">
          <Link to="/projects" className="pd-back">← Back to Projects</Link>
          <img
            className="pd-cover-img"
            src={resolveImage(project.image, 'project')}
            alt={project.title}
            onError={(e) => { e.currentTarget.src = placeholderFor('project') }}
          />
          <div className="pd-top">
            <span className="fp-category">{project.category}</span>
            <span className={`fp-status fp-status-${project.status?.toLowerCase().replace(' ', '-')}`}>{project.status}</span>
          </div>
          <h1>{project.title}</h1>
          <p className="pd-summary">{project.summary}</p>
          <div className="fp-tech">
            {project.technologies?.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </Reveal>

      <section className="pd-body">
        <div className="container pd-grid">
          <div className="pd-main">
            <div className="pd-block">
              <h2>Objectives</h2>
              <ul>
                {project.objectives?.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </div>
            <div className="pd-block">
              <h2>Features</h2>
              <ul>
                {project.features?.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
            <div className="pd-block">
              <h2>Gallery</h2>
              <div className="pd-gallery">
                {[1, 2, 3].map((n) => (
                  <img
                    key={n}
                    className="pd-gallery-tile"
                    src={resolveImage(project.image, 'project')}
                    alt={`${project.title} screenshot ${n}`}
                    onError={(e) => { e.currentTarget.src = placeholderFor('project') }}
                  />
                ))}
              </div>
            </div>
          </div>

          <aside className="pd-side">
            <div className="pd-side-card">
              <h3>Timeline</h3>
              <div className="pd-timeline">
                {project.timeline?.map((t, i) => (
                  <div className="pd-timeline-item" key={t.phase}>
                    <span className="pd-timeline-dot" />
                    <div>
                      <strong>{t.phase}</strong>
                      <span>{t.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pd-side-card">
              <h3>Team</h3>
              <ul className="pd-team">
                {project.team?.map((member) => <li key={member}>{member}</li>)}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .pd-hero { padding-top: 56px; padding-bottom: 24px; }
        .pd-back { color: var(--grey); font-size: 13px; display: inline-block; margin-bottom: 24px; }
        .pd-back:hover { color: var(--red); }
        .pd-cover-img {
          width: 100%;
          max-height: 380px;
          object-fit: cover;
          border-radius: 18px;
          border: 1px solid var(--line);
          margin-bottom: 24px;
        }
        .pd-top { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
        .pd-hero h1 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(28px, 5vw, 46px);
          margin: 0 0 14px;
        }
        .pd-summary { color: var(--grey); max-width: 640px; line-height: 1.7; margin: 0 0 20px; }
        .pd-body { padding-top: 0; }
        .pd-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .pd-block { margin-bottom: 40px; }
        .pd-block h2 {
          font-family: var(--font-display);
          font-size: 20px;
          margin: 0 0 16px;
        }
        .pd-block ul {
          margin: 0;
          padding-left: 20px;
          color: var(--grey);
          line-height: 1.9;
        }
        .pd-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .pd-gallery-tile {
          aspect-ratio: 4/3;
          object-fit: cover;
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 12px;
        }
        .pd-side-card {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
        }
        .pd-side-card h3 {
          font-family: var(--font-display);
          font-size: 15px;
          margin: 0 0 18px;
        }
        .pd-timeline {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .pd-timeline-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .pd-timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--red);
          margin-top: 5px;
          flex-shrink: 0;
        }
        .pd-timeline-item div { display: flex; flex-direction: column; }
        .pd-timeline-item strong { font-size: 14px; }
        .pd-timeline-item span { font-size: 12px; color: var(--grey-dim); }
        .pd-team {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          color: var(--grey);
          font-size: 14px;
        }
        @media (max-width: 900px) {
          .pd-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

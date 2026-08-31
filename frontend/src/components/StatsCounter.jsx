import { useEffect, useState } from 'react'
import Reveal from './motion/Reveal.jsx'
import useCountUp from '../hooks/useCountUp.js'
import { getWithFallback } from '../lib/api.js'
import { stats as fallback } from '../data/fallback.js'

function StatItem({ icon, value, label }) {
  const [ref, display] = useCountUp(value)
  return (
    <div className="counter-card" ref={ref}>
      <div className="counter-icon">{icon}</div>
      <div className="counter-value">{display}</div>
      <div className="counter-label">{label}</div>
    </div>
  )
}

export default function StatsCounter() {
  const [items, setItems] = useState(fallback)

  useEffect(() => {
    getWithFallback('/homepage/stats', fallback).then(setItems)
  }, [])

  return (
    <Reveal as="section" className="stats-counter">
      <div className="container counter-grid">
        {items.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>

      <style>{`
        .stats-counter {
          background: var(--bg-panel);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .counter-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          text-align: center;
        }
        .counter-card { padding: 12px; }
        .counter-icon { font-size: 22px; margin-bottom: 10px; }
        .counter-value {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 34px;
          color: var(--red);
        }
        .counter-label {
          color: var(--grey);
          font-size: 13px;
          margin-top: 6px;
        }
        @media (max-width: 720px) {
          .counter-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </Reveal>
  )
}

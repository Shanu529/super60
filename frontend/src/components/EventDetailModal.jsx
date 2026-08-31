import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEventModal } from '../context/EventModalContext.jsx'
import { resolveImage, placeholderFor } from '../lib/api.js'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

const EASE = [0.22, 1, 0.36, 1]

export default function EventDetailModal() {
  const { activeEvent, closeEvent } = useEventModal()
  const reduced = usePrefersReducedMotion()
  const closeBtnRef = useRef(null)

  // Lock body scroll while the modal is open, and close on Escape.
  useEffect(() => {
    if (!activeEvent) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeEvent()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeEvent, closeEvent])

  const formattedDate = activeEvent
    ? new Date(activeEvent.date).toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      })
    : ''

  return (
    <AnimatePresence>
      {activeEvent && (
        <motion.div
          className="event-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
          onClick={closeEvent}
          role="presentation"
        >
          <motion.div
            className="event-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
            layoutId={reduced ? undefined : `event-card-${activeEvent._id}`}
            onClick={(e) => e.stopPropagation()}
            initial={reduced ? { opacity: 0 } : undefined}
            animate={reduced ? { opacity: 1 } : undefined}
            exit={reduced ? { opacity: 0 } : undefined}
            transition={{ duration: reduced ? 0.15 : 0.5, ease: EASE }}
          >
            <button type="button" ref={closeBtnRef} className="event-modal-close" onClick={closeEvent} aria-label="Close event details">
              ✕
            </button>

            <motion.div
              className="event-modal-media"
              layoutId={reduced ? undefined : `event-image-${activeEvent._id}`}
            >
              <img
                src={resolveImage(activeEvent.image, 'event')}
                alt={activeEvent.title}
                onError={(e) => { e.currentTarget.src = placeholderFor('event') }}
              />
              {activeEvent.category && <span className="event-modal-tag">{activeEvent.category}</span>}
            </motion.div>

            <motion.div
              className="event-modal-body"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.15, duration: reduced ? 0.15 : 0.5, ease: EASE }}
            >
              <h2 id="event-modal-title">{activeEvent.title}</h2>

              <div className="event-modal-meta">
                <div className="event-modal-meta-item">
                  <span className="event-modal-meta-label">Date</span>
                  <span>{formattedDate}</span>
                </div>
                {activeEvent.time && (
                  <div className="event-modal-meta-item">
                    <span className="event-modal-meta-label">Time</span>
                    <span>{activeEvent.time}</span>
                  </div>
                )}
                {activeEvent.location && (
                  <div className="event-modal-meta-item">
                    <span className="event-modal-meta-label">Location</span>
                    <span>{activeEvent.location}</span>
                  </div>
                )}
                {activeEvent.organizer && (
                  <div className="event-modal-meta-item">
                    <span className="event-modal-meta-label">Organized By</span>
                    <span>{activeEvent.organizer}</span>
                  </div>
                )}
              </div>

              {activeEvent.description && (
                <div className="event-modal-description">
                  <span className="event-modal-meta-label">About This Event</span>
                  <p>{activeEvent.description}</p>
                </div>
              )}

              <div className="event-modal-actions">
                <a href="#" className="btn btn-primary" onClick={(e) => e.preventDefault()}>
                  Register Interest <span className="btn-icon">↗</span>
                </a>
                <button type="button" className="btn btn-outline" onClick={closeEvent}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        .event-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 8, 10, 0.72);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 200;
        }
        .event-modal {
          position: relative;
          width: 100%;
          max-width: 640px;
          max-height: 88vh;
          overflow-y: auto;
          background: var(--bg-panel-2);
          border: 1px solid var(--line);
          border-radius: 22px;
          box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.6);
        }
        .event-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(11, 11, 13, 0.6);
          border: 1px solid var(--line);
          color: var(--white);
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .event-modal-close:hover {
          border-color: var(--red);
          transform: rotate(90deg);
        }
        .event-modal-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 8;
          overflow: hidden;
          border-radius: 22px 22px 0 0;
        }
        .event-modal-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .event-modal-tag {
          position: absolute;
          bottom: 14px;
          left: 20px;
          background: var(--red);
          color: var(--white);
          font-size: 12px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 999px;
          font-family: var(--font-display);
        }
        .event-modal-body {
          padding: 28px 32px 32px;
        }
        .event-modal-body h2 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(22px, 3.4vw, 30px);
          margin: 0 0 20px;
          line-height: 1.25;
        }
        .event-modal-meta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px 24px;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 18px 0;
          margin-bottom: 22px;
        }
        .event-modal-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .event-modal-meta-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--grey-dim);
        }
        .event-modal-meta-item span:last-child {
          font-size: 14px;
          color: var(--white);
        }
        .event-modal-description p {
          color: var(--grey);
          line-height: 1.75;
          margin: 8px 0 0;
        }
        .event-modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
          flex-wrap: wrap;
        }
        @media (max-width: 560px) {
          .event-modal-body { padding: 22px 20px 26px; }
          .event-modal-meta { grid-template-columns: 1fr; }
        }
      `}</style>
    </AnimatePresence>
  )
}

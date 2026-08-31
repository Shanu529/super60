import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'
import {
  visionMission as visionFallback,
  whyChooseUs as whyFallback,
  highlights as highlightsFallback,
  stats as statsFallback,
  contactInfo as contactFallback,
} from '../data/fallback.js'

function ArrayEditor({ label, rows, setRows, itemFields, makeEmpty }) {
  const update = (i, key, value) => {
    const copy = [...rows]
    copy[i] = { ...copy[i], [key]: value }
    setRows(copy)
  }
  const remove = (i) => setRows(rows.filter((_, idx) => idx !== i))
  const add = () => setRows([...rows, makeEmpty()])

  return (
    <div className="hm-array">
      <div className="hm-array-head">
        <span>{label}</span>
        <button type="button" onClick={add}>+ Add</button>
      </div>
      {rows.map((row, i) => (
        <div className="hm-array-row" key={i}>
          {itemFields.map((f) => (
            <input
              key={f}
              placeholder={f}
              value={row[f] || ''}
              onChange={(e) => update(i, f, e.target.value)}
            />
          ))}
          <button type="button" className="hm-remove" onClick={() => remove(i)}>✕</button>
        </div>
      ))}
    </div>
  )
}

export default function HomepageManager() {
  const [vision, setVision] = useState(visionFallback.vision)
  const [mission, setMission] = useState(visionFallback.mission.join('\n'))
  const [why, setWhy] = useState(whyFallback)
  const [highlights, setHighlights] = useState(highlightsFallback)
  const [stats, setStats] = useState(statsFallback)
  const [contact, setContact] = useState(contactFallback)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/homepage', { auth: true }).then((res) => {
      const d = res.data
      if (!d) return
      if (d.vision) setVision(d.vision)
      if (d.mission) setMission(d.mission.join('\n'))
      if (d.whyChooseUs) setWhy(d.whyChooseUs)
      if (d.highlights) setHighlights(d.highlights)
      if (d.stats) setStats(d.stats)
      if (d.contact) setContact(d.contact)
    }).catch(() => {})
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setStatus('')
    try {
      await api.put('/homepage', {
        vision,
        mission: mission.split('\n').map((s) => s.trim()).filter(Boolean),
        whyChooseUs: why,
        highlights,
        stats,
        contact,
      }, { auth: true })
      setStatus('Homepage content saved.')
    } catch (err) {
      setError(err.message || 'Could not save. Is the backend running?')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="homepage-manager">
      <h1>Homepage Content</h1>
      {error && <div className="admin-error">{error}</div>}
      {status && <div className="admin-status">{status}</div>}

      <form onSubmit={handleSave} className="hm-form">
        <section>
          <h3>Vision & Mission</h3>
          <label className="rm-field">
            Vision
            <textarea rows={3} value={vision} onChange={(e) => setVision(e.target.value)} />
          </label>
          <label className="rm-field">
            Mission (one point per line)
            <textarea rows={4} value={mission} onChange={(e) => setMission(e.target.value)} />
          </label>
        </section>

        <section>
          <h3>Why Choose Us</h3>
          <ArrayEditor
            label="Cards (icon, title, text)"
            rows={why}
            setRows={setWhy}
            itemFields={['icon', 'title', 'text']}
            makeEmpty={() => ({ icon: '✨', title: '', text: '' })}
          />
        </section>

        <section>
          <h3>Highlights</h3>
          <ArrayEditor
            label="Cards (icon, title, text)"
            rows={highlights}
            setRows={setHighlights}
            itemFields={['icon', 'title', 'text']}
            makeEmpty={() => ({ icon: '✨', title: '', text: '' })}
          />
        </section>

        <section>
          <h3>Statistics</h3>
          <ArrayEditor
            label="Counters (icon, value, label)"
            rows={stats}
            setRows={setStats}
            itemFields={['icon', 'value', 'label']}
            makeEmpty={() => ({ icon: '📊', value: '', label: '' })}
          />
        </section>

        <section>
          <h3>Contact Info</h3>
          <label className="rm-field">Email
            <input value={contact.email || ''} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
          </label>
          <label className="rm-field">Phone
            <input value={contact.phone || ''} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          </label>
          <label className="rm-field">Address
            <input value={contact.address || ''} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
          </label>
        </section>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save Homepage Content'} <span className="btn-icon">↗</span>
        </button>
      </form>

      <style>{`
        .homepage-manager h1 { font-family: var(--font-display); font-size: 24px; margin: 0 0 20px; }
        .hm-form { display: flex; flex-direction: column; gap: 28px; max-width: 640px; }
        .hm-form section {
          background: var(--bg-panel); border: 1px solid var(--line); border-radius: 16px; padding: 24px;
          display: flex; flex-direction: column; gap: 14px;
        }
        .hm-form h3 { font-family: var(--font-display); font-size: 15px; margin: 0; }
        .hm-array-head { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--grey-dim); }
        .hm-array-head button {
          background: transparent; border: 1px solid var(--line); border-radius: 8px; padding: 4px 10px;
          color: var(--red); font-size: 12px; cursor: pointer;
        }
        .hm-array-row { display: grid; grid-template-columns: 50px 1fr 2fr 28px; gap: 8px; margin-top: 8px; }
        .hm-array-row input {
          background: var(--bg); border: 1px solid var(--line); border-radius: 8px; padding: 8px 10px;
          color: var(--white); font-size: 13px;
        }
        .hm-remove { background: transparent; border: none; color: var(--grey-dim); cursor: pointer; font-size: 14px; }
        .hm-remove:hover { color: #ff5a5a; }
      `}</style>
    </div>
  )
}

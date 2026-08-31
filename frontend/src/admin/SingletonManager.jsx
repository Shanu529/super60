import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

function toFormState(fields, item) {
  const state = {}
  fields.forEach((f) => {
    const v = item?.[f.name]
    state[f.name] = f.type === 'tags' ? (Array.isArray(v) ? v.join(', ') : v || '') : v ?? ''
  })
  return state
}

function toPayload(fields, formState) {
  const payload = {}
  fields.forEach((f) => {
    if (f.type === 'tags') {
      payload[f.name] = formState[f.name]
        ? formState[f.name].split(',').map((s) => s.trim()).filter(Boolean)
        : []
    } else if (f.type !== 'file') {
      payload[f.name] = formState[f.name]
    }
  })
  return payload
}

export default function SingletonManager({ config }) {
  const { title, endpoint, fields } = config
  const [formState, setFormState] = useState(toFormState(fields, {}))
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api
      .get(endpoint, { auth: true })
      .then((res) => setFormState(toFormState(fields, res.data || {})))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [endpoint])

  const handleChange = (name, value) => setFormState((s) => ({ ...s, [name]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setStatus('')
    try {
      let payload = toPayload(fields, formState)
      if (imageFile) {
        const fd = new FormData()
        fd.append('image', imageFile)
        const uploadRes = await api.post('/upload', fd, { auth: true, isForm: true })
        payload.image = uploadRes.url
      }
      await api.put(endpoint, payload, { auth: true })
      setStatus('Saved successfully.')
    } catch (err) {
      setError(err.message || 'Could not save. Is the backend running?')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="skeleton" style={{ height: 300, maxWidth: 640 }} />

  return (
    <div className="singleton-manager">
      <h1>{title}</h1>
      {error && <div className="admin-error">{error}</div>}
      {status && <div className="admin-status">{status}</div>}
      <form onSubmit={handleSubmit} className="rm-modal singleton-form">
        {fields.map((f) => (
          <label key={f.name} className="rm-field">
            {f.label}
            {f.type === 'textarea' ? (
              <textarea rows={4} value={formState[f.name] || ''} onChange={(e) => handleChange(f.name, e.target.value)} />
            ) : f.type === 'file' ? (
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
            ) : (
              <input type="text" value={formState[f.name] || ''} onChange={(e) => handleChange(f.name, e.target.value)} />
            )}
          </label>
        ))}
        <div className="rm-modal-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'} <span className="btn-icon">↗</span>
          </button>
        </div>
      </form>

      <style>{`
        .singleton-manager h1 { font-family: var(--font-display); font-size: 24px; margin: 0 0 20px; }
        .singleton-form { max-width: 560px; padding: 28px; background: var(--bg-panel); border: 1px solid var(--line); border-radius: 16px; }
        .admin-status {
          background: rgba(52, 199, 89, 0.12);
          color: #34c759;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

const emptyFromFields = (fields) =>
  fields.reduce((acc, f) => {
    acc[f.name] = f.type === 'checkbox' ? false : f.type === 'tags' ? '' : ''
    return acc
  }, {})

function toFormState(fields, item) {
  const state = {}
  fields.forEach((f) => {
    const v = item[f.name]
    state[f.name] = f.type === 'tags' ? (Array.isArray(v) ? v.join(', ') : v || '') : v ?? (f.type === 'checkbox' ? false : '')
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
    } else if (f.type === 'file') {
      // handled separately via upload
    } else {
      payload[f.name] = formState[f.name]
    }
  })
  return payload
}

export default function ResourceManager({ config }) {
  const { title, endpoint, columns, fields } = config
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // null | 'new' | item
  const [formState, setFormState] = useState(emptyFromFields(fields))
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    api
      .get(endpoint, { auth: true })
      .then((res) => setItems(res.data || res.items || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [endpoint])

  const openNew = () => {
    setEditing('new')
    setFormState(emptyFromFields(fields))
    setImageFile(null)
  }

  const openEdit = (item) => {
    setEditing(item)
    setFormState(toFormState(fields, item))
    setImageFile(null)
  }

  const closeForm = () => setEditing(null)

  const handleChange = (name, value) => setFormState((s) => ({ ...s, [name]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      let payload = toPayload(fields, formState)

      if (imageFile) {
        const fd = new FormData()
        fd.append('image', imageFile)
        const uploadRes = await api.post('/upload', fd, { auth: true, isForm: true })
        payload.image = uploadRes.url
      }

      if (editing === 'new') {
        await api.post(endpoint, payload, { auth: true })
      } else {
        await api.put(`${endpoint}/${editing._id}`, payload, { auth: true })
      }
      closeForm()
      load()
    } catch (err) {
      setError(err.message || 'Something went wrong. Is the backend running?')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item[columns[0].key]}"? This cannot be undone.`)) return
    try {
      await api.del(`${endpoint}/${item._id}`, { auth: true })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="resource-manager">
      <div className="rm-header">
        <h1>{title}</h1>
        <button type="button" className="btn btn-primary" onClick={openNew}>
          Add New <span className="btn-icon">＋</span>
        </button>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <div className="rm-table-wrap">
        {loading ? (
          <div className="skeleton" style={{ height: 160 }} />
        ) : items.length === 0 ? (
          <p className="rm-empty">Nothing here yet — the backend isn't connected or this list is empty. Add the first item, or run the seed script.</p>
        ) : (
          <table className="rm-table">
            <thead>
              <tr>
                {columns.map((c) => <th key={c.key}>{c.label}</th>)}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  {columns.map((c) => <td key={c.key}>{item[c.key]}</td>)}
                  <td className="rm-actions">
                    <button type="button" onClick={() => openEdit(item)}>Edit</button>
                    <button type="button" className="rm-delete" onClick={() => handleDelete(item)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <div className="rm-modal-backdrop" onClick={closeForm}>
          <form className="rm-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <h2>{editing === 'new' ? 'Add New' : 'Edit'} — {title}</h2>
            {fields.map((f) => (
              <label key={f.name} className="rm-field">
                {f.label}
                {f.type === 'textarea' ? (
                  <textarea rows={4} value={formState[f.name] || ''} onChange={(e) => handleChange(f.name, e.target.value)} />
                ) : f.type === 'select' ? (
                  <select value={formState[f.name] || ''} onChange={(e) => handleChange(f.name, e.target.value)}>
                    <option value="" disabled>Select…</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === 'checkbox' ? (
                  <input type="checkbox" checked={Boolean(formState[f.name])} onChange={(e) => handleChange(f.name, e.target.checked)} />
                ) : f.type === 'file' ? (
                  <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                ) : f.type === 'date' ? (
                  <input type="date" value={formState[f.name] ? String(formState[f.name]).slice(0, 10) : ''} onChange={(e) => handleChange(f.name, e.target.value)} />
                ) : (
                  <input type="text" value={formState[f.name] || ''} onChange={(e) => handleChange(f.name, e.target.value)} />
                )}
              </label>
            ))}
            <div className="rm-modal-actions">
              <button type="button" onClick={closeForm}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save'} <span className="btn-icon">↗</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <style>{`
        .resource-manager { max-width: 960px; }
        .rm-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
        .rm-header h1 { font-family: var(--font-display); font-size: 24px; margin: 0; }
        .rm-empty { color: var(--grey); }
        .rm-table-wrap {
          background: var(--bg-panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          overflow: hidden;
        }
        .rm-table { width: 100%; border-collapse: collapse; }
        .rm-table th, .rm-table td {
          text-align: left;
          padding: 14px 18px;
          font-size: 14px;
          border-bottom: 1px solid var(--line);
        }
        .rm-table th { color: var(--grey-dim); font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
        .rm-table tr:last-child td { border-bottom: none; }
        .rm-actions { display: flex; gap: 10px; justify-content: flex-end; }
        .rm-actions button { background: transparent; border: 1px solid var(--line); border-radius: 8px; padding: 6px 12px; color: var(--white); font-size: 12px; cursor: pointer; }
        .rm-actions button:hover { border-color: var(--red); color: var(--red); }
        .rm-actions .rm-delete:hover { border-color: #ff5a5a; color: #ff5a5a; }
        .rm-modal-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center; padding: 24px; z-index: 100;
        }
        .rm-modal {
          background: var(--bg-panel-2);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 28px;
          width: 100%;
          max-width: 520px;
          max-height: 86vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .rm-modal h2 { font-family: var(--font-display); font-size: 18px; margin: 0 0 6px; }
        .rm-field { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--grey); }
        .rm-field input[type="text"], .rm-field input[type="date"], .rm-field select, .rm-field textarea {
          background: var(--bg); border: 1px solid var(--line); border-radius: 10px;
          padding: 10px 12px; color: var(--white); font-family: var(--font-body); font-size: 14px;
        }
        .rm-field input[type="checkbox"] { width: 18px; height: 18px; }
        .rm-modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }
        .rm-modal-actions button[type="button"] {
          background: transparent; border: 1px solid var(--line); border-radius: 999px;
          padding: 8px 18px; color: var(--grey); cursor: pointer;
        }
      `}</style>
    </div>
  )
}

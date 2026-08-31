// Central API client for the Super 60 Community site.
// The whole frontend is designed to work with ZERO backend running:
// every page tries the live API first and silently falls back to the
// bundled static content (see src/data/fallback.js) if the request
// fails. Once the Express + MongoDB backend is running and reachable
// at VITE_API_URL, real/admin-managed data takes over automatically.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, { method = 'GET', body, auth = false, isForm = false } = {}) {
  const headers = {}
  if (!isForm) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = localStorage.getItem('s60_admin_token')
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`)
  }
  return data
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
}

/**
 * Fetch from the API, but resolve with `fallback` instead of throwing
 * if the API is unreachable or errors out. `unwrap` optionally plucks
 * a nested field (e.g. "data") out of the API response.
 */
export async function getWithFallback(path, fallback, unwrap = 'data') {
  try {
    const json = await api.get(path)
    const value = unwrap ? json[unwrap] : json
    if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
      return fallback
    }
    return value
  } catch (err) {
    return fallback
  }
}

export function imageUrl(path) {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('/')) return path.startsWith('/uploads') ? `${BASE_URL.replace('/api', '')}${path}` : path
  return path
}

// On-brand placeholder art shown until an admin uploads a real photo
// via the admin panel. Once `image` is set on a document, resolveImage
// returns the real (uploaded) URL instead.
const PLACEHOLDERS = {
  avatar: '/placeholders/avatar.svg',
  project: '/placeholders/project.svg',
  gallery: '/placeholders/gallery.svg',
  event: '/placeholders/event.svg',
}

export function resolveImage(image, type = 'avatar') {
  const resolved = imageUrl(image)
  return resolved || PLACEHOLDERS[type] || PLACEHOLDERS.avatar
}

export function placeholderFor(type) {
  return PLACEHOLDERS[type] || PLACEHOLDERS.avatar
}

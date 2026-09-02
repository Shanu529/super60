import { api } from '../lib/api.js'

const TOKEN_KEY = 's60_admin_token'
const NAME_KEY = 's60_admin_name'

// Logging in here uses the same /api/auth/login as any normal user —
// the backend has no separate "admin login" endpoint. What makes this
// an admin session is that we check the returned role and refuse to
// store a token for anyone whose database role isn't "admin". This is
// a convenience gate only: the real enforcement is server-side, via
// the adminOnly middleware on every admin-only route (a non-admin
// token would be rejected there even if this check were bypassed).
export async function adminLogin(email, password) {
  const res = await api.post('/auth/login', { email, password })

  if (res.role !== 'admin') {
    throw new Error('This account does not have admin access.')
  }

  localStorage.setItem(TOKEN_KEY, res.token)
  localStorage.setItem(NAME_KEY, res.name || email)
  return res
}

export function adminLogout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(NAME_KEY)
}

export function isAdminAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function adminName() {
  return localStorage.getItem(NAME_KEY) || 'Admin'
}

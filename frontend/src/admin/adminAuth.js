import { api } from '../lib/api.js'

const TOKEN_KEY = 's60_admin_token'
const NAME_KEY = 's60_admin_name'

export async function adminLogin(email, password) {
  const res = await api.post('/auth/login', { email, password })
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

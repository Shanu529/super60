import { api } from './api.js'

// A normal-user session, kept deliberately separate from the admin
// session (admin/adminAuth.js uses its own s60_admin_token key) so
// being logged in as a regular user never grants admin UI access and
// vice versa — each area reads only its own key.
const TOKEN_KEY = 's60_user_token'
const NAME_KEY = 's60_user_name'
const ROLE_KEY = 's60_user_role'

export async function signup(name, email, password) {
  const res = await api.post('/auth/signup', { name, email, password })
  localStorage.setItem(TOKEN_KEY, res.token)
  localStorage.setItem(NAME_KEY, res.name || name)
  localStorage.setItem(ROLE_KEY, res.role || 'user')
  return res
}

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password })
  localStorage.setItem(TOKEN_KEY, res.token)
  localStorage.setItem(NAME_KEY, res.name || email)
  localStorage.setItem(ROLE_KEY, res.role || 'user')
  return res
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(NAME_KEY)
  localStorage.removeItem(ROLE_KEY)
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function currentUserName() {
  return localStorage.getItem(NAME_KEY) || ''
}

export function currentUserRole() {
  return localStorage.getItem(ROLE_KEY) || 'user'
}

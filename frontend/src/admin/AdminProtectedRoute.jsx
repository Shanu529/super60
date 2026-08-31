import { Navigate, Outlet } from 'react-router-dom'
import { isAdminAuthenticated } from './adminAuth.js'

export default function AdminProtectedRoute() {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }
  return <Outlet />
}

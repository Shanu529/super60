import { Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminLogin.jsx'
import AdminProtectedRoute from './AdminProtectedRoute.jsx'
import AdminLayout from './AdminLayout.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import ResourceManager from './ResourceManager.jsx'
import SingletonManager from './SingletonManager.jsx'
import HomepageManager from './HomepageManager.jsx'
import { resourceConfigs, singletonConfigs } from './resourceConfigs.js'

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="faculty" element={<ResourceManager config={resourceConfigs.faculty} />} />
          <Route path="projects" element={<ResourceManager config={resourceConfigs.projects} />} />
          <Route path="events" element={<ResourceManager config={resourceConfigs.events} />} />
          <Route path="gallery" element={<ResourceManager config={resourceConfigs.gallery} />} />
          <Route path="announcements" element={<ResourceManager config={resourceConfigs.announcements} />} />
          <Route path="hod" element={<SingletonManager config={singletonConfigs.hod} />} />
          <Route path="mentor" element={<SingletonManager config={singletonConfigs.mentor} />} />
          <Route path="teacher" element={<SingletonManager config={singletonConfigs.teacher} />} />
          <Route path="homepage" element={<HomepageManager />} />
        </Route>
      </Route>
    </Routes>
  )
}

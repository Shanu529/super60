import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import EventDetailModal from './components/EventDetailModal.jsx'
import { EventModalProvider } from './context/EventModalContext.jsx'
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion.js'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Community from './pages/Community.jsx'
import Events from './pages/Events.jsx'
import Faculty from './pages/Faculty.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'
import Announcements from './pages/Announcements.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

import AdminApp from './admin/AdminApp.jsx'

function SiteLayout() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  return (
    <EventModalProvider>
      <div className="app-shell">

        <Navbar />

        <main>
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={location.pathname}
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      y: 14,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduced
                  ? undefined
                  : {
                      opacity: 0,
                      y: -10,
                    }
              }
              transition={{
                duration: reduced ? 0 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Routes>

                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="/about"
                  element={<About />}
                />

                <Route
                  path="/community"
                  element={<Community />}
                />

                <Route
                  path="/events"
                  element={<Events />}
                />

                <Route
                  path="/faculty"
                  element={<Faculty />}
                />

                <Route
                  path="/projects"
                  element={<Projects />}
                />

                <Route
                  path="/projects/:slug"
                  element={<ProjectDetail />}
                />

                <Route
                  path="/gallery"
                  element={<Gallery />}
                />

                <Route
                  path="/announcements"
                  element={<Announcements />}
                />

                <Route
                  path="/contact"
                  element={<Contact />}
                />

                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route
                  path="/signup"
                  element={<Signup />}
                />

              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />

        <EventDetailModal />

      </div>
    </EventModalProvider>
  )
}

export default function App() {
  return (
    <Routes>

      {/* WEBSITE */}

      <Route
        path="/*"
        element={<SiteLayout />}
      />

      {/* ADMIN */}

      <Route
        path="/admin/*"
        element={<AdminApp />}
      />

    </Routes>
  )
}
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './Navbar.module.css'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

const NAV_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Community', to: '/community' },
  { label: 'Faculty', to: '/faculty' },
  { label: 'Projects', to: '/projects' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

const EASE = [0.22, 1, 0.36, 1]

const mobileMenuVariants = {
  hidden: { height: 0, opacity: 0 },
  show: { height: 'auto', opacity: 1, transition: { duration: 0.35, ease: EASE } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.25, ease: EASE } },
}

const mobileLinksContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
}

const mobileLinkItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const getNavLinkClass = ({ isActive }) =>
    `${styles['nav-link']}${isActive ? ` ${styles.active}` : ''}`

  return (
    <header className={`${styles.navbar}${scrolled ? ` ${styles.scrolled}` : ''}`}>
      <div className={`container ${styles['navbar-inner']}`}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <img
            src="super-60.png"
            alt="Super 60 Logo"
            className={styles['brand-mark']}
            width={34}
            height={38}
          />
          <div className={styles['brand-text']}>
            <span className={styles['brand-line1']}>
              <span className={styles['brand-red']}>the</span> Super 60
            </span>
            <span className={styles['brand-line2']}>Community</span>
          </div>
        </Link>

        <nav className={`${styles['nav-links']} ${styles['desktop-only']}`} aria-label="Main Desktop Navigation">
          {NAV_LINKS.map(({ to, label }) => {
            const isActive = location.pathname === to
            return (
              <NavLink key={to} to={to} className={getNavLinkClass}>
                <span className={styles['nav-link-label']}>{label.toUpperCase()}</span>
                {isActive && !reduced && (
                  <motion.span
                    className={styles['nav-underline']}
                    layoutId="nav-underline"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className={styles['navbar-actions']}>
          <motion.button
            className={`${styles['icon-btn']} ${styles['menu-btn']} ${styles['mobile-only']}`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            type="button"
            whileTap={reduced ? undefined : { scale: 0.9 }}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ display: 'inline-block' }}
            >
              {isOpen ? '✕' : '☰'}
            </motion.span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.nav
            className={styles['nav-mobile']}
            aria-label="Main Mobile Navigation"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={reduced ? undefined : mobileMenuVariants}
            style={{ overflow: 'hidden', display: 'flex' }}
          >
            <motion.div
              className={styles['nav-mobile-inner']}
              variants={reduced ? undefined : mobileLinksContainer}
              initial="hidden"
              animate="show"
            >
              {NAV_LINKS.map(({ to, label }) => (
                <motion.div key={to} variants={reduced ? undefined : mobileLinkItem}>
                  <NavLink to={to} className={getNavLinkClass} onClick={closeMenu}>
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

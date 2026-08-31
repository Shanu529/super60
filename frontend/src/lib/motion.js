// Shared Framer Motion variants — kept in one place so every section
// of the site animates with the same easing/timing language instead
// of ad-hoc numbers scattered across components.

export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

export const revealClip = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  show: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.8, ease: EASE } },
}

export function staggerContainer(stagger = 0.09, delayChildren = 0) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}

export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' }

export function splitWords(text = '') {
  return text.split(' ')
}

export const wordVariant = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: '0%', transition: { duration: 0.6, ease: EASE } },
}

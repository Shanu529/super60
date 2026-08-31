import { motion } from 'framer-motion'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js'
import { staggerContainer, viewportOnce } from '../../lib/motion.js'

export default function RevealGroup({ as = 'div', className, style, stagger = 0.09, delayChildren = 0, children, ...rest }) {
  const reduced = usePrefersReducedMotion()
  const Component = motion[as] || motion.div

  if (reduced) {
    const Plain = as
    return (
      <Plain className={className} style={style} {...rest}>
        {children}
      </Plain>
    )
  }

  return (
    <Component
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delayChildren)}
      {...rest}
    >
      {children}
    </Component>
  )
}

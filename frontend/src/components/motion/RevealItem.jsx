import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion.js'

export default function RevealItem({ as = 'div', variants = fadeUp, className, style, children, ...rest }) {
  const Component = motion[as] || motion.div
  return (
    <Component className={className} style={style} variants={variants} {...rest}>
      {children}
    </Component>
  )
}

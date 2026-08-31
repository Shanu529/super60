import { motion } from 'framer-motion'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js'
import { wordVariant, viewportOnce } from '../../lib/motion.js'

export default function TextReveal({ text, as: Tag = 'span', className, stagger = 0.045, delay = 0 }) {
  const reduced = usePrefersReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
          aria-hidden="true"
        >
          <motion.span
            style={{ display: 'inline-block' }}
            variants={wordVariant}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            transition={{ delay: delay + i * stagger }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

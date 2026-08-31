import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 -> target once the element enters the viewport.
 * `target` may include non-numeric characters (₹, +, k, etc.) — only the
 * leading numeric portion is animated, the rest of the string is preserved.
 */
export default function useCountUp(target = '0', duration = 1400) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(() => formatWithZero(target))

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setDisplay(target)
      return
    }

    const match = String(target).match(/[\d,]+(\.\d+)?/)
    if (!match) {
      setDisplay(target)
      return
    }

    const numeric = parseFloat(match[0].replace(/,/g, ''))
    const prefix = String(target).slice(0, match.index)
    const suffix = String(target).slice(match.index + match[0].length)
    const decimals = (match[0].split('.')[1] || '').length

    let raf
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(node)
          const start = performance.now()
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const value = numeric * eased
            const formatted = decimals
              ? value.toFixed(decimals)
              : Math.round(value).toLocaleString('en-IN')
            setDisplay(`${prefix}${formatted}${suffix}`)
            if (progress < 1) raf = requestAnimationFrame(step)
          }
          raf = requestAnimationFrame(step)
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [target, duration])

  return [ref, display]
}

function formatWithZero(target) {
  const match = String(target).match(/[\d,]+(\.\d+)?/)
  if (!match) return target
  const prefix = String(target).slice(0, match.index)
  const suffix = String(target).slice(match.index + match[0].length)
  return `${prefix}0${suffix}`
}

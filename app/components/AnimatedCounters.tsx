'use client'

import { useEffect } from 'react'

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

function animateValue(el: HTMLElement, target: number, suffix: string, prefix: string, duration: number) {
  const start = performance.now()
  const isDecimal = target % 1 !== 0

  const step = (now: number) => {
    const elapsed = now - start
    const t = Math.min(elapsed / duration, 1)
    const eased = easeOutQuart(t)
    const value = eased * target

    if (isDecimal) {
      el.textContent = prefix + value.toFixed(1) + suffix
    } else {
      el.textContent = prefix + Math.round(value).toLocaleString() + suffix
    }

    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function AnimatedCounters() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Define which stat numbers to animate and their targets
    const counterMap: Record<string, { target: number; suffix: string; prefix: string; duration: number }> = {
      '15.8K': { target: 15.8, suffix: 'K', prefix: '', duration: 1800 },
      '10M+': { target: 10, suffix: 'M+', prefix: '', duration: 2000 },
      '1M+':  { target: 1, suffix: 'M+', prefix: '', duration: 1600 },
      '264K': { target: 264, suffix: 'K', prefix: '', duration: 1800 },
      '62%':  { target: 62, suffix: '%', prefix: '', duration: 1400 },
      '100%': { target: 100, suffix: '%', prefix: '', duration: 1400 },
    }

    // Observe all .hero-stat-number and .stat-number elements
    const targets = document.querySelectorAll('.hero-stat-number, .stat-number')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const text = el.textContent?.trim() || ''
          const cfg = counterMap[text]
          if (cfg && !el.dataset.animated) {
            el.dataset.animated = '1'
            animateValue(el, cfg.target, cfg.suffix, cfg.prefix, cfg.duration)
          }
          observer.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}

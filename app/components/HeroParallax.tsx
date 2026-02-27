'use client'

import { useEffect, useRef } from 'react'

export default function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run if no motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const hero = document.querySelector('.hero') as HTMLElement | null
    const photo = document.querySelector('.hero-photo img') as HTMLImageElement | null
    if (!hero || !photo) return

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      // Normalise cursor to -1…1 within the hero
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

      const tiltX = y * -6  // degrees
      const tiltY = x * 8
      const moveX = x * 12  // pixels
      const moveY = y * 6

      photo.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${moveX}px, ${moveY}px)`
      photo.style.transition = 'transform 0.12s ease-out'
    }

    const onLeave = () => {
      photo.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)'
      photo.style.transition = 'transform 0.6s ease'
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)

    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ref} />
}

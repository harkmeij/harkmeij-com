'use client'

import { useEffect, useState } from 'react'

export default function StickyBadge() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero (~80vh)
      setVisible(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="mailto:mark@betterview.nl"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#1A1A1A',
        color: '#ffffff',
        borderRadius: '100px',
        padding: '12px 20px 12px 16px',
        fontSize: '14px',
        fontWeight: '600',
        textDecoration: 'none',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.08)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents: visible ? 'auto' : 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#009D57', boxShadow: '0 0 6px rgba(0,157,87,0.8)', flexShrink: 0 }} />
      <span>2 spots open</span>
      <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 2px' }}>·</span>
      <span style={{ color: '#009D57', fontWeight: 700 }}>mark@betterview.nl</span>
    </a>
  )
}

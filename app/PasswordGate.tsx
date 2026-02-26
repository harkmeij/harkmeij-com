'use client'

import { useState, useEffect, ReactNode } from 'react'

const SESSION_KEY = 'mk_full_auth'
const CORRECT_PASSWORD = 'Rotterdam2026'

function Modal({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onSuccess()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      setValue('')
    }
  }

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .gate-shake { animation: shake 0.5s ease; }
      `}</style>
      <div style={{
        minHeight: '100vh',
        background: '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Satoshi', -apple-system, sans-serif",
        padding: '24px',
      }}>
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'rgba(0,157,87,0.12)',
            border: '1px solid rgba(0,157,87,0.3)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '24px',
          }}>🔒</div>

          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}>Full Media Kit</h1>

          <p style={{
            fontSize: '15px',
            color: '#737373',
            marginBottom: '32px',
            lineHeight: '1.6',
          }}>
            Enter the access code to view partnership rates and full details.
          </p>

          <form onSubmit={handleSubmit}>
            <div className={shaking ? 'gate-shake' : ''} style={{ marginBottom: '12px' }}>
              <input
                type="password"
                value={value}
                onChange={e => { setValue(e.target.value); setError(false) }}
                placeholder="Access code"
                autoFocus
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: '#262626',
                  border: `1px solid ${error ? '#C41A33' : '#404040'}`,
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            {error && (
              <p style={{
                fontSize: '13px',
                color: '#C41A33',
                marginBottom: '12px',
                textAlign: 'left',
              }}>Incorrect code. Try again.</p>
            )}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: '#009D57',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '700',
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              View full media kit
            </button>
          </form>

          <p style={{ marginTop: '24px', fontSize: '13px', color: '#525252' }}>
            Don&apos;t have a code?{' '}
            <a href="mailto:mark@harkmeij.com" style={{ color: '#009D57', textDecoration: 'none' }}>
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === '1')
  }, [])

  if (authed === null) return null
  if (!authed) return <Modal onSuccess={() => setAuthed(true)} />
  return <>{children}</>
}

'use client'

import { useEffect } from 'react'

export default function MarkAge() {
  useEffect(() => {
    const dob = new Date(1997, 10, 6)
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    if (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate())) age--
    const el = document.getElementById('mark-age')
    if (el) el.textContent = String(age)
  }, [])
  return null
}

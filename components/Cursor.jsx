'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const el = document.getElementById('cursor')
    if (!el) return

    const onMove = (e) => {
      el.style.opacity = '1'
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
    }
    const onOver = (e) => {
      if (e.target.closest('a, button')) el.classList.add('big')
      else el.classList.remove('big')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return <div id="cursor" />
}

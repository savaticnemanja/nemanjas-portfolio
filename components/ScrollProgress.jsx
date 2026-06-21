'use client'
import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) bar.style.transform = `scaleX(${scrolled / total})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />
}

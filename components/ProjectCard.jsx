'use client'

import { useRef } from 'react'

/**
 * Project card with a light that tracks the pointer across it — the
 * card-scale sibling of the aurora's parallax. The position is written to two
 * custom properties and consumed by `.project-glow`, so nothing re-renders.
 */
export default function ProjectCard({ href, className = '', children }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMove}
      className={`project-card ${className}`.trim()}
    >
      <span className="project-glow" aria-hidden="true" />
      {children}
    </a>
  )
}

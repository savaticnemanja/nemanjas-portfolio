'use client'

import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, input, textarea, [role="button"]'

/**
 * Two-part cursor: a lime dot that tracks the pointer closely and a hairline
 * ring that lags behind it. The lag is the effect — same easing idea as the
 * aurora parallax, one order of magnitude faster.
 *
 * Only mounts for a fine pointer with motion allowed, and the `has-cursor`
 * class it puts on <html> is what hides the system cursor, so the native one
 * is never taken away from anyone who isn't getting the replacement. Both
 * elements use `transform`, never `left`/`top`, so tracking never triggers
 * layout.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const root = document.documentElement
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    let targetX = 0
    let targetY = 0
    let dotX = 0
    let dotY = 0
    let ringX = 0
    let ringY = 0
    let frame = 0
    let seen = false

    const tick = () => {
      dotX += (targetX - dotX) * 0.55
      dotY += (targetY - dotY) * 0.55
      ringX += (targetX - ringX) * 0.16
      ringY += (targetY - ringY) * 0.16
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`

      const remaining =
        Math.abs(targetX - ringX) + Math.abs(targetY - ringY) +
        Math.abs(targetX - dotX) + Math.abs(targetY - dotY)
      frame = remaining > 0.1 ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY

      // First move: drop both parts straight onto the pointer instead of
      // flying them in from the top-left corner.
      if (!seen) {
        seen = true
        dotX = ringX = targetX
        dotY = ringY = targetY
        dot.dataset.active = 'true'
        ring.dataset.active = 'true'
      }

      const hot = Boolean(event.target?.closest?.(INTERACTIVE))
      ring.dataset.hot = hot ? 'true' : 'false'
      start()
    }

    const hide = () => {
      dot.dataset.active = 'false'
      ring.dataset.active = 'false'
      seen = false
    }

    const sync = () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)

      if (!fine.matches || reduced.matches) {
        root.classList.remove('has-cursor')
        hide()
        return
      }
      root.classList.add('has-cursor')
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', hide)
      window.addEventListener('blur', hide)
    }

    sync()
    fine.addEventListener('change', sync)
    reduced.addEventListener('change', sync)

    return () => {
      fine.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      cancelAnimationFrame(frame)
      root.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

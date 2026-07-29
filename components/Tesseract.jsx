'use client'

import { useEffect, useRef } from 'react'

/* A tesseract: the 16 vertices are every combination of ±1 in four axes, and
   two vertices share an edge exactly when they differ in a single coordinate —
   which gives 32 edges, one per (vertex, axis) pair counted once. */
const VERTICES = Array.from({ length: 16 }, (_, i) => [
  i & 1 ? 1 : -1,
  i & 2 ? 1 : -1,
  i & 4 ? 1 : -1,
  i & 8 ? 1 : -1,
])

const EDGES = []
for (let i = 0; i < 16; i += 1) {
  for (let axis = 0; axis < 4; axis += 1) {
    const j = i ^ (1 << axis)
    if (j > i) EDGES.push([i, j])
  }
}

/** Rotate a point inside the plane spanned by two of its axes. */
function rotate(p, a, b, angle) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const pa = p[a]
  const pb = p[b]
  p[a] = pa * c - pb * s
  p[b] = pa * s + pb * c
}

// Both projections are perspective divides. The 4D one is what makes the inner
// cube look smaller than the outer one and turn itself inside out as w passes
// through the viewpoint; the 3D one is ordinary vanishing-point foreshortening.
const W_DISTANCE = 2.9
const Z_DISTANCE = 4.6

// The pose held under prefers-reduced-motion. Deliberately off-axis, so the
// still frame reads as a tesseract rather than as two concentric squares.
const RESTING_TIME = 2.4

/**
 * The hero's ornament. Hairline edges in the brand colour, rotating in two 4D
 * planes at once and leaning toward the pointer.
 *
 * Canvas rather than SVG: 32 edges redrawn per frame is 32 attribute writes and
 * a style recalc in the DOM, and none of it here needs to be inspectable or
 * hit-testable. Decorative, so it is aria-hidden and never announced.
 */
export default function Tesseract({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')

    let width = 0
    let height = 0
    let frame = 0
    let running = false
    let visible = true
    let last = 0
    let time = 0

    // Pointer lean chases its target instead of snapping to it — the same
    // weighted follow the aurora uses, so the two read as one system.
    let targetX = 0
    let targetY = 0
    let leanX = 0
    let leanY = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return false
      // Backing store in device pixels, drawing commands in CSS pixels, so a
      // 1px edge stays 1px on a 2x display instead of going soft.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      return true
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      // Both rotations preserve the 4D norm, so the projected radius has a
      // hard ceiling: sweeping this exact rotation through a full period with
      // the lean at its extremes peaks at 3.454 units, and never drops below
      // 3.21 — a 7% spread, which is why a fixed scale can fill the frame
      // without the figure appearing to breathe. 0.44 / 3.454 leaves a 6%
      // margin on the shortest side, so no vertex ever reaches the edge.
      const scale = Math.min(width, height) * 0.1274

      const points = VERTICES.map((v) => {
        const p = [v[0], v[1], v[2], v[3]]

        // Two simultaneous rotations in independent planes. A single plane just
        // spins the shape; the pair is what produces the turning-through-itself
        // motion a tesseract is worth drawing for.
        rotate(p, 0, 3, time * 0.30) // x–w
        rotate(p, 1, 2, time * 0.22) // y–z

        // Pointer lean, applied after the spin so it tilts the whole figure
        // rather than being carried around by it.
        rotate(p, 0, 2, leanX * 0.55) // yaw
        rotate(p, 1, 3, leanY * 0.45) // pitch through the fourth axis

        const kw = W_DISTANCE / (W_DISTANCE - p[3])
        const x3 = p[0] * kw
        const y3 = p[1] * kw
        const z3 = p[2] * kw

        const kz = Z_DISTANCE / (Z_DISTANCE - z3)
        return {
          x: cx + x3 * kz * scale,
          y: cy + y3 * kz * scale,
          // Combined nearness, used for both brightness and stroke weight.
          depth: kw * kz,
        }
      })

      // Far edges first, so nearer ones lie over them.
      const edges = EDGES.map(([a, b]) => ({
        a: points[a],
        b: points[b],
        depth: (points[a].depth + points[b].depth) / 2,
      })).sort((m, n) => m.depth - n.depth)

      ctx.lineCap = 'round'
      for (const edge of edges) {
        // Depth runs roughly 0.45–1.9 across a full turn; normalising against
        // that keeps the contrast range stable rather than pulsing with it.
        const t = Math.min(Math.max((edge.depth - 0.5) / 1.15, 0), 1)
        ctx.strokeStyle = `rgba(200, 255, 0, ${(0.14 + t * 0.62).toFixed(3)})`
        ctx.lineWidth = 1.05 + t * 1.2
        ctx.beginPath()
        ctx.moveTo(edge.a.x, edge.a.y)
        ctx.lineTo(edge.b.x, edge.b.y)
        ctx.stroke()
      }

      // Vertices, near ones only — dotting all sixteen turns the middle into
      // noise once the inner cube passes through.
      for (const p of points) {
        const t = Math.min(Math.max((p.depth - 0.95) / 0.95, 0), 1)
        if (t <= 0.02) continue
        ctx.fillStyle = `rgba(200, 255, 0, ${(t * 0.85).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 0.9 + t * 1.7, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      time += dt

      leanX += (targetX - leanX) * 0.055
      leanY += (targetY - leanY) * 0.055

      draw()
      frame = running ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (running || !visible || reduced.matches) return
      if (!width && !resize()) return
      running = true
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointerMove = (event) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1
      targetY = (event.clientY / window.innerHeight) * 2 - 1
    }

    const recentre = () => {
      targetX = 0
      targetY = 0
    }

    // Reduced motion gets one still frame at a fixed pose: the shape is
    // information, the spinning is decoration, and only the second is opted out
    // of. Pointer lean goes with it — that is motion too.
    const sync = () => {
      stop()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', recentre)

      if (reduced.matches) {
        time = RESTING_TIME
        leanX = 0
        leanY = 0
        targetX = 0
        targetY = 0
        if (width || resize()) draw()
        return
      }

      if (fine.matches) {
        window.addEventListener('pointermove', onPointerMove, { passive: true })
        window.addEventListener('blur', recentre)
      } else {
        recentre()
      }
      start()
    }

    // The canvas is laid out at every width now, but it is still measured
    // rather than assumed: a zero-sized box (hidden ancestor, or a frame taken
    // before layout settles) stops the loop, and it starts on its own once the
    // box has a size.
    const observer = new ResizeObserver(() => {
      const ok = resize()
      if (!ok) {
        stop()
        return
      }
      if (reduced.matches) draw()
      else start()
    })
    observer.observe(canvas)

    // Nothing to animate once it has scrolled away.
    const seen = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) sync()
        else stop()
      },
      { rootMargin: '120px' },
    )
    seen.observe(canvas)

    sync()
    reduced.addEventListener('change', sync)
    fine.addEventListener('change', sync)

    return () => {
      reduced.removeEventListener('change', sync)
      fine.removeEventListener('change', sync)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', recentre)
      observer.disconnect()
      seen.disconnect()
      stop()
    }
  }, [])

  return <canvas ref={ref} className={`tesseract ${className}`.trim()} aria-hidden="true" />
}

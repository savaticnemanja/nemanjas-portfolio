'use client'

import { Children, useEffect, useRef, useState } from 'react'

/**
 * True once the element has been on screen, and stays true afterwards —
 * nothing on this site animates out again.
 *
 * Falls back to visible where IntersectionObserver is missing, so the content
 * can never be stranded in its hidden start state. With JS off entirely the
 * <noscript> block in app/layout.jsx does the same job.
 */
function useInView(ref, rootMargin = '-60px') {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}

/**
 * Scroll-triggered reveal: a 16px rise and a fade, on the site's one easing
 * curve. The movement is dropped under prefers-reduced-motion (in CSS) so it
 * degrades to a cross-fade rather than vanishing.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-visible={inView ? 'true' : 'false'}
      style={delay ? { '--reveal-delay': `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * Reveals its children in sequence off a single observer on the container, so
 * a grid animates as one group rather than as N independent elements racing
 * each other. Each child is wrapped and handed its index; the 60ms step lives
 * in CSS.
 *
 * `itemProps` is an array, one entry per child, whose attributes go on that
 * generated wrapper. It exists because the wrapper — not the child — is the
 * grid item, so anything the layout needs per cell (the work grid's bento
 * span) has to reach the div this component creates; without it a caller can
 * only style its own element and the span lands one level too deep, where
 * `grid-column` does nothing. An array rather than an `(index) => props`
 * callback because the callers are server components and a function cannot
 * cross that boundary.
 */
export function Stagger({ as: Tag = 'div', className = '', itemProps, children, ...rest }) {
  const ref = useRef(null)
  const inView = useInView(ref, '-40px')

  return (
    <Tag
      ref={ref}
      className={`stagger ${className}`.trim()}
      data-visible={inView ? 'true' : 'false'}
      {...rest}
    >
      {Children.map(children, (child, i) =>
        child == null ? child : (
          <div className="stagger-item" style={{ '--i': i }} {...itemProps?.[i]}>
            {child}
          </div>
        ),
      )}
    </Tag>
  )
}

/**
 * Counts up to a number when it scrolls into view. Renders the final value on
 * the server, so the real figure is in the HTML for crawlers and for anyone
 * who never sees the animation.
 */
export function CountUp({ value, duration = 1100, decimals = 0, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, '0px')
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutExpo — most of the travel happens immediately, then it settles.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref} className="num">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/** Live dot with an expanding ring. Decorative — always paired with words. */
export function PulseDot() {
  return <span className="pulse" aria-hidden="true" />
}

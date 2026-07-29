'use client'

import { useEffect, useRef, useState } from 'react'
import content from '@content/en'
import { PulseDot } from '@components/motion'
import { useSectionHref } from '@components/SectionLink'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

function Mark() {
  return (
    <svg className="logo-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="2.5" y="2.5" width="19" height="19" rx="5"
        fill="none" stroke="currentColor" strokeWidth="2.5"
      />
      <path d="M8 16.5 16 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(false)
  const frame = useRef(0)
  const sectionHref = useSectionHref()

  // One rAF-throttled scroll handler drives both the header's border and the
  // active link, rather than two listeners fighting over the same event.
  useEffect(() => {
    const read = () => {
      frame.current = 0
      setScrolled(window.scrollY > 24)

      // The section that owns the top third of the viewport is the current
      // one; measuring against a line rather than an intersection ratio keeps
      // short sections from being skipped.
      const line = window.innerHeight / 3
      let current = null
      for (const link of LINKS) {
        const el = document.getElementById(link.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= line) current = link.id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  // The panel is a mobile affordance only: leaving it open while the desktop
  // nav comes back would strand a menu nobody can see the trigger for.
  useEffect(() => {
    if (!open) return
    const wide = window.matchMedia('(min-width: 900px)')
    const close = () => setOpen(false)
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    wide.addEventListener('change', close)
    document.addEventListener('keydown', onKey)
    return () => {
      wide.removeEventListener('change', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="header" data-scrolled={scrolled ? 'true' : 'false'}>
      <div className="page header-inner">
        <a href="/" className="logo">
          <Mark />
          <span className="logo-word">nemanjas<span>.dev</span></span>
        </a>

        <nav className="header-nav" aria-label="Sections">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={sectionHref(link.id)}
              data-active={active === link.id ? 'true' : 'false'}
              aria-current={active === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href={`${content.contact.calOrigin}/${content.contact.calLink}`}
            target="_blank"
            rel="noreferrer"
            className="header-cta"
          >
            <PulseDot />
            Book a call
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              {open ? (
                <path
                  d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2 4.5h12M2 11.5h12"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="menu-panel" id="mobile-menu">
          <nav className="page" aria-label="Menu">
            {LINKS.map((link) => (
              <a key={link.id} href={sectionHref(link.id)} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            {/* The header's booking CTA is hidden at this width; without it
                here the menu would be the only nav and still not offer it. */}
            <a
              href={`${content.contact.calOrigin}/${content.contact.calLink}`}
              target="_blank"
              rel="noreferrer"
              data-cta="true"
              onClick={() => setOpen(false)}
            >
              Book a call
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

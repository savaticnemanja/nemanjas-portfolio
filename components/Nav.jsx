'use client'
import { useEffect, useState } from 'react'

const NAV_SECTIONS = ['work', 'about', 'experience', 'blog', 'contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = NAV_SECTIONS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-20% 0px -70% 0px' },
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (e, selector) => {
    e.preventDefault()
    setMenuOpen(false)
    if (selector === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const target = document.querySelector(selector)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={(e) => scrollTo(e, '#top')}>
          nemanjas<span>.dev</span>
        </a>
        <ul className="nav-links">
          {NAV_SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? 'active' : ''}
                onClick={(e) => scrollTo(e, `#${id}`)}
              >
                {id}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta" onClick={(e) => scrollTo(e, '#contact')}>
          Book a Call
        </a>
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((m) => !m)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_SECTIONS.map((id) => (
          <a key={id} href={`#${id}`} onClick={(e) => scrollTo(e, `#${id}`)}>
            {id}
          </a>
        ))}
      </div>
    </>
  )
}

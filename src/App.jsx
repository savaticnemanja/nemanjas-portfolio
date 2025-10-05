import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import './App.css'

import Header from './components/Header'
import SocialBar from './components/SocialBar'
import EmailBar from './components/EmailBar'
import AboutSection from './components/sections/AboutSection'
import ExperienceSection from './components/sections/ExperienceSection'
import WorkSection from './components/sections/WorkSection'
import BlogSection from './components/sections/BlogSection'
import ContactSection from './components/sections/ContactSection'

const emailAddress = 'savatic.nemanja@gmail.com'

const SECTION_IDS = ['about', 'experience', 'work', 'blog', 'contact']
const SECTION_COMPONENTS = {
  about: AboutSection,
  experience: ExperienceSection,
  work: WorkSection,
  blog: BlogSection,
  contact: ContactSection,
}

const TRANSITION_MS = 550

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const BASE_POSITIONS = {
  warm: { x: 78, y: 30 },
  cool: { x: 22, y: 70 },
}

const MOVEMENT_RANGE = {
  warm: { x: 7, y: 7 },
  cool: { x: 7, y: 7 },
}

const FLOAT_SETTINGS = {
  warm: {
    amplitude: { x: 4.6, y: 4.2 },
    speed: { x: 0.00025, y: 0.00022 },
    phase: { x: 0, y: Math.PI / 3 },
  },
  cool: {
    amplitude: { x: 4.0, y: 4.8 },
    speed: { x: 0.00026, y: 0.00024 },
    phase: { x: Math.PI / 2, y: Math.PI / 4 },
  },
}

const sectionSpecificProps = {}

function App() {
  const pageRef = useRef(null)
  const pointerTargetRef = useRef({ x: 50, y: 50 })
  const animationRef = useRef(null)
  const wheelCooldownRef = useRef(false)
  const touchStartRef = useRef(null)
  const touchContainerRef = useRef(null)

  const { t } = useTranslation()

  const sections = useMemo(
    () =>
      SECTION_IDS.map((id) => ({
        id,
        label: t(`navigation.${id}.label`),
        shortLabel: t(`navigation.${id}.short`),
      })),
    [t],
  )

  const [currentSectionIndex, setCurrentSectionIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.replace(/\?.*$/, '')
      const normalized = pathname.replace(/^\//, '').replace(/\/+$/, '')
      const candidate = normalized.split('/')[0]
      const initialIndex = SECTION_IDS.indexOf(candidate)
      if (initialIndex >= 0) {
        return initialIndex
      }
    }

    return 0
  })
  const [transition, setTransition] = useState(null)
  const [scrollDirection, setScrollDirection] = useState('down')

  const activeSection = sections[currentSectionIndex]
  const activeSectionId = activeSection?.id

  useEffect(() => {
    if (typeof document === 'undefined') return

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlHeight = document.documentElement.style.height
    const previousBodyHeight = document.body.style.height

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.height = '100dvh'
    document.body.style.height = '100dvh'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.height = previousHtmlHeight
      document.body.style.height = previousBodyHeight
    }
  }, [])

  const navigateToIndex = useCallback(
    (nextIndex, withCooldown = false) => {
      if (nextIndex === currentSectionIndex) return
      if (nextIndex < 0 || nextIndex >= sections.length) return
      if (transition) return

      const direction = nextIndex > currentSectionIndex ? 'down' : 'up'
      setScrollDirection(direction)
      setTransition({ from: currentSectionIndex, to: nextIndex })

      if (withCooldown) {
        wheelCooldownRef.current = true
        window.setTimeout(() => {
          wheelCooldownRef.current = false
        }, TRANSITION_MS + 200)
      }
    },
    [currentSectionIndex, sections.length, transition],
  )

  useEffect(() => {
    const handlePointerMove = (event) => {
      const { innerWidth, innerHeight } = window

      if (!innerWidth || !innerHeight) return

      const xPercent = (event.clientX / innerWidth) * 100
      const yPercent = (event.clientY / innerHeight) * 100

      pointerTargetRef.current.x = clamp(xPercent, 0, 100)
      pointerTargetRef.current.y = clamp(yPercent, 0, 100)
    }

    const handlePointerLeave = () => {
      pointerTargetRef.current.x = 50
      pointerTargetRef.current.y = 50
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  useEffect(() => {
    const container = pageRef.current
    if (!container) return

    const current = {
      warmX: BASE_POSITIONS.warm.x,
      warmY: BASE_POSITIONS.warm.y,
      coolX: BASE_POSITIONS.cool.x,
      coolY: BASE_POSITIONS.cool.y,
    }

    container.style.setProperty('--warm-light-x', `${current.warmX}%`)
    container.style.setProperty('--warm-light-y', `${current.warmY}%`)
    container.style.setProperty('--warm-light-color', 'rgba(160, 130, 255, 0.2)')
    container.style.setProperty('--cool-light-x', `${current.coolX}%`)
    container.style.setProperty('--cool-light-y', `${current.coolY}%`)

    const animate = () => {
      const now = performance.now()
      const pointer = pointerTargetRef.current

      const pointerNormX = clamp((pointer.x - 50) / 50, -1, 1)
      const pointerNormY = clamp((pointer.y - 50) / 50, -1, 1)

      const driftNormX = Math.sin(now * 0.00012) * 0.45
      const driftNormY = Math.cos(now * 0.0001) * 0.45

      const normX = clamp(pointerNormX + driftNormX, -1, 1)
      const normY = clamp(pointerNormY + driftNormY, -1, 1)

      const warmFloatX =
        Math.sin(now * FLOAT_SETTINGS.warm.speed.x + FLOAT_SETTINGS.warm.phase.x) *
        FLOAT_SETTINGS.warm.amplitude.x
      const warmFloatY =
        Math.sin(now * FLOAT_SETTINGS.warm.speed.y + FLOAT_SETTINGS.warm.phase.y) *
        FLOAT_SETTINGS.warm.amplitude.y
      const coolFloatX =
        Math.sin(now * FLOAT_SETTINGS.cool.speed.x + FLOAT_SETTINGS.cool.phase.x) *
        FLOAT_SETTINGS.cool.amplitude.x
      const coolFloatY =
        Math.sin(now * FLOAT_SETTINGS.cool.speed.y + FLOAT_SETTINGS.cool.phase.y) *
        FLOAT_SETTINGS.cool.amplitude.y

      const warmTargetX = clamp(
        BASE_POSITIONS.warm.x + warmFloatX + normX * MOVEMENT_RANGE.warm.x,
        BASE_POSITIONS.warm.x - MOVEMENT_RANGE.warm.x,
        BASE_POSITIONS.warm.x + MOVEMENT_RANGE.warm.x,
      )
      const warmTargetY = clamp(
        BASE_POSITIONS.warm.y + warmFloatY + normY * MOVEMENT_RANGE.warm.y,
        BASE_POSITIONS.warm.y - MOVEMENT_RANGE.warm.y,
        BASE_POSITIONS.warm.y + MOVEMENT_RANGE.warm.y,
      )
      const coolTargetX = clamp(
        BASE_POSITIONS.cool.x + coolFloatX - normX * MOVEMENT_RANGE.cool.x,
        BASE_POSITIONS.cool.x - MOVEMENT_RANGE.cool.x,
        BASE_POSITIONS.cool.x + MOVEMENT_RANGE.cool.x,
      )
      const coolTargetY = clamp(
        BASE_POSITIONS.cool.y + coolFloatY - normY * MOVEMENT_RANGE.cool.y,
        BASE_POSITIONS.cool.y - MOVEMENT_RANGE.cool.y,
        BASE_POSITIONS.cool.y + MOVEMENT_RANGE.cool.y,
      )

      const easing = 0.05
      current.warmX += (warmTargetX - current.warmX) * easing
      current.warmY += (warmTargetY - current.warmY) * easing
      current.coolX += (coolTargetX - current.coolX) * easing
      current.coolY += (coolTargetY - current.coolY) * easing

      container.style.setProperty('--warm-light-x', `${current.warmX}%`)
      container.style.setProperty('--warm-light-y', `${current.warmY}%`)
      container.style.setProperty('--warm-light-color', 'rgba(160, 130, 255, 0.2)')
      container.style.setProperty('--cool-light-x', `${current.coolX}%`)
      container.style.setProperty('--cool-light-y', `${current.coolY}%`)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleWheel = (event) => {
      if (transition || wheelCooldownRef.current) return

      if (event.target instanceof Element) {
        const container = event.target.closest('.panel-grid, .panel-stack')
        if (container) {
          const scrollTop = container.scrollTop
          const scrollHeight = container.scrollHeight
          const clientHeight = container.clientHeight
          const maxScroll = scrollHeight - clientHeight
          const canScroll = maxScroll > 0
          if (canScroll) {
            const atTop = scrollTop <= 1
            const atBottom = scrollTop >= maxScroll - 1
            if (event.deltaY > 0 && !atBottom) {
              return
            }
            if (event.deltaY < 0 && !atTop) {
              return
            }
          }
        }
      }

      const delta = event.deltaY
      if (Math.abs(delta) < 30) return

      if (delta > 0) {
        navigateToIndex(currentSectionIndex + 1, true)
      } else if (delta < 0) {
        navigateToIndex(currentSectionIndex - 1, true)
      }

      if (Math.abs(delta) >= 30) {
        event.preventDefault()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentSectionIndex, transition, sections.length, navigateToIndex])

  useEffect(() => {
    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) return
      const target = event.target
      touchContainerRef.current =
        target instanceof Element ? target.closest('.panel-grid, .panel-stack') : null
      touchStartRef.current = event.touches[0].clientY
    }

    const handleTouchMove = (event) => {
      if (touchStartRef.current === null) return
      if (transition || wheelCooldownRef.current) return

      const currentY = event.touches[0].clientY
      const delta = touchStartRef.current - currentY

      const container = touchContainerRef.current
      if (container) {
        const scrollTop = container.scrollTop
        const scrollHeight = container.scrollHeight
        const clientHeight = container.clientHeight
        const maxScroll = scrollHeight - clientHeight
        const canScroll = maxScroll > 0
        if (canScroll) {
          const atTop = scrollTop <= 1
          const atBottom = scrollTop >= maxScroll - 1
          if (delta > 0 && !atBottom) {
            return
          }
          if (delta < 0 && !atTop) {
            return
          }
        }
      }

      if (Math.abs(delta) < 40) return

      if (delta > 0) {
        navigateToIndex(currentSectionIndex + 1, true)
      } else if (delta < 0) {
        navigateToIndex(currentSectionIndex - 1, true)
      }

      touchStartRef.current = currentY
      event.preventDefault()
    }

    const handleTouchEnd = () => {
      touchStartRef.current = null
      touchContainerRef.current = null
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [currentSectionIndex, transition, sections.length, navigateToIndex])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const targetId = activeSectionId ?? sections[0]?.id
    if (targetId) {
      window.history.replaceState(null, '', `/${targetId}`)
    }
  }, [activeSectionId, sections])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handlePopState = () => {
      const slug = window.location.pathname.replace(/^\//, '')
      const index = sections.findIndex((section) => section.id === slug)
      if (index >= 0) {
        navigateToIndex(index)
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [sections, navigateToIndex])

  const handlePanelAnimationEnd = (event) => {
    if (!transition) return
    const expectedAnimation = scrollDirection === 'down' ? 'panel-enter-down' : 'panel-enter-up'
    if (event.animationName !== expectedAnimation) return
    if (event.target !== event.currentTarget) return

    setCurrentSectionIndex(transition.to)
    setTransition(null)
  }

  const ActiveSectionComponent = activeSection ? SECTION_COMPONENTS[activeSection.id] : null
  const incomingSection = transition ? sections[transition.to] : null
  const IncomingSectionComponent = incomingSection ? SECTION_COMPONENTS[incomingSection.id] : null
  const totalSections = sections.length
  const progressIndex = transition ? transition.to : currentSectionIndex
  const progressPercent = totalSections
    ? Math.min(100, Math.max(0, ((progressIndex + 1) / totalSections) * 100))
    : 0

  return (
    <div className="page" ref={pageRef}>
      <div className="floating-symbols" aria-hidden="true">
        {['{', '}', '<', '>', '/', '*', '()', '< / >'].map((symbol, index) => (
          <span key={index} className={`symbol symbol-${index}`}>
            {symbol}
          </span>
        ))}
      </div>

      <Header
        sections={sections}
        activeSectionId={activeSectionId}
        onNavigate={(sectionId) => {
          const targetIndex = sections.findIndex((section) => section.id === sectionId)
          navigateToIndex(targetIndex)
        }}
      />

      <main className="hero" id="home">
        <div className="content-stage" style={{ '--panel-transition': `${TRANSITION_MS}ms` }}>
          {ActiveSectionComponent && activeSection && (
            <article
              key={activeSection.id}
              id={activeSection.id}
              className={`content-panel${
                transition
                  ? scrollDirection === 'down'
                    ? ' content-panel--exiting-up'
                    : ' content-panel--exiting-down'
                  : ' content-panel--active'
              }`}
            >
              <ActiveSectionComponent {...(sectionSpecificProps[activeSection.id] ?? {})} />
            </article>
          )}

          {IncomingSectionComponent && incomingSection && (
            <article
              key={incomingSection.id}
              id={incomingSection.id}
              className={`content-panel ${
                scrollDirection === 'down'
                  ? 'content-panel--entering-down'
                  : 'content-panel--entering-up'
              }`}
              onAnimationEnd={handlePanelAnimationEnd}
            >
              <IncomingSectionComponent {...(sectionSpecificProps[incomingSection.id] ?? {})} />
            </article>
          )}
        </div>
      </main>

      <SocialBar />
      <EmailBar email={emailAddress} />
      <div className="scroll-progress" aria-hidden="true">
        <span className="scroll-progress__fill" style={{ height: `${progressPercent}%` }} />
      </div>
    </div>
  )
}

export default App

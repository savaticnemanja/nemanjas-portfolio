import { useEffect, useRef } from 'react'

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

const usePageGlow = () => {
  const containerRef = useRef(null)
  const pointerTargetRef = useRef({ x: 50, y: 50 })
  const animationRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

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
    const container = containerRef.current
    if (!container) return undefined

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

  return containerRef
}

export default usePageGlow

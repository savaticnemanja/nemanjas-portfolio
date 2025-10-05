import { useEffect, useRef, useState } from 'react'

const useScrollProgress = () => {
  const ref = useRef(null)
  const [state, setState] = useState({ progress: 0, scrollable: false })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updateProgress = () => {
      const maxScroll = element.scrollHeight - element.clientHeight
      if (maxScroll <= 1) {
        setState({ progress: 0, scrollable: false })
        return
      }

      const progress = Math.min(100, Math.max(0, (element.scrollTop / maxScroll) * 100))
      setState({ progress, scrollable: true })
    }

    updateProgress()

    element.addEventListener('scroll', updateProgress, { passive: true })

    const resizeObserver = new ResizeObserver(() => {
      updateProgress()
    })

    resizeObserver.observe(element)

    return () => {
      element.removeEventListener('scroll', updateProgress)
      resizeObserver.disconnect()
    }
  }, [])

  return [ref, state]
}

export default useScrollProgress

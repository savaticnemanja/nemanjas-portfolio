'use client'

import { useEffect } from 'react'

/**
 * Inertial wheel scrolling: a notch of the wheel sets a target and the page
 * eases toward it, instead of arriving the instant the wheel stops.
 *
 * Only the wheel is taken over. Touch keeps the momentum the OS already gives
 * it — animating a scroll the finger is still driving reads as lag, not as
 * smoothness — and the keyboard, scrollbar drags and fragment jumps all stay
 * native. That last one matters most here: the nav's `#work`-style links are
 * fragment navigations, so they keep the browser's own smooth scroll and keep
 * honouring `scroll-padding-top` for the sticky header.
 *
 * Nothing else on the site has to know this is here. Lenis follows the
 * document's real scroll position rather than replacing it with a transform, so
 * the page genuinely scrolls every frame and the reveal observers, the header's
 * active-link tracking and the article reading progress all behave as before.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Trackpads and mice only, and only at desktop widths — a fine pointer on a
    // narrow viewport is usually a tablet with a keyboard case attached, where
    // the touchscreen is still the main way people scroll.
    const fine = window.matchMedia('(pointer: fine) and (min-width: 1024px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    let lenis = null
    let loading = false
    let mounted = true

    const wanted = () => mounted && fine.matches && !reduced.matches

    // Re-evaluated whenever either query flips, so plugging in a mouse or
    // turning on Reduce Motion takes effect without a reload.
    const sync = () => {
      if (!wanted()) {
        lenis?.destroy()
        lenis = null
        return
      }
      if (lenis || loading) return

      // Kept out of the main bundle: no first paint depends on it, and the
      // clients that never qualify for it never pay to download it.
      loading = true
      import('lenis').then(({ default: Lenis }) => {
        loading = false
        // Either query can have flipped — or the component unmounted — while
        // the chunk was in flight.
        if (!wanted()) return

        lenis = new Lenis({
          duration: 1.1,
          // easeOutExpo, the same curve as `--ease` and the CountUp counters.
          // Most of the distance is covered in the first few frames, so the page
          // answers the wheel immediately and then settles; an easing with a
          // slow start would just feel unresponsive.
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          // Hands the gesture to whatever scroller sits under the pointer — an
          // overflowing code block, the mobile nav panel — rather than smoothing
          // the page behind it while the thing being pointed at stays put.
          allowNestedScroll: true,
          autoRaf: true,
        })
      })
    }

    sync()
    fine.addEventListener('change', sync)
    reduced.addEventListener('change', sync)

    return () => {
      mounted = false
      fine.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return null
}

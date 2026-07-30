import { ImageResponse } from 'next/og'
import { SITE, OG_IMAGE } from '@lib/site'
import { projectTesseract } from '@lib/tesseract'

/**
 * The card every share of this site renders as. `twitter.card` is
 * summary_large_image, which without an image degrades to a bare text link.
 *
 * Generated at build time into a static PNG — nothing here reads request data,
 * so it costs one render per deploy rather than one per crawl. Satori supports
 * a flexbox subset only: every element needs an explicit `display: flex`, and
 * there is no cascade to lean on.
 */
/* Shared with OG_IMAGE, which is what routes declaring their own `openGraph`
   hand to Next. Two copies of this string is how they came to disagree. */
export const alt = OG_IMAGE.alt
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* Right of the type, on the axis the second bloom already lights. Computed once
   at module load rather than per render — the pose is fixed, so this is a
   constant that happens to be expensive to write out by hand.

   `box` is the projection's input scale, not the drawn size: the figure comes
   out at roughly two thirds of it, so 430 draws about 288×280. That clears the
   headline's right edge and the 88px page margin.

   Sat on the canvas's own centre line first, which put the lowest vertex about
   18px under the rule above the role — far enough through it to look like a
   near miss rather than a crossing. Raised to share the headline's band and
   finish just above the rule instead. */
const FIGURE = projectTesseract({ cx: 940, cy: 288, box: 430 })

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#000000',
          // The ambient blooms from the site itself, flattened to two gradients.
          backgroundImage:
            'radial-gradient(900px 480px at 10% -12%, rgba(200,255,0,0.16), transparent 60%),' +
            'radial-gradient(700px 400px at 94% 110%, rgba(200,255,0,0.10), transparent 62%)',
          padding: '0 88px',
          position: 'relative',
        }}
      >
        {/* Out of flow and first in paint order, so the column below lays out as
            if it were not here and the type is never behind a stroke. Satori has
            no z-index worth relying on; document order is the ordering. */}
        {/* viewBox and CSS size both, and both the full canvas. Given only the
            width/height attributes Satori sizes the element from its own layout
            and scales the drawing to fit, which put the figure off the right and
            bottom edges; with the two agreeing, the projection's coordinates are
            canvas pixels and nothing is resampled. */}
        <svg
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
          }}
        >
          {FIGURE.edges.map((e, i) => (
            <line
              key={`e${i}`}
              x1={e.x1.toFixed(2)}
              y1={e.y1.toFixed(2)}
              x2={e.x2.toFixed(2)}
              y2={e.y2.toFixed(2)}
              stroke="#C8FF00"
              strokeOpacity={e.opacity.toFixed(3)}
              strokeWidth={e.width.toFixed(2)}
              strokeLinecap="round"
            />
          ))}
          {FIGURE.vertices.map((p, i) => (
            <circle
              key={`v${i}`}
              cx={p.x.toFixed(2)}
              cy={p.y.toFixed(2)}
              r={p.r.toFixed(2)}
              fill="#C8FF00"
              fillOpacity={p.opacity.toFixed(3)}
            />
          ))}
        </svg>

        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <svg width="58" height="58" viewBox="0 0 24 24">
            <rect
              x="2.5" y="2.5" width="19" height="19" rx="5"
              fill="none" stroke="#C8FF00" strokeWidth="2.5"
            />
            <path d="M8 16.5 16 7.5" stroke="#C8FF00" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div style={{ display: 'flex', fontSize: 38, fontWeight: 600, color: '#F7F4EF' }}>
            nemanjas
            <span style={{ color: '#C8FF00' }}>.dev</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 46,
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#F7F4EF',
          }}
        >
          I build software
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#F7F4EF',
          }}
        >
          that&nbsp;<span style={{ color: '#C8FF00' }}>ships.</span>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 46,
            paddingTop: 28,
            borderTop: '1px solid rgba(255,255,255,0.16)',
            fontSize: 26,
            color: '#8F8F8F',
          }}
        >
          {SITE.role}
        </div>
      </div>
    ),
    size,
  )
}

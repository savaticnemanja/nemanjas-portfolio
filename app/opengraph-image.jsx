import { ImageResponse } from 'next/og'
import { SITE, OG_IMAGE } from '@lib/site'

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
        }}
      >
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
          {SITE.role} · Novi Sad, Serbia
        </div>
      </div>
    ),
    size,
  )
}

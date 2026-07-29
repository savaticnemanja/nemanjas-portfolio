import { ImageResponse } from 'next/og'
import { getAllSlugs, getPostBySlug } from '@lib/posts'
import { SITE } from '@lib/site'

/**
 * Per-article share card, so an article posted to Slack or LinkedIn shows its
 * own headline rather than the site's. One static PNG per post at build time.
 *
 * Satori supports a flexbox subset only: every element needs an explicit
 * `display: flex`, and there is no cascade to lean on.
 */
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Article on nemanjas.dev'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default async function ArticleImage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const title = post?.title ?? 'Article'

  // No line clamping in Satori, so the type size steps down instead of
  // overflowing the card.
  const fontSize = title.length > 62 ? 56 : title.length > 38 ? 66 : 78

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          backgroundImage:
            'radial-gradient(900px 480px at 10% -12%, rgba(200,255,0,0.16), transparent 60%),' +
            'radial-gradient(700px 400px at 94% 110%, rgba(200,255,0,0.10), transparent 62%)',
          padding: '72px 88px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="44" height="44" viewBox="0 0 24 24">
            <rect
              x="2.5" y="2.5" width="19" height="19" rx="5"
              fill="none" stroke="#C8FF00" strokeWidth="2.5"
            />
            <path d="M8 16.5 16 7.5" stroke="#C8FF00" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 600, color: '#F7F4EF' }}>
            nemanjas
            <span style={{ color: '#C8FF00' }}>.dev</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#F7F4EF',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            paddingTop: 28,
            borderTop: '1px solid rgba(255,255,255,0.16)',
            fontSize: 24,
            color: '#8F8F8F',
          }}
        >
          <span style={{ color: '#C8FF00' }}>{SITE.author}</span>
          {post?.readingTime ? <span>· {post.readingTime} min read</span> : null}
        </div>
      </div>
    ),
    size,
  )
}

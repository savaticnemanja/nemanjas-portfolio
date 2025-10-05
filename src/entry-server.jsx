import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import BlogArticle from './pages/BlogArticle'
import { getPostBySlug, isBlogSlug } from './content/posts'
import './i18n'

const defaultTitle = 'Nemanja Savatic · Software Engineer'
const defaultDescription =
  'Software engineer focused on inclusive, accessible web experiences and thoughtful interface design.'

/**
 * @param {string} url
 */
export function render(url) {
  const slug = isBlogSlug(url)

  if (slug) {
    const post = getPostBySlug(slug)

    if (!post) {
      const html = renderToString(
        <StrictMode>
          <BlogArticle slug={slug} />
        </StrictMode>,
      )

      return {
        html,
        head: buildNotFoundHead(),
        status: 404,
      }
    }

    const html = renderToString(
      <StrictMode>
        <BlogArticle slug={slug} initialPost={post} />
      </StrictMode>,
    )

    return {
      html,
      head: buildArticleHead(post),
      status: 200,
    }
  }

  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )

  return {
    html,
    head: buildDefaultHead(),
    status: 200,
  }
}

function buildDefaultHead() {
  return `
    <title>${defaultTitle}</title>
    <meta name="description" content="${escapeAttr(defaultDescription)}" />
    <meta name="robots" content="index,follow" />
    <meta property="og:title" content="${escapeAttr(defaultTitle)}" />
    <meta property="og:description" content="${escapeAttr(defaultDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(defaultTitle)}" />
    <meta name="twitter:description" content="${escapeAttr(defaultDescription)}" />
  `
}

function buildArticleHead(post) {
  const title = `${post.title} · Blog`
  const description = post.description ?? post.excerpt ?? defaultDescription
  const canonical = `/blog/${post.slug}/`

  return `
    <title>${escapeAttr(title)}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:locale" content="en_US" />
    ${post.date ? `<meta property="article:published_time" content="${escapeAttr(post.date)}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
  `
}

function buildNotFoundHead() {
  const title = 'Article not found · Blog'
  const description = 'The requested article could not be located.'
  return `
    <title>${escapeAttr(title)}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <meta name="robots" content="noindex" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
  `
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

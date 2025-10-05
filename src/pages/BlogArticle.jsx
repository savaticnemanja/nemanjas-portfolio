import { useEffect, useMemo } from 'react'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import markdown from 'highlight.js/lib/languages/markdown'
import 'highlight.js/styles/atom-one-dark.css'

import { getPostBySlug } from '../content/posts'
import '../App.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('svg', xml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('markdown', markdown)
hljs.registerAliases(['jsx', 'tsx'], { languageName: 'javascript' })
hljs.registerAliases(['shell', 'sh'], { languageName: 'bash' })

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const formatDate = (value) => {
  if (!value) return null
  const [year, month, day] = value.split('-').map((part) => Number(part))
  if (!year || !month || !day) return value
  const monthName = monthNames[month - 1]
  return `${monthName} ${day}, ${year}`
}

const BlogArticle = ({ slug, initialPost }) => {
  const post = useMemo(() => initialPost ?? getPostBySlug(slug), [slug, initialPost])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlHeight = document.documentElement.style.height
    const previousBodyHeight = document.body.style.height

    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'
    document.documentElement.style.height = 'auto'
    document.body.style.height = 'auto'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.height = previousHtmlHeight
      document.body.style.height = previousBodyHeight
    }
  }, [])

  useEffect(() => {
    if (post) {
      document.title = `${post.title} · Blog`
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', post.description ?? post.excerpt ?? '')
      }
    } else {
      document.title = 'Article not found · Blog'
    }
  }, [post])

  useEffect(() => {
    if (!post) return
    const contentRoot = document.querySelector('.blog-article-page__content')
    if (!contentRoot) return

    const codeBlocks = contentRoot.querySelectorAll('pre')
    codeBlocks.forEach((block) => {
      if (!(block instanceof HTMLElement)) return
      if (block.dataset.enhanced === 'true') return

      const code = block.querySelector('code')
      if (code instanceof HTMLElement) {
        hljs.highlightElement(code)
      }

      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'code-copy-button'
      button.textContent = 'Copy'

      const showState = (message, timeout = 1500, buttonLabel = 'Copy') => {
        button.dataset.state = 'active'
        button.textContent = message
        window.setTimeout(() => {
          button.dataset.state = 'idle'
          button.textContent = buttonLabel
        }, timeout)
      }

      const handleCopy = async () => {
        const text = code?.innerText ?? ''
        if (!text) {
          showState('Nothing to copy')
          return
        }

        try {
          if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(text)
          } else {
            const textarea = document.createElement('textarea')
            textarea.value = text
            textarea.setAttribute('readonly', '')
            textarea.style.position = 'absolute'
            textarea.style.left = '-9999px'
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
          }
          showState('Copied', 1500, 'Copy')
        } catch (error) {
          showState('Copy failed', 1800)
        }
      }

      button.addEventListener('click', handleCopy)

      const toolbar = document.createElement('div')
      toolbar.className = 'code-copy'
      toolbar.appendChild(button)

      block.appendChild(toolbar)
      block.dataset.enhanced = 'true'
    })
  }, [post])

  if (!post) {
    return (
      <div className="blog-article-page">
        <div className="blog-article-page__frame">
          <a className="blog-article-page__back" href="/blog/">
            ← Back to blog
          </a>
          <div className="blog-article-page__body">
            <h1 className="blog-article-page__title">Article not found</h1>
            <p className="blog-article-page__description">
              The article you're looking for couldn't be located. Return to the blog overview to browse published posts.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-article-page">
      <div className="blog-article-page__frame">
        <a className="blog-article-page__back" href="/blog/">
          ← Back to blog
        </a>
        <header className="blog-article-page__header">
          <p className="blog-article-page__meta">
            {formatDate(post.date)}
            {post.readingTime ? ` · ${post.readingTime} min read` : ''}
          </p>
          <h1 className="blog-article-page__title">{post.title}</h1>
          {post.description ? (
            <p className="blog-article-page__description">{post.description}</p>
          ) : null}
          {post.tags?.length ? (
            <ul className="blog-article-page__tags">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
        </header>

        <article
          className="blog-article-page__content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  )
}

export default BlogArticle

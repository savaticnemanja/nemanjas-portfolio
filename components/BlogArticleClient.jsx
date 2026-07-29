'use client'

import { useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerAliases(['jsx', 'tsx'], { languageName: 'javascript' })
hljs.registerAliases(['shell', 'sh'], { languageName: 'bash' })

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const formatDate = (value) => {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return `${monthNames[month - 1]} ${day}, ${year}`
}

const BlogArticleClient = ({ post }) => {
  const barRef = useRef(null)
  const bodyRef = useRef(null)
  const frame = useRef(0)

  // The bar is written to directly rather than held in state: this fires on
  // every scroll frame, and a re-render per frame to move one element is a
  // waste of the main thread.
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const read = () => {
      frame.current = 0
      const root = document.scrollingElement ?? document.documentElement
      const max = Math.max(0, root.scrollHeight - root.clientHeight)
      bar.style.transform = `scaleX(${max > 0 ? root.scrollTop / max : 0})`
    }
    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  useEffect(() => {
    const root = bodyRef.current
    if (!root) return
    root.querySelectorAll('pre code').forEach((block) => {
      if (block instanceof HTMLElement) hljs.highlightElement(block)
    })
    // A code block that scrolls sideways can only be reached with a pointer
    // unless it can take focus — on a phone every one of these overflows.
    root.querySelectorAll('pre').forEach((pre) => {
      pre.tabIndex = 0
    })
  }, [post])

  if (!post) {
    return (
      <div className="page">
        <div className="article">
          <a href="/#blog" className="article-back">Back to writing</a>
          <header className="article-header">
            <h1 className="article-title">Article not found</h1>
          </header>
        </div>
      </div>
    )
  }

  return (
    <>
      <div ref={barRef} className="progress" aria-hidden="true" />

      <div className="page">
        <article className="article">
          <a href="/#blog" className="article-back">Back to writing</a>

          <header className="article-header">
            <p className="article-meta">
              {formatDate(post.date) && (
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              )}
              {post.date && post.readingTime ? <i>/</i> : null}
              {post.readingTime ? <span>{post.readingTime} min read</span> : null}
            </p>

            <h1 className="article-title">{post.title}</h1>

            {post.tags?.length ? (
              <div className="article-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            ) : null}
          </header>

          {/* Rendered by lib/posts.js from local markdown; the renderer
              escapes everything it does not emit itself. */}
          <div
            ref={bodyRef}
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>
    </>
  )
}

export default BlogArticleClient

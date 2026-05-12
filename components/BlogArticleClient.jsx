'use client'

import { useEffect, useState } from 'react'
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
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const root = document.scrollingElement ?? document.documentElement
      const maxScroll = Math.max(0, root.scrollHeight - root.clientHeight)
      setProgress(maxScroll > 0 ? (root.scrollTop / maxScroll) * 100 : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  useEffect(() => {
    if (!post) return
    const root = document.querySelector('.article-body')
    if (!root) return
    root.querySelectorAll('pre code').forEach((block) => {
      if (block instanceof HTMLElement) hljs.highlightElement(block)
    })
  }, [post])

  if (!post) {
    return (
      <main className="article-page">
        <a href="/" className="article-back">Home</a>
        <h1 className="article-title">Article not found</h1>
      </main>
    )
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: `${progress}%`,
          background: 'var(--lime)',
          zIndex: 200,
          transition: 'width 0.1s linear',
        }}
      />

      <main className="article-page">
        <a href="/" className="article-back">Back to portfolio</a>

        <div className="article-meta">
          {formatDate(post.date) && <span>{formatDate(post.date)}</span>}
          {post.readingTime && (
            <>
              <span style={{ color: 'var(--lime)' }}>·</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>

        <h1 className="article-title">{post.title}</h1>

        {post.tags?.length ? (
          <div className="article-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="article-tag">{tag}</span>
            ))}
          </div>
        ) : null}

        <article
          className="article-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </main>
    </>
  )
}

export default BlogArticleClient

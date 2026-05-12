'use client'

import { useMemo, useState } from 'react'
import content from '@content/en'

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

const BlogSection = ({ posts }) => {
  const { blog } = content
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState('all')

  const availableTags = useMemo(
    () =>
      Array.from(
        new Set(posts.flatMap((p) => (Array.isArray(p.tags) ? p.tags.filter(Boolean) : []))),
      ).sort((a, b) => a.localeCompare(b)),
    [posts],
  )

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        if (activeTag !== 'all' && !post.tags?.includes(activeTag)) return false
        if (!normalizedQuery) return true
        const haystack = [post.title, post.description, post.excerpt, ...(post.tags ?? [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(normalizedQuery)
      }),
    [posts, activeTag, normalizedQuery],
  )

  return (
    <>
      <div className="section-header">
        <div>
          <div className="section-label">Writing</div>
          <div className="section-title">From the <em>Blog</em></div>
        </div>
      </div>

      {posts.length > 0 ? (
        <>
          <div className="blog-controls">
            <div className="blog-controls-row">
              <input
                id="blog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles…"
                className="blog-search-input"
                aria-label={blog.searchLabel}
              />
            </div>
            {availableTags.length > 0 && (
              <div className="blog-controls-row" role="group" aria-label={blog.filtersLabel}>
                <button
                  type="button"
                  className="blog-filter-btn"
                  data-active={activeTag === 'all'}
                  onClick={() => setActiveTag('all')}
                >
                  All
                </button>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="blog-filter-btn"
                    data-active={activeTag === tag}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="blog-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, idx) => (
                <article key={post.slug} className="blog-card">
                  <div className="blog-card-number">
                    0{idx + 1} {post.readingTime ? `· ${post.readingTime} min read` : ''}
                  </div>
                  <div className="blog-card-title">{post.title}</div>
                  {post.date && (
                    <div className="blog-card-meta">{formatDate(post.date)}</div>
                  )}
                  {post.tags?.length ? (
                    <div className="blog-card-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-card-tag">{tag}</span>
                      ))}
                    </div>
                  ) : null}
                  {(post.description ?? post.excerpt) && (
                    <p className="blog-card-desc">{post.description ?? post.excerpt}</p>
                  )}
                  <a href={post.url} className="blog-card-link">{blog.readMore}</a>
                </article>
              ))
            ) : (
              <div className="blog-empty">
                <div className="blog-card-title" style={{ marginBottom: '8px' }}>
                  {blog.emptyFilteredTitle}
                </div>
                <p>{blog.emptyFilteredDescription}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="blog-empty">
          <div className="blog-card-title" style={{ marginBottom: '8px' }}>{blog.emptyTitle}</div>
          <p>{blog.emptyDescription}</p>
        </div>
      )}
    </>
  )
}

export default BlogSection

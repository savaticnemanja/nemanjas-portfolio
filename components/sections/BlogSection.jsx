'use client'

import { useMemo, useState } from 'react'
import content from '@content/en'
import { Reveal, Stagger } from '@components/motion'

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
      <Reveal className="section-header">
        <div>
          <p className="eyebrow">04 — Writing</p>
          <h2 id="blog-heading" className="section-title">
            From the <em>blog</em>
          </h2>
        </div>
        <p className="section-note">
          Notes on the things I had to work out the hard way, written down so the
          next person doesn&apos;t have to.
        </p>
      </Reveal>

      {posts.length > 0 ? (
        <>
          <Reveal className="blog-controls">
            <div className="blog-controls-row">
              <input
                id="blog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles…"
                className="blog-search"
                aria-label={blog.searchLabel}
              />
            </div>
            {availableTags.length > 0 && (
              <div className="blog-controls-row" role="group" aria-label={blog.filtersLabel}>
                <button
                  type="button"
                  className="blog-filter"
                  aria-pressed={activeTag === 'all'}
                  onClick={() => setActiveTag('all')}
                >
                  All
                </button>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="blog-filter"
                    aria-pressed={activeTag === tag}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          {filteredPosts.length > 0 ? (
            /* Keyed on the filter so a new set animates in rather than
               swapping under a container that has already been revealed. */
            <Stagger key={`${activeTag}:${normalizedQuery}`} className="blog-grid">
              {filteredPosts.map((post, idx) => (
                <article key={post.slug} className="blog-card">
                  <p className="blog-card-meta">
                    <span className="num">{String(idx + 1).padStart(2, '0')}</span>
                    {post.readingTime ? (
                      <>
                        <i>/</i>
                        <span>{post.readingTime} min read</span>
                      </>
                    ) : null}
                  </p>

                  <h3 className="blog-card-title">{post.title}</h3>

                  {post.date && (
                    <p className="blog-card-meta" style={{ marginTop: '0.5rem' }}>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </p>
                  )}

                  {(post.description ?? post.excerpt) && (
                    <p className="blog-card-desc">{post.description ?? post.excerpt}</p>
                  )}

                  {post.tags?.length ? (
                    <div className="blog-card-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  ) : null}

                  <a href={post.url} className="blog-card-link">
                    {blog.readMore}
                  </a>
                </article>
              ))}
            </Stagger>
          ) : (
            <div className="blog-empty">
              <h3>{blog.emptyFilteredTitle}</h3>
              <p>{blog.emptyFilteredDescription}</p>
            </div>
          )}
        </>
      ) : (
        <div className="blog-empty">
          <h3>{blog.emptyTitle}</h3>
          <p>{blog.emptyDescription}</p>
        </div>
      )}
    </>
  )
}

export default BlogSection

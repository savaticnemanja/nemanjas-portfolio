import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getPosts } from '../../content/posts'

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

const blogPosts = getPosts()
const availableTags = Array.from(
  new Set(
    blogPosts.flatMap((post) => {
      if (!Array.isArray(post.tags)) return []
      return post.tags.filter(Boolean)
    }),
  ),
).sort((a, b) => a.localeCompare(b))

const formatDate = (value) => {
  if (!value) return null
  const [year, month, day] = value.split('-').map((part) => Number(part))
  if (!year || !month || !day) return value
  const monthName = monthNames[month - 1]
  return `${monthName} ${day}, ${year}`
}

const BlogSection = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState('all')

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (activeTag !== 'all') {
        if (!post.tags?.includes(activeTag)) {
          return false
        }
      }

      if (!normalizedQuery) return true

      const haystack = [post.title, post.description, post.excerpt, ...(post.tags ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [activeTag, normalizedQuery])

  const hasPosts = blogPosts.length > 0

  return (
    <div className="panel">
      <p className="panel-eyebrow">{t('blog.eyebrow')}</p>
      <h2 className="panel-title">{t('blog.title')}</h2>
      {hasPosts ? (
        <>
          <div className="blog-controls">
            <div className="blog-controls__search">
              <label className="blog-search-label" htmlFor="blog-search">
                {t('blog.searchLabel')}
              </label>
              <input
                id="blog-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t('blog.searchPlaceholder')}
                className="blog-search-input"
              />
            </div>

            {availableTags.length ? (
              <div className="blog-controls__tags" role="group" aria-label={t('blog.filtersLabel')}>
                <button
                  type="button"
                  className="blog-tag-button"
                  data-active={activeTag === 'all'}
                  onClick={() => setActiveTag('all')}
                >
                  {t('blog.filtersAll')}
                </button>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="blog-tag-button"
                    data-active={activeTag === tag}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="panel-grid panel-grid--blog">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="panel-card panel-card--project panel-card--article">
                <header className="panel-card__header">
                  <h3>{post.title}</h3>
                  <p className="panel-meta">
                    {formatDate(post.date)}
                    {post.readingTime ? ` · ${post.readingTime} min read` : ''}
                  </p>
                </header>
                {post.tags?.length ? (
                  <ul className="panel-tag-list">
                    {post.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                ) : null}
                <p className="panel-description">{post.description ?? post.excerpt}</p>
                <a className="panel-link" href={post.url}>
                  {t('blog.readMore')}
                </a>
              </article>
            ))}
            {filteredPosts.length === 0 && (
              <article className="panel-card panel-card--project panel-card--article">
                <h3>{t('blog.emptyFilteredTitle')}</h3>
                <p className="panel-description">{t('blog.emptyFilteredDescription')}</p>
              </article>
            )}
          </div>
        </>
      ) : (
        <div className="panel-grid panel-grid--blog">
          <article className="panel-card panel-card--project panel-card--article">
            <h3>{t('blog.emptyTitle')}</h3>
            <p className="panel-description">{t('blog.emptyDescription')}</p>
          </article>
        </div>
      )}
    </div>
  )
}

export default BlogSection

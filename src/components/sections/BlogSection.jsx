import { useTranslation } from 'react-i18next'

const BlogSection = () => {
  const { t } = useTranslation()
  const posts = t('blog.posts', { returnObjects: true })
  const safePosts = Array.isArray(posts) ? posts : []

  return (
    <div className="panel">
      <p className="panel-eyebrow">{t('blog.eyebrow')}</p>
      <h2 className="panel-title">{t('blog.title')}</h2>
      <div className="panel-grid panel-grid--blog">
        {safePosts.map((post, index) => (
          <article key={post.href ?? index} className="panel-card panel-card--project">
            <h3>{post.title}</h3>
            <p className="panel-description">{post.description}</p>
            {post.href ? (
              <a
                className="panel-link"
                href={post.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {post.action}
              </a>
            ) : (
              <span className="panel-link" aria-hidden="true">
                {post.action}
              </span>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

export default BlogSection

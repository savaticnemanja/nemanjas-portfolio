import './index.css'
import './i18n'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import BlogArticle from './pages/BlogArticle'
import { getPostBySlug, isBlogSlug } from './content/posts'

const container = document.getElementById('root')

const slug = isBlogSlug(window.location.pathname)

if (slug) {
  const post = getPostBySlug(slug)
  hydrateRoot(
    container,
    <StrictMode>
      <BlogArticle slug={slug} initialPost={post} />
    </StrictMode>,
  )
} else {
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

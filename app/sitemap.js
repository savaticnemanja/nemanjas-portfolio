import { getPosts } from '@lib/posts'
import { SITE } from '@lib/site'

/**
 * `lastModified` comes from each post's own front matter rather than from
 * `new Date()`. Stamping every URL with the build time tells a crawler that
 * every article changed on every deploy, and lastModified is the one hint here
 * that search engines actually act on.
 */
export default function sitemap() {
  // The floor for pages whose content only changes when the site is rebuilt.
  const built = new Date()
  const posts = getPosts()

  const newestPost = posts
    .map((post) => (post.date ? new Date(post.date) : null))
    .filter(Boolean)
    .sort((a, b) => b - a)[0]

  return [
    {
      url: SITE.url,
      lastModified: newestPost ?? built,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...posts.map((post) => ({
      // A slug comes from a directory name, which may hold characters that are
      // not legal in a <loc> unescaped — a space is enough to make the whole
      // sitemap invalid XML.
      url: encodeURI(`${SITE.url}${post.url}`),
      lastModified: post.date ? new Date(post.date) : built,
      changeFrequency: 'yearly',
      priority: 0.7,
    })),
    {
      url: `${SITE.url}/llm-info`,
      lastModified: built,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}

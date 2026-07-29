import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug, toArticleView } from '@lib/posts'
import BlogArticleClient from '@components/BlogArticleClient'
import { SITE, appUrl } from '@lib/site'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const description = post.description ?? post.excerpt ?? ''

  return {
    title: post.title,
    description,
    alternates: { canonical: post.url },
    keywords: post.tags,
    authors: [{ name: SITE.author, url: SITE.url }],
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: appUrl(post.url),
      siteName: SITE.name,
      locale: SITE.locale,
      publishedTime: post.date ?? undefined,
      authors: [SITE.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
  }
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description ?? post.excerpt ?? '',
    datePublished: post.date ?? undefined,
    dateModified: post.date ?? undefined,
    keywords: post.tags?.join(', ') || undefined,
    wordCount: post.content ? post.content.trim().split(/\s+/).length : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': appUrl(post.url) },
    author: { '@type': 'Person', name: SITE.author, url: SITE.url },
    publisher: { '@type': 'Person', name: SITE.author, url: SITE.url },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* The rendered body only. `content` is the same article again as raw
          markdown, read here for the word count and needed no further than
          this function. */}
      <BlogArticleClient post={toArticleView(post)} />
    </>
  )
}

import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug } from '@lib/posts'
import BlogArticleClient from '@components/BlogArticleClient'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} · Blog`,
    description: post.description ?? post.excerpt ?? '',
  }
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  return <BlogArticleClient post={post} />
}

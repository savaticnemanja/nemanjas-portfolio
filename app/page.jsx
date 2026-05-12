import { getPosts } from '@lib/posts'
import PortfolioShell from '@components/PortfolioShell'

export default function HomePage() {
  const posts = getPosts()
  return <PortfolioShell posts={posts} />
}

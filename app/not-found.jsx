export const metadata = {
  title: 'Page not found',
  // A 404 body has nothing worth indexing, and every wrong URL would otherwise
  // be a candidate index entry.
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="page notfound">
      <p className="eyebrow">Error 404</p>
      <h1 className="plain-title">This page doesn&apos;t exist.</h1>
      <p className="plain-lead">
        The link is either wrong or the page has moved. Everything that is still here
        is one click away.
      </p>
      <p style={{ marginTop: '2.5rem' }}>
        <a href="/" className="btn btn--outline">← Back to portfolio</a>
      </p>
    </div>
  )
}

import content from '@content/en'

const YEAR = new Date().getFullYear()

const SiteFooter = () => {
  const { contact } = content

  return (
    <footer className="footer">
      <div className="page footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="logo">
              <svg className="logo-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <rect
                  x="2.5" y="2.5" width="19" height="19" rx="5"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                />
                <path
                  d="M8 16.5 16 7.5"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                />
              </svg>
              <span className="logo-word">nemanjas<span>.dev</span></span>
            </a>
            <p className="footer-tagline">
              Senior software engineer in {content.profile.location}, building
              full-stack products across fintech and the cloud.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <div className="footer-col">
              <h2>Site</h2>
              <ul>
                <li><a href="/#work">Work</a></li>
                <li><a href="/#about">About</a></li>
                <li><a href="/#experience">Experience</a></li>
                <li><a href="/#blog">Blog</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h2>Elsewhere</h2>
              <ul>
                <li>
                  <a href={`mailto:${contact.email}`}>Email</a>
                </li>
                <li>
                  <a href={contact.githubHref} target="_blank" rel="noreferrer">GitHub</a>
                </li>
                <li>
                  <a href={contact.linkedinHref} target="_blank" rel="noreferrer">LinkedIn</a>
                </li>
                <li>
                  <a href={`${contact.calOrigin}/${contact.calLink}`} target="_blank" rel="noreferrer">
                    Book a call
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h2>Colophon</h2>
              <ul>
                <li><a href="/llm-info">Built with AI</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>&copy; {YEAR} Nemanja Savatic</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter

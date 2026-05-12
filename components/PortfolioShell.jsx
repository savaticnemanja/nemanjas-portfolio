import WorkSection from '@components/sections/WorkSection'
import AboutSection from '@components/sections/AboutSection'
import ExperienceSection from '@components/sections/ExperienceSection'
import BlogSection from '@components/sections/BlogSection'
import ContactSection from '@components/sections/ContactSection'

const marqueeItems = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL',
  'Docker', 'AWS', 'Rust', 'System Design', 'API Architecture',
]

const PortfolioShell = ({ posts }) => (
  <>
    {/* ── HERO ──────────────────────────────────────── */}
    <div className="hero">
      <div className="hero-watermark" aria-hidden="true">N</div>

      <div className="hero-left">
        <div className="hero-tag">Software Developer · Solution Implementer</div>
        <div className="hero-name">nemanjas</div>
        <div className="hero-name-dev">.dev</div>
        <div className="hero-rule" />
        <p className="hero-desc">
          I build software that solves real problems.<br />
          From architecture to deployment — full ownership,<br />
          clean code, and solutions that actually ship.
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn-primary">View Work</a>
          <a href="#contact" className="btn-ghost">Get in touch</a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-stats-card">
          <div className="stat-row">
            <div className="stat-num">5<span>+</span></div>
            <div className="stat-label">Years of<br />Experience</div>
          </div>
          <div className="stat-row">
            <div className="stat-num">32<span>+</span></div>
            <div className="stat-label">Projects<br />Shipped</div>
          </div>
          <div className="stat-row">
            <div className="stat-num">∞</div>
            <div className="stat-label">Problems<br />Solved</div>
          </div>
          <div className="stat-badge">Open to new projects</div>
        </div>
      </div>
    </div>

    {/* ── MARQUEE ───────────────────────────────────── */}
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <div key={i} className="marquee-item">
            {item} <span>·</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── SECTIONS ──────────────────────────────────── */}
    <div id="work" className="section">
      <WorkSection />
    </div>

    <div id="about" className="section section--bordered">
      <AboutSection />
    </div>

    <div id="experience" className="section section--bordered">
      <ExperienceSection />
    </div>

    <div id="blog" className="section section--bordered">
      <BlogSection posts={posts} />
    </div>

    <ContactSection />

    {/* ── FOOTER ────────────────────────────────────── */}
    <footer className="site-footer">
      <div className="footer-logo">nemanjas<span>.dev</span></div>
      <div className="footer-copy">© 2026 · All rights reserved</div>
      <a href="#" className="footer-back">Back to top ↑</a>
    </footer>
  </>
)

export default PortfolioShell

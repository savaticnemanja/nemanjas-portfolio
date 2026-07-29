import content from '@content/en'
import { Reveal, CountUp, PulseDot } from '@components/motion'
import WorkSection from '@components/sections/WorkSection'
import AboutSection from '@components/sections/AboutSection'
import ExperienceSection from '@components/sections/ExperienceSection'
import BlogSection from '@components/sections/BlogSection'
import ContactSection from '@components/sections/ContactSection'

const MARQUEE = [
  'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js', '.NET Core',
  'PostgreSQL', 'OracleDB', 'Docker', 'AWS', 'Jenkins', 'System Design',
]

const PortfolioShell = ({ posts }) => (
  <>
    {/* ── HERO ──────────────────────────────────────────────────────────── */}
    <section className="hero">
      <div className="hero-watermark" aria-hidden="true">NS</div>

      <div className="page hero-inner">
        <Reveal>
          <p className="hero-status">
            <PulseDot />
            Open to remote &amp; hybrid roles
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="hero-headline">
            I build software that <em>ships.</em>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="hero-desc">
            Senior software engineer, 5+ years across the frontend, backend and cloud.
            Currently building the market-leading anti-money-laundering platform for a
            top-tier fintech client.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="hero-actions">
            <a href="#work" className="btn btn--primary">View work →</a>
            <a href="#contact" className="btn btn--outline">Get in touch</a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <dl className="hero-stats">
            <div className="card stat">
              <dt>Years shipping</dt>
              <dd>
                <CountUp value={5} /><em>+</em>
                <span className="stat-sub">Frontend, backend and cloud</span>
              </dd>
            </div>
            <div className="card stat">
              <dt>Projects shipped</dt>
              <dd>
                <CountUp value={32} /><em>+</em>
                <span className="stat-sub">Client work, SaaS and side projects</span>
              </dd>
            </div>
            <div className="card stat">
              <dt>Problems solved</dt>
              <dd>
                <span className="num">∞</span>
                <span className="stat-sub">Still counting</span>
              </dd>
            </div>
            <div className="card stat">
              <dt>Availability</dt>
              <dd>
                <em>Open</em>
                <span className="stat-sub">{content.profile.availability}</span>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="hero-scroll" aria-hidden="true">
            <span>Scroll</span>
            <span>↓</span>
          </p>
        </Reveal>
      </div>
    </section>

    {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <i>/</i>
          </span>
        ))}
      </div>
    </div>

    {/* ── SECTIONS ──────────────────────────────────────────────────────── */}
    <section id="work" className="section" aria-labelledby="work-heading">
      <div className="page"><WorkSection /></div>
    </section>

    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="page"><AboutSection /></div>
    </section>

    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="page"><ExperienceSection /></div>
    </section>

    <section id="blog" className="section" aria-labelledby="blog-heading">
      <div className="page"><BlogSection posts={posts} /></div>
    </section>

    <ContactSection />
  </>
)

export default PortfolioShell

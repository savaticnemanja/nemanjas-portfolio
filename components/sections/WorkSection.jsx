import content from '@content/en'

const WorkSection = () => {
  const { work } = content
  const [featured, ...rest] = work.projects

  return (
    <>
      <div className="section-header" data-reveal>
        <div>
          <div className="section-label">Selected Work</div>
          <div className="section-title">Recent <em>Projects</em></div>
        </div>
      </div>

      <div className="projects-grid">
        {/* Featured card */}
        <a
          href={featured.href}
          target="_blank"
          rel="noreferrer"
          className="project-card project-card--featured"
          data-reveal
        >
          <span className="project-arrow" aria-hidden="true">↗</span>
          <div>
            <div className="project-number">01 · Featured</div>
            <div className="project-title">{featured.title}</div>
            <p className="project-desc">{featured.description}</p>
            {featured.tech?.length ? (
              <div className="project-tags">
                {featured.tech.map((t) => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
              </div>
            ) : null}
            <span className="project-cta">Visit project</span>
          </div>
          <div className="project-preview" aria-hidden="true">
            <div className="preview-bar" />
            <div className="preview-dots">
              <div className="preview-dot" />
              <div className="preview-dot" />
              <div className="preview-dot" />
            </div>
            <div className="preview-label">{featured.title.split(' ')[0]}</div>
            <div className="preview-sublabel">
              {featured.title.split(' ').slice(1).join(' ') || 'Project'}
            </div>
          </div>
        </a>

        {/* Regular cards */}
        {rest.map((project, idx) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="project-card"
            data-reveal
            data-delay={String((idx % 2) + 1)}
          >
            <span className="project-arrow" aria-hidden="true">↗</span>
            <div className="project-number">0{idx + 2}</div>
            <div className="project-title">{project.title}</div>
            <p className="project-desc">{project.description}</p>
            {project.tech?.length ? (
              <div className="project-tags">
                {project.tech.map((t) => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
              </div>
            ) : null}
            <span className="project-cta">Visit project</span>
          </a>
        ))}
      </div>
    </>
  )
}

export default WorkSection

import content from '@content/en'
import ProjectCard from '@components/ProjectCard'
import { Reveal, Stagger } from '@components/motion'

const index = (n) => String(n).padStart(2, '0')

const WorkSection = () => {
  const { work } = content
  const [featured, ...rest] = work.projects

  return (
    <>
      <Reveal className="section-header">
        <div>
          <p className="eyebrow">01 — Selected work</p>
          <h2 id="work-heading" className="section-title">
            Recent <em>projects</em>
          </h2>
        </div>
        <p className="section-note">
          Six shipped products. Every one of them is live — the links go to the
          real thing, not a case study.
        </p>
      </Reveal>

      <div className="projects">
        <Reveal>
          <ProjectCard href={featured.href} className="project-card--featured">
            <span className="project-arrow" aria-hidden="true">↗</span>

            <div className="project-body">
              <p className="project-meta">
                <span className="num">{index(1)}</span>
                <b>Featured</b>
              </p>
              <h3 className="project-title">{featured.title}</h3>
              <p className="project-desc">{featured.description}</p>
              {featured.tech?.length ? (
                <div className="project-tags">
                  {featured.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              ) : null}
              <span className="project-cta">Visit project →</span>
            </div>

            <div className="project-preview" aria-hidden="true">
              <span className="project-preview-bar" />
              <span className="project-preview-dots"><i /><i /><i /></span>
              <span className="project-preview-label">
                <b>{featured.title}</b>
                <span>Live</span>
              </span>
            </div>
          </ProjectCard>
        </Reveal>

        <Stagger className="projects-rest">
          {rest.map((project, idx) => (
            <ProjectCard key={project.title} href={project.href}>
              <span className="project-arrow" aria-hidden="true">↗</span>
              <div className="project-body">
                <p className="project-meta">
                  <span className="num">{index(idx + 2)}</span>
                </p>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                {project.tech?.length ? (
                  <div className="project-tags">
                    {project.tech.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                ) : null}
                <span className="project-cta">Visit project →</span>
              </div>
            </ProjectCard>
          ))}
        </Stagger>
      </div>
    </>
  )
}

export default WorkSection

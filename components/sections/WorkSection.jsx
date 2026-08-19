import content from '@content/en'
import ProjectCard from '@components/ProjectCard'
import { Reveal, Stagger } from '@components/motion'
import SkillIcon from '@components/SkillIcon'
import ProjectIcon from '@components/ProjectIcon'

const index = (n) => String(n).padStart(2, '0')

/* The note used to say "Six shipped products" as a literal, which was wrong the
   moment the list changed length. Spelled out rather than a numeral because it
   is running prose, not a figure. */
const COUNT = ['no', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
const spell = (n) => COUNT[n] ?? String(n)

/**
 * The bento rhythm, in columns of the six-column grid the tiles sit on.
 *
 * Pairs alternate wide|narrow, narrow|wide, so no two rows break at the same
 * place and the seam walks down the section instead of ruling a line through
 * it. A leftover odd tile takes the full width rather than sitting in half a
 * row with a hole beside it — the same call the testimonial grid makes.
 *
 * Computed rather than written per project because the list is a content file:
 * add a sixth project and the shape follows, with no CSS to keep in sync. It
 * is still worth reading `content/en.js` next to this — which slot a project
 * lands in decides how much room its description gets.
 */
const PAIRS = [
  [4, 2],
  [2, 4],
]
const spanFor = (i, total) =>
  i === total - 1 && total % 2 === 1 ? 6 : PAIRS[Math.floor(i / 2) % 2][i % 2]

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
          {spell(work.projects.length)} shipped products. Every one of them is live —
          the links go to the real thing, not a case study.
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
              <h3 className="project-title">
                <ProjectIcon src={featured.icon} title={featured.title} />
                {featured.title}
              </h3>
              <p className="project-desc">{featured.description}</p>
              {featured.tech?.length ? (
                <div className="project-tags">
                  {featured.tech.map((t) => (
                    <span key={t} className="tag">
                        <SkillIcon name={t} />
                        {t}
                      </span>
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

        <Stagger
          className="projects-rest"
          itemProps={rest.map((_, i) => ({ 'data-span': spanFor(i, rest.length) }))}
        >
          {rest.map((project, idx) => (
            <ProjectCard key={project.title} href={project.href}>
              <span className="project-arrow" aria-hidden="true">↗</span>
              <div className="project-body">
                <p className="project-meta">
                  <span className="num">{index(idx + 2)}</span>
                </p>
                <h3 className="project-title">
                  <ProjectIcon src={project.icon} title={project.title} />
                  {project.title}
                </h3>
                <p className="project-desc">{project.description}</p>
                {project.tech?.length ? (
                  <div className="project-tags">
                    {project.tech.map((t) => (
                      <span key={t} className="tag">
                        <SkillIcon name={t} />
                        {t}
                      </span>
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

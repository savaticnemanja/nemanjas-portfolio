import content from '@content/en'
import { Reveal, Stagger } from '@components/motion'

const shortenPeriod = (period) =>
  period
    .replace(/January |February |March |April |May |June |July |August |September |October |November |December /g, '')
    .replace('Present', 'Now')

const ExperienceSection = () => {
  const { experience } = content

  return (
    <>
      <Reveal className="section-header">
        <div>
          <p className="eyebrow">03 — Experience</p>
          <h2 id="experience-heading" className="section-title">
            Where I&apos;ve <em>worked</em>
          </h2>
        </div>
      </Reveal>

      <Stagger className="timeline">
        {experience.positions.map((pos) => (
          <div key={`${pos.company}-${pos.period}`} className="timeline-item">
            <p className="timeline-period">
              {shortenPeriod(pos.period)}
              <span className="timeline-location">{pos.location}</span>
            </p>
            <div>
              <h3 className="timeline-role">{pos.title}</h3>
              <p className="timeline-company">{pos.company}</p>
              <div className="timeline-bullets">
                {pos.bullets.map((bullet) => (
                  <p key={bullet} className="timeline-bullet">{bullet}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Stagger>

      {/* Client and employer systems. These sit under experience rather than
          in Work because they are employment deliverables — none of them has a
          public URL to link to. */}
      <Reveal className="systems-header">
        <h3 className="systems-title">Selected systems</h3>
        <p className="systems-note">
          Built inside banks and financial institutions, so there is nothing to link
          to — the stack is the receipt.
        </p>
      </Reveal>

      <Stagger className="systems">
        {experience.systems.map((system) => (
          <div className="card system-card" key={system.name}>
            <p className="system-domain">{system.domain}</p>
            <h4 className="system-name">{system.name}</h4>
            <p className="system-desc">{system.description}</p>
            <div className="system-stack">
              {system.stack.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </Stagger>
    </>
  )
}

export default ExperienceSection

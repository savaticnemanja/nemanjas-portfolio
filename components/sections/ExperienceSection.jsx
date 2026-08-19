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
    </>
  )
}

export default ExperienceSection

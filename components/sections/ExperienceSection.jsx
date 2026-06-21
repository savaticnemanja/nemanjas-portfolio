import content from '@content/en'

const shortenPeriod = (period) =>
  period
    .replace(/January |February |March |April |May |June |July |August |September |October |November |December /g, '')
    .replace('Present', 'Now')

const ExperienceSection = () => {
  const { experience } = content

  return (
    <>
      <div className="section-header" data-reveal>
        <div>
          <div className="section-label">Experience</div>
          <div className="section-title">Where I&apos;ve <em>Worked</em></div>
        </div>
      </div>

      <div className="timeline">
        {experience.positions.map((pos, idx) => (
          <div key={idx} className="timeline-item" data-reveal data-delay={String(idx + 1)}>
            <div className="timeline-period">{shortenPeriod(pos.period)}</div>
            <div className="timeline-dot" aria-hidden="true" />
            <div>
              <div className="timeline-role">{pos.title}</div>
              <div className="timeline-company">{pos.company}</div>
              <div className="timeline-bullets">
                {pos.bullets.map((bullet, bi) => (
                  <p key={bi} className="timeline-bullet">{bullet}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ExperienceSection

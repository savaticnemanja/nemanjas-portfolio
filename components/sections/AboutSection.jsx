import content from '@content/en'
import { Reveal } from '@components/motion'
import SkillIcon from '@components/SkillIcon'

const AboutSection = () => {
  const { skills, profile } = content

  return (
    <>
      <Reveal className="section-header">
        <div>
          <p className="eyebrow">04 — About</p>
          <h2 id="about-heading" className="section-title">
            Who I <em>am</em>
          </h2>
        </div>
      </Reveal>

      <Reveal className="card about-card">
        <div className="about-grid">
          <div className="about-text">
            <p>
              I&apos;m <strong>Nemanja Savatić</strong>, a full-stack software engineer with
              5+ years building reliable, end-to-end products across the frontend, backend
              and cloud. I design clean architectures, ship maintainable code, and care
              about <strong>performance, security</strong> and developer experience.
            </p>
            <p>
              Much of my work is in <strong>fintech</strong>. I currently develop, maintain
              and customize the leading anti-money-laundering platform by market share for a
              top-tier client — owning architecture decisions, mentoring peers, and
              delivering complex systems in pension management, digital banking and
              financial crime prevention with international teams.
            </p>
            <p>
              What ties it together is turning ambiguous requirements into clean, scalable
              solutions. Currently open to <strong>{profile.availability.toLowerCase()}</strong>{' '}
              where I can own meaningful problems end-to-end.
            </p>
          </div>

        </div>

        <div className="about-skills">
          {skills.categories.map((cat) => (
            <div key={cat.label} className="skill-group">
              <h3 className="skill-group-label">{cat.label}</h3>
              <div className="skill-pills">
                {cat.items.map((item) => (
                  <span key={item} className="tag skill-pill">
                    <SkillIcon name={item} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </>
  )
}

export default AboutSection

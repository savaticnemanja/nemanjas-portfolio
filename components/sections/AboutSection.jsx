import content from '@content/en'

const AboutSection = () => {
  const { skills } = content

  return (
    <>
      <div className="section-header">
        <div>
          <div className="section-label">About</div>
          <div className="section-title">Who I <em>Am</em></div>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>
            I&apos;m <strong>Nemanja Savatic</strong>, a software developer and solution implementer
            based online at <strong>nemanjas.dev</strong>. I specialise in turning complex
            problems into clean, maintainable systems.
          </p>
          <p>
            I work across the full stack — from designing database schemas and API contracts
            to shipping polished frontends. I care about <strong>code quality, developer
            experience,</strong> and solutions that are built to last.
          </p>
          <p>
            Currently open to <strong>freelance projects</strong> and{' '}
            <strong>full-time opportunities</strong> where I can own meaningful problems
            end-to-end.
          </p>
        </div>

        <div>
          {skills.categories.map((cat) => (
            <div key={cat.label} className="skill-group">
              <div className="skill-group-label">{cat.label}</div>
              <div className="skill-pills">
                {cat.items.map((item) => (
                  <span key={item} className="skill-pill">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AboutSection

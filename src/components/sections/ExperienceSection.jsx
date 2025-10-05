import { useTranslation } from 'react-i18next'

const ExperienceSection = () => {
  const { t } = useTranslation()
  const positions = t('experience.positions', { returnObjects: true })

  return (
    <div className="panel">
      <p className="panel-eyebrow">{t('experience.eyebrow')}</p>
      <h2 className="panel-title">{t('experience.title')}</h2>
      <div className="panel-stack">
        {positions.map((position, index) => (
          <div key={`${position.title}-${index}`} className="panel-card">
            <header className="panel-card__header">
              <h3>
                {position.title}{' '}
                <span>@ {position.company}</span>
              </h3>
              <p className="panel-meta">{position.period}</p>
            </header>
            <ul className="panel-list">
              {position.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceSection

import { Trans, useTranslation } from 'react-i18next'

const AboutSection = () => {
  const { t } = useTranslation()

  return (
    <>
      <p className="panel-eyebrow">{t('hero.greeting')}</p>
      <h1>{t('hero.name')}</h1>
      <h2>{t('hero.subtitle')}</h2>
      <p className="description">
        <Trans
          i18nKey="hero.description"
          components={{ company: <a href="https://www.upstatement.com" /> }}
        />
      </p>
      <a
        className="resume"
        href={t('header.resumeHref', '/resume.pdf')}
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.25 3.5a.75.75 0 0 1 1.5 0v7.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 9.28a.75.75 0 1 1 1.06-1.06l2.47 2.47V3.5Zm-4.5 9.75a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Z" />
        </svg>
        <span>{t('header.resume')}</span>
      </a>
    </>
  )
}

export default AboutSection

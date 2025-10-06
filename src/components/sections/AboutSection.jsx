import { Trans, useTranslation } from 'react-i18next'

import Button from '@components/Button'
import { DownloadIcon } from '@components/icons/ActionIcons'

const AboutSection = () => {
  const { t } = useTranslation()

  return (
    <div className="panel panel--hero">
      <p className="panel-eyebrow">{t('hero.greeting')}</p>
      <h1>{t('hero.name')}</h1>
      <h2>{t('hero.subtitle')}</h2>
      <p className="description">
        <Trans
          i18nKey="hero.description"
          components={{
            company: (
              <a
                key="company"
                href="https://www.upstatement.com"
                target="_blank"
                rel="noreferrer noopener"
              />
            ),
          }}
        />
      </p>
      <Button
        as="a"
        href={t('header.resumeHref', '/resume.pdf')}
        target="_blank"
        icon={<DownloadIcon />}
      >
        {t('header.resume')}
      </Button>
    </div>
  )
}

export default AboutSection

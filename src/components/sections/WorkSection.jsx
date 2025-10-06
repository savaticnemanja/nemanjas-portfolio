import { useTranslation } from 'react-i18next'

import Button from '@components/Button'
import { ArrowUpRightIcon } from '@components/icons/ActionIcons'

const WorkSection = () => {
  const { t } = useTranslation()
  const projects = t('work.projects', { returnObjects: true })

  return (
    <div className="panel">
      <p className="panel-eyebrow">{t('work.eyebrow')}</p>
      <h2 className="panel-title">{t('work.title')}</h2>
      <div className="panel-grid panel-grid--work">
        {projects.map((project, index) => (
          <article key={index} className="panel-card panel-card--project">
            <h3>{project.title}</h3>
            <p className="panel-description">{project.description}</p>
            <Button as="a" href={project.href} target="_blank" icon={<ArrowUpRightIcon />}>
              {project.action}
            </Button>
          </article>
        ))}
      </div>
    </div>
  )
}

export default WorkSection

import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { socialLinks } from '../data/socialLinks'

const Header = ({ sections, activeSectionId, onNavigate }) => {
  const { t } = useTranslation()

  return (
    <header className="header">
      <nav className="nav" aria-label={t('navigation.header', 'Primary')}>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`/${section.id}`}
                className={`nav-link${section.id === activeSectionId ? ' is-active' : ''}`}
                aria-current={section.id === activeSectionId ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate(section.id)
                }}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ol>
        <div className="nav-social-mobile" aria-hidden="true">
          {socialLinks.map(({ id, href, Icon }) => (
            <Fragment key={id}>
              <a
                href={href}
                aria-label={t(`social.${id}`)}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon />
              </a>
            </Fragment>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header

import { useTranslation } from 'react-i18next'
import { socialLinks } from '../data/socialLinks'

const SocialBar = () => {
  const { t } = useTranslation()

  return (
    <aside className="social-bar" aria-label={t('social.aria', 'Social links')}>
      <ul>
        {socialLinks.map(({ id, href, Icon }) => (
          <li key={id}>
            <a href={href} aria-label={t(`social.${id}`)} target="_blank" rel="noreferrer noopener">
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default SocialBar

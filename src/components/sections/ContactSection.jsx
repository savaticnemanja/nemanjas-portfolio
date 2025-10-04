import { useTranslation } from 'react-i18next'

const ContactSection = ({ email }) => {
  const { t } = useTranslation()
  const form = t('contact.form', { returnObjects: true })

  return (
    <div className="panel">
      <p className="panel-eyebrow">{t('contact.eyebrow')}</p>
      <h2 className="panel-title">{t('contact.title')}</h2>
      <p className="panel-description">{t('contact.description')}</p>
      <form className="panel-card contact-form" onSubmit={(event) => event.preventDefault()}>
        <label className="form-field">
          <span>{form.emailLabel}</span>
          <input type="email" name="email" placeholder={form.emailPlaceholder} required />
        </label>
        <label className="form-field">
          <span>{form.reasonLabel}</span>
          <div className="select-wrapper">
            <select name="reason" defaultValue="inquiry" required>
              {Object.entries(form.reasonOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 14 8" aria-hidden="true">
              <path d="M1 1.5 7 6.5 13 1.5" />
            </svg>
          </div>
        </label>
        <label className="form-field">
          <span>{form.contentLabel}</span>
          <textarea name="content" rows="4" placeholder={form.contentPlaceholder} required />
        </label>
        <button type="submit" className="resume">
          {form.submit}
        </button>
      </form>
      <p className="panel-meta">{email}</p>
    </div>
  )
}

export default ContactSection

import content from '@content/en'

const ContactSection = () => {
  const { contact } = content

  return (
    <div className="contact-section" id="contact">
      <div className="contact-inner">
        <div>
          <div className="section-label" style={{ marginBottom: '20px' }}>Contact</div>
          <div className="contact-headline">
            Let&apos;s build<br />something <em>great</em>
          </div>
        </div>

        <div className="contact-details">
          <a href={`mailto:${contact.email}`} className="contact-row">
            <span className="contact-row-label">Email</span>
            <span className="contact-row-value">{contact.email}</span>
          </a>
          <a
            href={contact.githubHref}
            target="_blank"
            rel="noreferrer"
            className="contact-row"
          >
            <span className="contact-row-label">GitHub</span>
            <span className="contact-row-value">{contact.github}</span>
          </a>
          <a
            href={contact.linkedinHref}
            target="_blank"
            rel="noreferrer"
            className="contact-row"
          >
            <span className="contact-row-label">LinkedIn</span>
            <span className="contact-row-value">{contact.linkedin}</span>
          </a>
          <a
            href={`${contact.calOrigin}/${contact.calLink}`}
            target="_blank"
            rel="noreferrer"
            className="contact-row"
          >
            <span className="contact-row-label">Booking</span>
            <span className="contact-row-value">Book a call →</span>
          </a>
          <div className="contact-row">
            <span className="contact-row-label">Location</span>
            <span className="contact-row-value">Remote · Available globally</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection

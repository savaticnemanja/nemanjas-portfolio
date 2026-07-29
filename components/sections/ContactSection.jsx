import content from '@content/en'
import { Reveal } from '@components/motion'

const ContactSection = () => {
  const { contact } = content

  const rows = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { label: 'GitHub', value: contact.github, href: contact.githubHref, external: true },
    { label: 'LinkedIn', value: contact.linkedin, href: contact.linkedinHref, external: true },
    {
      label: 'Booking',
      value: 'Book a call →',
      href: `${contact.calOrigin}/${contact.calLink}`,
      external: true,
    },
  ]

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="page">
        <div className="contact-grid">
          <Reveal>
            <p className="eyebrow">05 — Contact</p>
            <h2 id="contact-heading" className="contact-headline">
              Let&apos;s build something <em>great</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="contact-rows">
            {rows.map((row) => (
              <a
                key={row.label}
                href={row.href}
                className="contact-row"
                {...(row.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="contact-row-label">{row.label}</span>
                <span className="contact-row-value">{row.value}</span>
              </a>
            ))}
            <p className="contact-row">
              <span className="contact-row-label">Location</span>
              <span className="contact-row-value">{contact.location}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

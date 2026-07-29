import content from '@content/en'
import { Reveal } from '@components/motion'
import ContactForm from '@components/ContactForm'
import {
  MailIcon,
  GitHubIcon,
  LinkedInIcon,
  CalendarIcon,
  PinIcon,
} from '@components/icons'

/**
 * One panel, two halves: the invitation and the ways to reach me on lime, the
 * form on the dark surface beside it. It used to be a full-bleed lime band with a
 * table of full URLs in it — the colour now stops at the panel's edge, and the
 * rail shows handles, because `linkedin.com/in/` in front of a username is
 * fourteen characters that say nothing the icon has not already said.
 *
 * The rail is rendered here rather than in a loop over one array because the five
 * rows are not the same thing: three are links out, one is a booking link, and
 * the last is a fact with nowhere to go. Data-driving them would mean a config
 * object with an `as` and an `external` and a `href?` — more machinery than the
 * five lines it replaces.
 */
const ContactSection = () => {
  const { contact } = content
  const { handles, aria } = contact
  const calHref = `${contact.calOrigin}/${contact.calLink}`

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="page">
        <Reveal className="contact-panel">
          <div className="contact-rail">
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2 id="contact-heading" className="contact-headline">
              {contact.headline.lead} <em>{contact.headline.emphasis}</em>
            </h2>

            <ul className="contact-links">
              <li>
                <a href={`mailto:${contact.email}`} aria-label={aria.email}>
                  <MailIcon />
                  <span>{handles.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.githubHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={aria.github}
                >
                  <GitHubIcon />
                  <span>{handles.github}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.linkedinHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={aria.linkedin}
                >
                  <LinkedInIcon />
                  <span>{handles.linkedin}</span>
                </a>
              </li>
              <li>
                <a href={calHref} target="_blank" rel="noreferrer" aria-label={aria.booking}>
                  <CalendarIcon />
                  <span>{handles.booking}</span>
                </a>
              </li>
              {/* Not a link — there is nowhere for it to go. A <p> rather than an
                  <a>, so it is never announced as something to activate. The
                  context comes from a hidden label rather than `aria-label`, which
                  the paragraph role does not support and screen readers ignore
                  here. */}
              <li>
                <p>
                  <PinIcon />
                  <span className="sr-only">{aria.location}</span>
                  <span aria-hidden="true">{handles.location}</span>
                </p>
              </li>
            </ul>
          </div>

          <div className="contact-form-half">
            <h3 className="contact-form-heading">{content.contactForm.heading}</h3>
            <p className="contact-form-desc">{content.contactForm.description}</p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default ContactSection

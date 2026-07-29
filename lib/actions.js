'use server'

import { Resend } from 'resend'
import content from '@content/en'
import { SITE } from '@lib/site'

const { contactForm, newsletter, contact } = content

/* Both actions answer in the same shape, so the two forms can render their
   result the same way: a status the markup switches on, a message already
   written for a person to read, and the name of the input at fault when there
   is one. */
const ok = (message) => ({ status: 'success', message, field: null })
const err = (message, field = null) => ({ status: 'error', message, field })

/* Deliberately loose. Anything stricter rejects addresses that are perfectly
   legal, and the only real proof an address works is mail arriving at it. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const MAX = { name: 100, email: 200, message: 5000 }
const MIN_MESSAGE = 10

/**
 * Built per call rather than at module scope. Reading the key while the module
 * loads would turn a missing key into a crash during render; here it is a
 * message the visitor can act on, and the key is only ever wanted once someone
 * has actually submitted something.
 */
function client() {
  const key = process.env.RESEND_API_KEY?.trim()
  return key ? new Resend(key) : null
}

/* The messages that end in the fallback address are finished here rather than in
   the components. A form that has to look at a message to work out whether to
   append a link is a form that breaks the next time the wording changes. */
const unconfigured = () => err(`${contactForm.errors.unconfigured} ${contact.email}.`)

/**
 * A field no visitor can see, so anything in it was filled in blind by
 * something automated. Answered with success rather than an error: an error
 * tells whatever submitted it exactly what to change next time.
 */
const isBot = (formData) => Boolean(String(formData.get('company') ?? '').trim())

export async function sendMessage(_previous, formData) {
  if (isBot(formData)) return ok(contactForm.success)

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name) return err(contactForm.errors.name, 'name')
  if (name.length > MAX.name) return err(contactForm.errors.nameLong, 'name')
  if (!EMAIL.test(email) || email.length > MAX.email) {
    return err(contactForm.errors.email, 'email')
  }
  if (message.length < MIN_MESSAGE) return err(contactForm.errors.messageShort, 'message')
  if (message.length > MAX.message) return err(contactForm.errors.messageLong, 'message')

  const resend = client()
  if (!resend) return unconfigured()

  const to = process.env.CONTACT_TO?.trim() || contact.email
  // Resend's shared sender works without a verified domain, but only ever
  // delivers to the address the Resend account itself belongs to — which is
  // exactly where this is going. See .env.example.
  const from = process.env.RESEND_FROM?.trim() || 'onboarding@resend.dev'

  const { error } = await resend.emails.send({
    from: `${SITE.name} <${from}>`,
    to: [to],
    // So that replying in the mail client answers the sender rather than the
    // site's own address.
    replyTo: email,
    subject: `${name} via ${SITE.name}`,
    text: `${message}\n\n—\n${name}\n${email}`,
  })

  if (error) {
    console.error('[contact] Resend refused the message:', error)
    return err(`${contactForm.errors.failed} ${contact.email}.`)
  }

  return ok(contactForm.success)
}

export async function subscribe(_previous, formData) {
  if (isBot(formData)) return ok(newsletter.success)

  const email = String(formData.get('email') ?? '').trim()
  if (!EMAIL.test(email) || email.length > MAX.email) {
    return err(newsletter.errors.email, 'email')
  }

  const resend = client()
  if (!resend) return unconfigured()

  /* Resend renamed Audiences to Segments, and `audienceId` on contacts.create is
     deprecated in the SDK in favour of `segments`. Either id works here — a
     segment id goes through the current field, an audience id through the one
     that still accepts it — so whichever of the two the dashboard actually has
     is usable without migrating first. */
  const segmentId = process.env.RESEND_SEGMENT_ID?.trim()
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim()
  if (!segmentId && !audienceId) return unconfigured()

  const { error } = await resend.contacts.create(
    segmentId
      ? { email, unsubscribed: false, segments: [{ id: segmentId }] }
      : { email, unsubscribed: false, audienceId },
  )

  if (error) {
    console.error('[newsletter] Resend refused the contact:', error)
    return err(`${newsletter.errors.failed} ${contact.email}.`)
  }

  return ok(newsletter.success)
}

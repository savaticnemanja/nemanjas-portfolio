'use server'

import { after } from 'next/server'
import { Resend } from 'resend'
import content from '@content/en'
import { SITE } from '@lib/site'
import { unsubscribeLinks, verifyEmail } from '@lib/subscriber-token'
import {
  contactAcknowledgement,
  contactNotification,
  unsubscribedEmail,
  welcomeEmail,
} from '@lib/email/templates'

const { contactForm, newsletter, contact, unsubscribePage } = content

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

/* The sender for everything the site sends. Resend's shared address works with
   no verified domain but only ever delivers to the account's own — see
   .env.example. */
function sender() {
  const from = process.env.RESEND_FROM?.trim() || 'onboarding@resend.dev'
  return `${SITE.name} <${from}>`
}

/**
 * One deferred send, one log line.
 *
 * The three emails nobody is waiting on — the contact acknowledgement, the
 * welcome and the unsubscribe confirmation — differ only in recipient, body and
 * headers, and each had its own copy of the same build, send, log, swallow
 * sequence. Failures are logged rather than raised because every caller runs
 * from `after()`, once the response has gone and there is nobody left to tell.
 */
async function send({ to, mail, replyTo, headers }, label) {
  const resend = client()
  if (!resend) return

  const { error } = await resend.emails.send({
    from: sender(),
    to: [to],
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    ...(replyTo ? { replyTo } : {}),
    ...(headers ? { headers } : {}),
  })

  if (error) console.error(`${label} not sent:`, error)
}

/* Which list a contact belongs to. Resend renamed Audiences to Segments and
   deprecated `audienceId` on contacts.create in favour of `segments`; either id
   works, so whichever the dashboard has is usable without migrating first. This
   returns the shape the SDK wants for each, or null when neither is set. */
function list() {
  const segmentId = process.env.RESEND_SEGMENT_ID?.trim()
  if (segmentId) return { kind: 'segment', id: segmentId }

  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim()
  if (audienceId) return { kind: 'audience', id: audienceId }

  return null
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
  const notification = contactNotification({ name, email, message })

  const { error } = await resend.emails.send({
    from: sender(),
    to: [to],
    // So that replying in the mail client answers the sender rather than the
    // site's own address.
    replyTo: email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
  })

  if (error) {
    console.error('[contact] Resend refused the message:', error)
    return err(`${contactForm.errors.failed} ${contact.email}.`)
  }

  /* The acknowledgement to whoever wrote in, sent after the response rather than
     before it: the form has already succeeded the moment the notification is
     away, and a second round-trip to Resend would only make them watch it. It is
     also a separate send, so a failure here cannot lose the message itself. */
  after(() => send({ to: email, replyTo: to, mail: contactAcknowledgement({ name, message }) }, '[contact] acknowledgement'))

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

  const target = list()
  if (!target) return unconfigured()

  const { error } = await resend.contacts.create(
    target.kind === 'segment'
      ? { email, unsubscribed: false, segments: [{ id: target.id }] }
      : { email, unsubscribed: false, audienceId: target.id },
  )

  /* An address already on the list is not an error to the person typing it —
     they asked to be subscribed and they are. It is also the shape a resubscribe
     arrives in: someone who unsubscribed and came back is an existing contact
     with `unsubscribed: true`, and creating them again will not clear that flag.
     So a failed create falls through to an update, which both settles the
     duplicate and flips the flag back.

     Written as a fallback rather than as a lookup first because the common case
     is a new address, and that should cost one call rather than two. */
  let created = !error
  if (error) {
    const { error: updateError } = await resend.contacts.update({
      email,
      unsubscribed: false,
      ...(target.kind === 'audience' ? { audienceId: target.id } : {}),
    })

    if (updateError) {
      console.error('[newsletter] Resend refused the contact:', error, updateError)
      return err(`${newsletter.errors.failed} ${contact.email}.`)
    }
    created = false
  }

  /* Only a genuinely new subscriber gets the welcome. Someone who submits the
     form twice, or who never left in the first place, should not get a second
     copy of it — the form already told them they are on the list. */
  if (created) {
    const links = unsubscribeLinks(email)
    after(() =>
      send(
        {
          to: email,
          mail: welcomeEmail({ unsubscribeUrl: links?.page ?? null }),
          /* RFC 8058. `List-Unsubscribe` puts the control in the client's own
             chrome — the link Gmail and Apple Mail show beside the sender — and
             `List-Unsubscribe-Post` is what makes it one click there rather than
             a trip to the browser. Gmail and Yahoo both require them of bulk
             senders now. */
          headers: links && {
            'List-Unsubscribe': `<${links.oneClick}>, <${links.page}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        },
        '[newsletter] welcome',
      ),
    )
  }

  return ok(newsletter.success)
}

/**
 * Take an address off the list. Shared by the confirmation page and the
 * one-click route, so both go through the same token check.
 *
 * Returns a plain result rather than throwing: both callers render an outcome,
 * neither wants an exception.
 */
export async function unsubscribe(email, token) {
  if (!verifyEmail(email, token)) {
    return { status: 'invalid', message: unsubscribePage.invalidBody }
  }

  const resend = client()
  const target = list()
  if (!resend || !target) {
    return { status: 'failed', message: unsubscribePage.failedBody }
  }

  const { error } = await resend.contacts.update({
    email,
    unsubscribed: true,
    ...(target.kind === 'audience' ? { audienceId: target.id } : {}),
  })

  if (error) {
    console.error('[newsletter] unsubscribe refused:', error)
    return { status: 'failed', message: unsubscribePage.failedBody }
  }

  /* Confirmation, so an unsubscribe that happened in a mail client's chrome —
     where there is no page to land on — still leaves a trace the person can
     see. */
  after(() => send({ to: email, mail: unsubscribedEmail() }, '[newsletter] unsubscribe confirmation'))

  return { status: 'success', message: unsubscribePage.doneBody }
}

/** The form-action wrapper the confirmation page's button posts to. */
export async function unsubscribeAction(_previous, formData) {
  const email = String(formData.get('email') ?? '').trim()
  const token = String(formData.get('token') ?? '').trim()
  return unsubscribe(email, token)
}

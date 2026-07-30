import content from '@content/en'
import { SITE, appUrl } from '@lib/site'
import {
  BONE,
  HAIRLINE,
  LIME,
  MONO,
  MUTED,
  SANS,
  SUBTLE,
  SURFACE_2,
  button,
  escapeHtml,
  escapeParagraphs,
  h1,
  layout,
  p,
  rule,
} from './shell'

/**
 * The four emails the site sends.
 *
 * Each returns `{ subject, html, text }`. The plain-text part is not a courtesy
 * — a multipart message with only HTML in it scores worse with every spam
 * filter that looks, and it is what a watch, a screen reader and a terminal
 * client actually show. So the text is written, not stripped out of the markup.
 */

const { emails, contact } = content

/* Footer lines. The unsubscribe one is only built when there is a URL to point
   at; see lib/subscriber-token.js for when there is not. */
function newsletterFooter(url) {
  const site = `<a href="${appUrl('/')}" style="color:${SUBTLE};text-decoration:underline;">${SITE.domain}</a>`
  if (!url) return `${escapeHtml(emails.footer.sentBecause)} ${site}`

  return `${escapeHtml(emails.footer.sentBecause)} ${site}<br />
<a href="${escapeHtml(url)}" style="color:${SUBTLE};text-decoration:underline;">${escapeHtml(emails.footer.unsubscribe)}</a>`
}

function transactionalFooter() {
  return `<a href="${appUrl('/')}" style="color:${SUBTLE};text-decoration:underline;">${SITE.domain}</a>`
}

/* ─────────────────────────────────────────────────────────────────────────────
   To a new subscriber, on joining the list.
   ───────────────────────────────────────────────────────────────────────────*/
export function welcomeEmail({ unsubscribeUrl: url }) {
  const t = emails.welcome

  const body = [
    h1(escapeHtml(t.title)),
    p(escapeHtml(t.lead)),
    p(escapeHtml(t.body), { top: 14 }),
    button({ href: appUrl('/#blog'), label: t.cta }),
  ].join('\n')

  const text = [
    t.title,
    '',
    t.lead,
    '',
    t.body,
    '',
    `${t.cta}: ${appUrl('/#blog')}`,
    '',
    '—',
    `${emails.footer.sentBecause} ${SITE.url}`,
    url ? `${emails.footer.unsubscribe}: ${url}` : '',
  ]
    .join('\n')
    .trim()

  return {
    subject: t.subject,
    html: layout({
      title: t.title,
      preheader: t.preheader,
      body,
      footer: newsletterFooter(url),
    }),
    text,
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   To the site owner, when someone uses the contact form.

   The one email here nobody chose to receive, so it is built for scanning: who,
   their address, then the message itself in a panel. Reply-to is set on the send
   in lib/actions.js, which is what makes hitting reply answer the sender.
   ───────────────────────────────────────────────────────────────────────────*/
export function contactNotification({ name, email, message }) {
  const t = emails.notification
  const blocks = escapeParagraphs(message)
    .map(
      (block) =>
        `<p style="margin:0 0 12px;font-family:${SANS};font-size:15px;line-height:1.65;color:${BONE};">${block}</p>`,
    )
    .join('\n')

  const body = [
    h1(escapeHtml(t.title)),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 0;">
  <tr>
    <td style="padding:0 0 6px;font-family:${MONO};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${SUBTLE};">${escapeHtml(t.from)}</td>
  </tr>
  <tr>
    <td style="font-family:${SANS};font-size:16px;font-weight:600;color:${BONE};">${escapeHtml(name)}</td>
  </tr>
  <tr>
    <td style="padding:4px 0 0;font-family:${MONO};font-size:14px;">
      <a href="mailto:${escapeHtml(email)}" style="color:${LIME};text-decoration:none;">${escapeHtml(email)}</a>
    </td>
  </tr>
</table>`,
    rule(),
    `<div style="margin:24px 0 0;padding:22px;background:${SURFACE_2};border:1px solid ${HAIRLINE};border-radius:10px;">${blocks}</div>`,
    button({ href: `mailto:${email}`, label: t.cta }),
  ].join('\n')

  const text = [
    `${t.from}: ${name} <${email}>`,
    '',
    message,
  ].join('\n')

  return {
    // The sender's name in the subject, so the inbox list is scannable without
    // opening anything.
    subject: `${name} via ${SITE.name}`,
    html: layout({
      title: t.title,
      preheader: `${name} — ${message.slice(0, 90)}`,
      body,
      footer: transactionalFooter(),
    }),
    text,
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   To whoever wrote in, so the form is not a void.
   ───────────────────────────────────────────────────────────────────────────*/
export function contactAcknowledgement({ name, message }) {
  const t = emails.acknowledgement

  const body = [
    h1(escapeHtml(t.title.replace('{name}', name))),
    p(escapeHtml(t.lead)),
    rule(),
    `<p style="margin:24px 0 8px;font-family:${MONO};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${SUBTLE};">${escapeHtml(t.copyLabel)}</p>`,
    `<div style="padding:20px;background:${SURFACE_2};border:1px solid ${HAIRLINE};border-radius:10px;font-family:${SANS};font-size:14px;line-height:1.65;color:${MUTED};">${escapeParagraphs(message).join('<br /><br />')}</div>`,
  ].join('\n')

  const text = [
    t.title.replace('{name}', name),
    '',
    t.lead,
    '',
    `${t.copyLabel}:`,
    message,
    '',
    '—',
    SITE.url,
  ].join('\n')

  return {
    subject: t.subject,
    html: layout({
      title: t.title.replace('{name}', name),
      preheader: t.preheader,
      body,
      footer: transactionalFooter(),
    }),
    text,
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   After an unsubscribe goes through. Short on purpose: someone who has just
   left is not the audience for a pitch, and the only thing worth saying is that
   it worked and how to undo it.
   ───────────────────────────────────────────────────────────────────────────*/
export function unsubscribedEmail() {
  const t = emails.unsubscribed

  const body = [
    h1(escapeHtml(t.title)),
    p(escapeHtml(t.lead)),
    p(
      `${escapeHtml(t.resubscribe)} <a href="${appUrl('/#blog')}" style="color:${LIME};text-decoration:none;">${escapeHtml(SITE.domain)}</a>.`,
      { top: 14 },
    ),
  ].join('\n')

  const text = [t.title, '', t.lead, '', `${t.resubscribe} ${appUrl('/#blog')}`, '', '—', contact.email].join('\n')

  return {
    subject: t.subject,
    html: layout({
      title: t.title,
      preheader: t.preheader,
      body,
      footer: transactionalFooter(),
    }),
    text,
  }
}

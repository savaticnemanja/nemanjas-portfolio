import 'server-only'

import { createHmac, timingSafeEqual } from 'node:crypto'
import { appUrl } from '@lib/site'

/**
 * Signed unsubscribe links.
 *
 * The link in a newsletter has to identify the subscriber, and the address is
 * the only identifier we hold — but an unsubscribe URL that is just
 * `?email=someone@example.com` unsubscribes anyone whose address you can guess,
 * which is everyone. So the address travels with an HMAC of itself, and the
 * route refuses to act on a pair that does not verify.
 *
 * No expiry. A newsletter footer is read months after it arrives and an
 * unsubscribe link that has quietly gone stale is worse than no link — the
 * reader's next move is the spam button, which costs the sending domain far
 * more than an old link ever could.
 *
 * `server-only` because the secret must never be handed to a client bundle, and
 * an accidental import from a component should fail the build rather than ship.
 */

/* The key is read per call rather than at module load. A missing secret is a
   handled state — the caller stops offering unsubscribe links — and reading it
   at import time would turn that into a crash while rendering. */
function secret() {
  return process.env.NEWSLETTER_SECRET?.trim() || ''
}

export /* Base64url so the token survives a query string, a mail client's link
   rewriting and a copy-paste out of a plain-text part without escaping. */
function sign(email) {
  return createHmac('sha256', secret()).update(email.toLowerCase()).digest('base64url')
}

/**
 * Constant-time compare, so the time taken to reject a token does not leak how
 * much of it was right. Lengths are checked first because timingSafeEqual throws
 * on a mismatch rather than returning false.
 */
export function verifyEmail(email, token) {
  if (!secret() || !email || !token) return false

  const expected = Buffer.from(sign(email))
  const given = Buffer.from(String(token))
  if (expected.length !== given.length) return false

  return timingSafeEqual(expected, given)
}

/**
 * Both unsubscribe URLs for an address, or null when there is no secret to sign
 * with — callers treat that as "send the mail without the link" rather than as
 * a failure.
 *
 * `page` is what a person clicks in the footer and `oneClick` is what a mail
 * client POSTs for RFC 8058. They are built together because they are the same
 * address twice: the caller that needs one needs the other, and having the
 * sender derive the second by rewriting the first's path put half the knowledge
 * of where unsubscribing lives in a module that should not have any of it.
 */
export function unsubscribeLinks(email) {
  if (!secret()) return null

  const query = new URLSearchParams({ e: email, t: sign(email) }).toString()
  return {
    page: `${appUrl('/unsubscribe')}?${query}`,
    oneClick: `${appUrl('/api/unsubscribe')}?${query}`,
  }
}

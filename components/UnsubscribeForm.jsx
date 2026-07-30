'use client'

import { useActionState } from 'react'
import content from '@content/en'
import { unsubscribeAction } from '@lib/actions'

const INITIAL = { status: 'idle', message: '' }

/**
 * The confirm step of an unsubscribe.
 *
 * A link in an email cannot be the thing that unsubscribes on its own: mail
 * clients and corporate scanners prefetch links to check them for malware, and
 * every one of those prefetches would silently take someone off the list. So the
 * link lands here and a POST is what acts — which is also what RFC 8058's
 * one-click header does in the clients that support it, handled separately in
 * app/api/unsubscribe/route.js.
 *
 * A plain `<form action={...}>`, so it still works with JavaScript off.
 */
export default function UnsubscribeForm({ email, token }) {
  const t = content.unsubscribePage
  const [state, action, pending] = useActionState(unsubscribeAction, INITIAL)

  if (state.status === 'success') {
    return (
      <div className="unsub-outcome">
        <h1 className="unsub-heading">{t.doneHeading}</h1>
        <p className="unsub-body">{t.doneBody}</p>
        <a className="btn btn--outline" href="/">
          {t.doneCta}
        </a>
      </div>
    )
  }

  return (
    <form action={action} className="unsub-outcome">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="token" value={token} />

      <h1 className="unsub-heading">{t.confirmHeading}</h1>
      <p className="unsub-body">{t.confirmBody}</p>

      {/* The address being removed, spelled out. Someone forwarded an email is
          otherwise unsubscribing an address they cannot see and may not own. */}
      <p className="unsub-address">{email}</p>

      <div className="unsub-actions">
        <button type="submit" className="btn btn--primary" disabled={pending}>
          {pending ? t.pending : t.confirmCta}
        </button>
        <a className="btn btn--outline" href="/">
          {t.cancel}
        </a>
      </div>

      {/* Only ever a failure: success replaces the whole form above. */}
      <p className="unsub-error" role="status" aria-live="polite">
        {state.status === 'idle' ? '' : state.message}
      </p>
    </form>
  )
}

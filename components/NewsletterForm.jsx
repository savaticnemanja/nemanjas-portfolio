'use client'

import { useActionState, useEffect, useRef } from 'react'
import content from '@content/en'
import { subscribe } from '@lib/actions'
import { BellIcon } from '@components/icons'

const INITIAL = { status: 'idle', message: '', field: null }

/**
 * Subscribe box for the blog. The address goes to a Resend segment through a
 * server action, so the API key stays on the server and the page stays
 * prerendered.
 *
 * It replaced a plain POST to a third-party embed endpoint. That version needed
 * the endpoint baked in at build time, since a prerendered page has no request to
 * read an env var during; a server action runs per submission, so the key is
 * ordinary runtime configuration now and the Dockerfile no longer needs a build
 * argument for it.
 */
export default function NewsletterForm() {
  const { newsletter } = content
  const [state, action, pending] = useActionState(subscribe, INITIAL)
  const formRef = useRef(null)

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
  }, [state])

  return (
    <div className="newsletter">
      <h4 className="newsletter-heading">{newsletter.heading}</h4>
      <p className="newsletter-desc">{newsletter.description}</p>

      <form ref={formRef} action={action} className="newsletter-form" noValidate>
        <label className="sr-only" htmlFor="newsletter-email">
          {newsletter.inputLabel}
        </label>
        <input
          id="newsletter-email"
          className="newsletter-input"
          type="email"
          name="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder={newsletter.placeholder}
          aria-invalid={state.status === 'error' ? 'true' : undefined}
          aria-describedby={state.status !== 'idle' ? 'newsletter-result' : undefined}
        />
        <button type="submit" className="btn btn--primary btn--sm" disabled={pending}>
          <BellIcon />
          {pending ? newsletter.sending : newsletter.cta}
        </button>

        {/* Same honeypot as the contact form: out of sight, out of the tab order
            and out of the accessibility tree, with autofill off so a browser
            cannot fill it on a real person's behalf. */}
        <div className="cform-decoy" aria-hidden="true">
          <label htmlFor="newsletter-company">Company</label>
          <input
            id="newsletter-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </form>

      <p
        id="newsletter-result"
        className="newsletter-note"
        data-status={state.status}
        role="status"
        aria-live="polite"
      >
        {state.status === 'idle' ? '' : state.message}
      </p>
    </div>
  )
}

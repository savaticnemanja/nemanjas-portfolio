'use client'

import { useActionState, useEffect, useRef } from 'react'
import content from '@content/en'
import { sendMessage } from '@lib/actions'
import { SendIcon } from '@components/icons'

const INITIAL = { status: 'idle', message: '', field: null }

/**
 * The contact form. Posts to a server action, so the page itself stays
 * prerendered and the Resend key never leaves the server — and because it is a
 * plain `<form action={...}>`, it still submits with JavaScript off. What JS adds
 * is the pending state and the result in place instead of a navigation.
 *
 * Validation is the server's job, not this component's: whatever runs here can
 * be skipped by anything posting to the action directly, so duplicating it would
 * only mean two sets of rules to keep in step. `required` and `type="email"` stay
 * on the inputs for the browser's own affordances, and the action is what decides.
 */
export default function ContactForm() {
  const { contactForm } = content
  const [state, action, pending] = useActionState(sendMessage, INITIAL)
  const formRef = useRef(null)

  // Clear the fields once the message is away, so the form is ready for another
  // rather than holding a copy of what was just sent. Keyed on the state object,
  // which the action returns fresh each submission.
  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
  }, [state])

  const invalid = (name) => (state.status === 'error' && state.field === name ? 'true' : undefined)

  return (
    <form ref={formRef} action={action} className="cform" noValidate>
      <div className="cform-row">
        <div className="cform-field">
          <label htmlFor="cf-name">{contactForm.nameLabel}</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder={contactForm.namePlaceholder}
            aria-invalid={invalid('name')}
            aria-describedby={state.status !== 'idle' ? 'cform-result' : undefined}
          />
        </div>

        <div className="cform-field">
          <label htmlFor="cf-email">{contactForm.emailLabel}</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder={contactForm.emailPlaceholder}
            aria-invalid={invalid('email')}
            aria-describedby={state.status !== 'idle' ? 'cform-result' : undefined}
          />
        </div>
      </div>

      <div className="cform-field">
        <label htmlFor="cf-message">{contactForm.messageLabel}</label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          required
          maxLength={5000}
          placeholder={contactForm.messagePlaceholder}
          aria-invalid={invalid('message')}
          aria-describedby={state.status !== 'idle' ? 'cform-result' : undefined}
        />
      </div>

      {/* Honeypot. Hidden from sight, from the tab order and from assistive tech
          all three, so the only thing that ever fills it is something submitting
          the form blind. `autoComplete="off"` keeps a browser's own autofill from
          putting a company name in it and locking a real person out. */}
      <div className="cform-decoy" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="cform-foot">
        <button type="submit" className="btn btn--primary" disabled={pending}>
          <SendIcon />
          {pending ? contactForm.sending : contactForm.cta}
        </button>

        {/* One live region for both outcomes, so a result is announced whichever
            way it went. `polite` rather than `assertive`: the visitor has just
            pressed a button and is already waiting on this. The action hands over
            a finished sentence — including the fallback address where there is
            one — so there is nothing to assemble or pick apart here. */}
        <p
          id="cform-result"
          className="cform-result"
          data-status={state.status}
          role="status"
          aria-live="polite"
        >
          {state.status === 'idle' ? '' : state.message}
        </p>
      </div>
    </form>
  )
}

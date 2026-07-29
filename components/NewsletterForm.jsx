import content from '@content/en'

/**
 * Subscribe box for the blog.
 *
 * A plain form POST to whatever provider NEWSLETTER_ENDPOINT names — Buttondown,
 * ConvertKit, Substack and Mailchimp all accept one — so there is no route
 * handler here, no server action, nothing stored on this side, and it works with
 * JavaScript off. That is also why it stays a server component: the markup is
 * static, so none of it needs to reach the browser as JavaScript.
 *
 * `target="_blank"` because the provider answers the POST with its own
 * confirmation page. Without it a visitor who expected to subscribe in place
 * gets navigated off the site by the provider's response.
 *
 * The endpoint is read at build time, not per request: the homepage is
 * prerendered, so whatever is set when the image is built is what ends up in the
 * HTML. See .env.example. It is not a secret either way — a form action is public
 * by the time it reaches the page.
 */
export default function NewsletterForm() {
  const { newsletter, contact } = content
  const endpoint = process.env.NEWSLETTER_ENDPOINT?.trim()

  return (
    <div className="newsletter">
      <h4 className="newsletter-heading">{newsletter.heading}</h4>
      <p className="newsletter-desc">{newsletter.description}</p>

      {endpoint ? (
        <form
          className="newsletter-form"
          action={endpoint}
          method="post"
          target="_blank"
          rel="noopener noreferrer"
        >
          <label className="sr-only" htmlFor="newsletter-email">
            {newsletter.inputLabel}
          </label>
          <input
            id="newsletter-email"
            className="newsletter-input"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={newsletter.placeholder}
          />
          <button type="submit" className="btn btn--primary btn--sm">
            {newsletter.cta}
          </button>
        </form>
      ) : (
        /* No endpoint configured. The field is still drawn so the section keeps
           the shape it will have once one is set, but disabled, and hidden from
           assistive tech entirely: a disabled control announces itself as
           unavailable without ever saying why, and the note below says why in
           words. Sighted visitors get the same information from the two together.
           `disabled` already takes the controls out of the tab order. */
        <>
          <div className="newsletter-form" aria-hidden="true">
            <input
              className="newsletter-input"
              type="email"
              placeholder={newsletter.placeholder}
              disabled
            />
            <button type="button" className="btn btn--primary btn--sm" disabled>
              {newsletter.cta}
            </button>
          </div>
          <p className="newsletter-note">
            {newsletter.unavailable.before}
            <a href={`mailto:${contact.email}`}>{newsletter.unavailable.linkText}</a>
            {newsletter.unavailable.after}
          </p>
        </>
      )}
    </div>
  )
}

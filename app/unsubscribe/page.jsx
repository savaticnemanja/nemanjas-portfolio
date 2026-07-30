import content from '@content/en'
import UnsubscribeForm from '@components/UnsubscribeForm'
import { verifyEmail } from '@lib/subscriber-token'

const t = content.unsubscribePage

export const metadata = {
  title: t.title,
  // Nothing here is for a search engine, and the URL carries an address and a
  // signature. `noindex, nofollow` rather than a canonical: this page has no
  // canonical form, every visit has different query parameters.
  robots: { index: false, follow: false },
}

/**
 * Where the unsubscribe link in a newsletter lands.
 *
 * The token is checked here so an altered or truncated link says so before
 * anyone presses a button, but checking is all this does — the removal itself
 * needs a POST, for the reasons in components/UnsubscribeForm.jsx.
 */
export default async function UnsubscribePage({ searchParams }) {
  const params = await searchParams
  const email = String(params?.e ?? '').trim()
  const token = String(params?.t ?? '').trim()

  const valid = verifyEmail(email, token)

  return (
    <div className="unsub">
      <div className="page unsub-inner">
        {valid ? (
          <UnsubscribeForm email={email} token={token} />
        ) : (
          <div className="unsub-outcome">
            <h1 className="unsub-heading">{t.invalidHeading}</h1>
            <p className="unsub-body">{t.invalidBody}</p>
            <a className="btn btn--outline" href={`mailto:${content.contact.email}`}>
              {t.invalidCta}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

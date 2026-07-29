import content from '@content/en'

/** Site-wide constants used by metadata, JSON-LD, the sitemap and the manifest. */
export const SITE = {
  name: 'nemanjas.dev',
  author: 'Nemanja Savatić',
  role: content.profile.role,
  // The title tag has ~60 characters before Google truncates it, and the full
  // role spends most of them on the suffix.
  shortRole: 'Senior Software Engineer',
  domain: 'nemanjas.dev',
  // Overridable so a preview deploy does not advertise the production domain
  // as its own canonical.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nemanjas.dev',
  tagline: 'I build software that ships.',
  description:
    'Nemanja Savatić — senior full-stack software engineer in Novi Sad, Serbia. 5+ years across frontend, backend and cloud, currently building anti-money-laundering systems in fintech.',
  themeColor: '#000000',
  brandColor: '#C8FF00',
  locale: 'en_US',
}

/**
 * The site-wide share card, for routes that declare their own `openGraph`.
 * A child's `openGraph` object replaces the parent's rather than merging into
 * it, so a page that sets a title and forgets this ends up advertising
 * `summary_large_image` with no image — which renders as a bare text link.
 */
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Nemanja Savatić — Senior Software Engineer',
}

/** Absolute URL for a path, for JSON-LD and anything a crawler resolves. */
export function appUrl(path = '/') {
  return new URL(path, SITE.url).toString()
}

/** Profiles that establish this is the same person elsewhere (schema.org sameAs). */
export const SAME_AS = [content.contact.githubHref, content.contact.linkedinHref]

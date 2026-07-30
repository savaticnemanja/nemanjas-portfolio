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
  // 147 characters, and the order is the point. This feeds `description`,
  // `og:description`, `twitter:description`, the manifest and the JSON-LD, and
  // every one of those truncates: Google around 155 on desktop and 120 on
  // mobile, X around 125, LinkedIn around 100. At the previous 180 the AML
  // clause was last and so survived on none of them — the most differentiating
  // thing here was the only thing nobody read. Leading with it means the
  // mobile cut still lands after it, and 147 clears the desktop limit whole.
  // The name is not repeated: it is already the title, the og:title, the h1
  // and the JSON-LD author, and it was spending 18 characters here to say so
  // a fifth time.
  description:
    'Senior full-stack engineer in Novi Sad, Serbia. I build anti-money-laundering systems in fintech, with 5+ years across frontend, backend and cloud.',
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
  // Built from the same two fields the card itself renders rather than written
  // out again. Spelled literally, this had drifted to the `shortRole` wording
  // while app/opengraph-image.jsx described the same PNG with the full role —
  // one image, two alt texts, decided by which route did the linking.
  alt: `${SITE.author} — ${SITE.role}`,
}

/** Absolute URL for a path, for JSON-LD and anything a crawler resolves. */
export function appUrl(path = '/') {
  return new URL(path, SITE.url).toString()
}

/** Profiles that establish this is the same person elsewhere (schema.org sameAs). */
export const SAME_AS = [content.contact.githubHref, content.contact.linkedinHref]

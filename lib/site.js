import content from '@content/en'

/** Site-wide constants used by metadata, JSON-LD, the sitemap and the manifest. */
export const SITE = {
  name: 'nemanjas.dev',
  author: 'Nemanja Savatić',
  role: content.profile.role,
  // Every headline form of the role: the title tag, og:title and twitter:title
  // all get ~60 characters before something truncates them, and the full role
  // spends most of them on the suffix. `role` itself is for places with room —
  // the hero, the JSON-LD, the share image.
  shortRole: 'Senior Software Engineer',
  domain: 'nemanjas.dev',
  // Overridable so a preview deploy does not advertise the production domain
  // as its own canonical.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nemanjas.dev',
  tagline: 'I build software that ships.',
  // 111 characters, which clears the tightest limit this string meets rather
  // than the loosest. It feeds `description`, `og:description`,
  // `twitter:description`, the manifest and the JSON-LD, and they truncate at
  // different points — Google around 155 on desktop and 120 on mobile, social
  // previews around 125. Sized for the ~125 floor, so no consumer cuts it.
  //
  // It describes the person, not the work. An earlier version led with the
  // anti-money-laundering systems as the most differentiating thing in it, but
  // a description tied to one domain dates the moment the work moves, and this
  // is the line that introduces him everywhere — search, a shared link, the
  // install prompt. Sector stays, individual projects do not.
  //
  // The name is not repeated: it is already the title, the og:title, the h1 and
  // the JSON-LD author, and it was spending 18 of the scarcest characters on
  // the page to say so a fifth time.
  description:
    'Senior full-stack engineer in Novi Sad, Serbia. 5+ years across frontend, backend and cloud, mostly in fintech.',
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

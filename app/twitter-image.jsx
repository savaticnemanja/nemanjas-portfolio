/**
 * Same card as the Open Graph one. Declared as its own file so Next emits an
 * explicit `twitter:image`; X falls back to og:image, but LinkedIn, Slack and
 * Discord each read a different one of the two.
 */
export { default, alt, size, contentType } from './opengraph-image'

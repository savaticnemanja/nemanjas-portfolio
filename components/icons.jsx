/**
 * The handful of glyphs the contact rail needs, inline rather than from a
 * package: five icons is not worth a dependency, and inline SVG costs no extra
 * request and inherits `currentColor` so each one takes the tone of whatever it
 * sits in.
 *
 * All decorative. Every one is paired with a text label, so they are
 * `aria-hidden` and `focusable="false"` — the latter because IE-era SVG is still
 * focusable in some engines and would add an empty tab stop.
 *
 * Drawn on a 24-unit grid with 1.75 stroke, which is what matches the hairline
 * weight the rest of the site is built from.
 */
function Glyph({ children }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function MailIcon() {
  return (
    <Glyph>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.15 5.43a1.5 1.5 0 0 0 1.7 0L21 7" />
    </Glyph>
  )
}

/* The one solid mark of the five: GitHub's is a filled silhouette, and an
   outlined approximation of it reads as a different logo rather than a lighter
   one. */
export function GitHubIcon() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5.01 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

export function LinkedInIcon() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6.5 0h3.83v1.64h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.49c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
    </svg>
  )
}

export function CalendarIcon() {
  return (
    <Glyph>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Glyph>
  )
}

export function PinIcon() {
  return (
    <Glyph>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Glyph>
  )
}

export function ArrowIcon() {
  return (
    <Glyph>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Glyph>
  )
}

import 'server-only'
import * as si from 'simple-icons'

/**
 * A glyph and a colour for every skill listed in content/en.js.
 *
 * `server-only` is the point of this file being here rather than in components/.
 * simple-icons is 3,450 logos; the skills are rendered by server components, so
 * the paths are resolved at build time and baked into the HTML, and none of the
 * package reaches the browser. The import guard is what keeps that true — a
 * client component importing this fails the build rather than quietly shipping
 * the whole set.
 *
 * Three tiers, because the skills are three different kinds of thing:
 *
 * 1. Products with an official logo — the real payoff, each in its own brand
 *    colour.
 * 2. Products with no logo available. simple-icons has no Oracle, AWS or
 *    Playwright: those were removed over trademark objections, and inventing a
 *    lookalike would be worse than not having one. They get a tier-3 glyph.
 * 3. Practices — "Load balancing", "Code reviews", "System design". No logo
 *    exists because there is no product. These get a geometric glyph chosen by
 *    meaning and a colour from a fixed accent set.
 *
 * What is deliberately NOT done: borrowing a product's logo for a concept.
 * Auth0's mark for "OAuth", Jira's for "Agile" and OWASP's for "Security" all
 * exist and all fit the shape of the problem, and every one of them would claim
 * experience with a specific product the CV does not mention.
 */

/* ── Tier 3: concept glyphs ────────────────────────────────────────────────
   Solid single paths on a 24 grid, to sit beside the logos without looking like
   a different set — simple-icons are filled, not stroked, so these are too. */
const CONCEPT = {
  shield: {
    hex: 'F97362',
    path: 'M12 1.5 3.5 5v6.5c0 5.2 3.6 9.5 8.5 11 4.9-1.5 8.5-5.8 8.5-11V5L12 1.5Z',
  },
  network: {
    hex: '58C4DD',
    path: 'M6 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12-7.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 9.3l7-3.5.9 1.8-7 3.5-.9-1.8Zm.9 4.1 7 3.5-.9 1.8-7-3.5.9-1.8Z',
  },
  database: {
    hex: 'A78BFA',
    path: 'M12 2c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Zm8 6.7V12c0 1.7-3.6 3-8 3s-8-1.3-8-3V8.7c1.7 1.2 4.7 1.8 8 1.8s6.3-.6 8-1.8Zm0 6V18c0 1.7-3.6 3-8 3s-8-1.3-8-3v-3.3c1.7 1.2 4.7 1.8 8 1.8s6.3-.6 8-1.8Z',
  },
  cloud: {
    // AWS orange, since everything wearing this glyph is an AWS service.
    hex: 'FF9900',
    path: 'M6.5 19a5.5 5.5 0 0 1-.4-11A7 7 0 0 1 19 9.7a4.65 4.65 0 0 1-.6 9.3H6.5Z',
  },
  gauge: {
    hex: 'FBBF24',
    path: 'M12 3a9 9 0 0 0-9 9 8.96 8.96 0 0 0 2.3 6h13.4A8.96 8.96 0 0 0 21 12a9 9 0 0 0-9-9Zm4.2 5.3 1.4 1.4-4.3 4.3a1.9 1.9 0 1 1-1.4-1.4l4.3-4.3Z',
  },
  layers: {
    hex: '34D399',
    path: 'M12 2 2 7.5 12 13l10-5.5L12 2Zm7.6 8.6L22 12l-10 5.5L2 12l2.4-1.4L12 14.8l7.6-4.2Zm0 4.5L22 16.5 12 22 2 16.5l2.4-1.4L12 19.3l7.6-4.2Z',
  },
  people: {
    hex: 'F472B6',
    path: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7.5.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM9 13c-3.9 0-7 2.2-7 5v3h14v-3c0-2.8-3.1-5-7-5Zm7.5.5c-.7 0-1.4.1-2 .2 1.6 1.3 2.5 3 2.5 4.8V21h5v-2.5c0-2.5-2.5-5-5.5-5Z',
  },
  flask: {
    hex: 'C084FC',
    path: 'M9 2h6v2h-1v4.2l5.3 9.3A2 2 0 0 1 17.6 21H6.4a2 2 0 0 1-1.7-3.5L10 8.2V4H9V2Z',
  },
  access: {
    hex: '60A5FA',
    path: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3.2a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2Zm5 4.3-3.6.7v2.3l1.6 5.3-1.6.5-1.4-4.6-1.4 4.6-1.6-.5 1.6-5.3v-2.3L7 9.5l.3-1.6 4.7.9 4.7-.9.3 1.6Z',
  },
  device: {
    hex: '2DD4BF',
    path: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 16.2a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6ZM8 4v12h8V4H8Z',
  },
  search: {
    hex: 'FCD34D',
    // The inner subpath is wound against the outer one, which is what cuts the
    // lens out of the disc under the default nonzero fill rule. Both its arcs are
    // r=5.3; mixing in the outer 7.5 leaves a lopsided hole.
    path: 'M10.5 3a7.5 7.5 0 1 0 4.6 13.4l4.7 4.7 1.5-1.5-4.7-4.7A7.5 7.5 0 0 0 10.5 3Zm0 2.2a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Z',
  },
  box: {
    hex: 'FB923C',
    path: 'M12 2 2.5 7v10L12 22l9.5-5V7L12 2Zm0 2.3 6.6 3.5L12 11.3 5.4 7.8 12 4.3ZM4.5 9.5 11 13v6.2l-6.5-3.4V9.5Zm8.5 9.7V13l6.5-3.5v6.3L13 19.2Z',
  },
}

/* ── Tier 1: the skill's own logo ──────────────────────────────────────────
   Keyed by the exact string in content/en.js, valued by the simple-icons export
   name, because the two rarely agree — "Vue.js" is siVuedotjs, ".NET Core" is
   siDotnet. Resolved rather than guessed: a slug that stops existing after a
   package bump becomes a build error here, not a missing icon in production. */
const BRAND = {
  'HTML5': 'siHtml5',
  'CSS3': 'siCss',
  'SASS/SCSS': 'siSass',
  'Tailwind CSS': 'siTailwindcss',
  'JavaScript (ES6+)': 'siJavascript',
  'TypeScript': 'siTypescript',
  'React': 'siReact',
  'Next.js': 'siNextdotjs',
  'Vue.js': 'siVuedotjs',
  'Node.js': 'siNodedotjs',
  'GraphQL': 'siGraphql',
  'JWT': 'siJsonwebtokens',
  'PostgreSQL': 'siPostgresql',
  'MySQL': 'siMysql',
  'MongoDB': 'siMongodb',
  'Prisma': 'siPrisma',
  'Linux': 'siLinux',
  'Docker': 'siDocker',
  'Nginx': 'siNginx',
  'Jenkins': 'siJenkins',
  'GitHub Actions': 'siGithubactions',
  'Redux': 'siRedux',
  'TanStack Query': 'siReactquery',
  'Jest': 'siJest',
  'Vitest': 'siVitest',
  'Cypress': 'siCypress',
  '.NET Core': 'siDotnet',
}

/* ── Tiers 2 and 3: everything without a logo of its own ─────────────────── */
const FALLBACK = {
  // Products simple-icons cannot supply.
  'OracleDB': 'database',
  'Playwright': 'flask',
  'Zustand': 'box',
  'AWS': 'cloud',

  // AWS services. The set has no per-service icons, and the AWS mark in the
  // service's own colour is honest about what they are.
  'EC2': 'cloud',
  'S3': 'cloud',
  'RDS': 'cloud',
  'Lambda': 'cloud',
  'EKS': 'cloud',
  'CloudFront': 'cloud',
  'Route 53': 'cloud',
  'IAM': 'shield',

  // Practices.
  'Accessibility (WCAG)': 'access',
  'PWAs': 'device',
  'SEO': 'search',
  'REST APIs': 'network',
  'WebSockets': 'network',
  'Microservices': 'network',
  'API design': 'network',
  'Reverse proxies': 'network',
  'Load balancing': 'network',
  'OAuth': 'shield',
  'SSO': 'shield',
  'Security': 'shield',
  'Data modeling': 'database',
  'Migrations': 'database',
  'CI/CD': 'layers',
  'System design': 'layers',
  'System Design': 'layers',
  'Software architecture': 'layers',
  'Performance': 'gauge',
  'TDD': 'flask',
  'Code reviews': 'people',
  'Agile': 'people',
  'Technical leadership': 'people',
}

/* Some brand colours are black or near it — Next.js and JWT are both #000000,
   Prisma is #2D3748. On this page that is an invisible icon, so anything under
   the luminance floor is mixed toward white until it clears. The brand colour is
   kept wherever it can actually be seen, which is the great majority. */
const FLOOR = 0.16

const channel = (c) => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

const luminance = (r, g, b) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

function readable(hex) {
  const n = Number.parseInt(hex, 16)
  let r = (n >> 16) & 255
  let g = (n >> 8) & 255
  let b = n & 255

  // Ten 12% steps toward white is enough to lift pure black over the floor, and
  // the loop exits the moment it clears rather than washing the hue out.
  for (let i = 0; i < 10 && luminance(r, g, b) < FLOOR; i += 1) {
    r += (255 - r) * 0.12
    g += (255 - g) * 0.12
    b += (255 - b) * 0.12
  }

  const to = (c) => Math.round(c).toString(16).padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}

/**
 * `{ path, color }` for a skill, or null if it is not in any of the three maps —
 * a new entry in content/en.js renders as a plain pill rather than breaking.
 */
export function skillIcon(name) {
  const brand = BRAND[name]
  if (brand) {
    const icon = si[brand]
    if (!icon) {
      // A slug that vanished in a package bump. Loud in the build log rather
      // than silently absent on the page.
      console.warn(`[skill-icons] simple-icons has no export "${brand}" for "${name}"`)
      return null
    }
    return { path: icon.path, color: readable(icon.hex) }
  }

  const concept = CONCEPT[FALLBACK[name]]
  return concept ? { path: concept.path, color: readable(concept.hex) } : null
}

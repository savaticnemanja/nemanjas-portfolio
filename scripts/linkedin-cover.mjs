/**
 * Generates the LinkedIn profile cover at 1584×396.
 *
 *   node scripts/linkedin-cover.mjs
 *
 * The tesseract is not a drawing of the one on the site — it is the same
 * projection, run once at a fixed pose. The maths below is lifted from
 * components/Tesseract.jsx and kept in step with it by hand: 16 vertices, 32
 * edges, two simultaneous 4D rotations, a perspective divide in 4D and then
 * another in 3D, edges sorted far-to-near and shaded by depth.
 *
 * The pose is NOT the component's RESTING_TIME. That frame was chosen for a
 * square canvas, and at 2.4 the figure is a tall narrow bipyramid — on a 4:1
 * banner it reads as a crystal, not a hypercube. Poses were rendered as a contact
 * sheet and 4.2 picked by eye: a three-quarter view where the outer cube, the
 * inner cube and the edges joining them are all legible, and wider than it is
 * tall, which is the shape this canvas has room for.
 *
 * Layout is built around LinkedIn's crop. The profile photo overlaps the lower
 * left of the cover, so the left third carries nothing but background; the type
 * sits in the middle and the figure on the right.
 *
 * Text renders in Helvetica and Menlo rather than Geist, which is not installed
 * locally. Both are already in the site's own font stacks as fallbacks, so this
 * is the same substitution a visitor without the webfont would see.
 */
import { Buffer } from 'node:buffer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const W = 1584
const H = 396
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'brand')

/* Straight from app/globals.css. */
const INK = '#000000'
const BONE = '#F7F4EF'
const LIME = '#C8FF00'
const MUTED = '#8F8F8F'
const SUBTLE = '#7D7D7D'

/* ── Tesseract ─────────────────────────────────────────────────────────────── */
const VERTICES = Array.from({ length: 16 }, (_, i) => [
  i & 1 ? 1 : -1,
  i & 2 ? 1 : -1,
  i & 4 ? 1 : -1,
  i & 8 ? 1 : -1,
])

const EDGES = []
for (let i = 0; i < 16; i += 1) {
  for (let axis = 0; axis < 4; axis += 1) {
    const j = i ^ (1 << axis)
    if (j > i) EDGES.push([i, j])
  }
}

function rotate(p, a, b, angle) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const pa = p[a]
  const pb = p[b]
  p[a] = pa * c - pb * s
  p[b] = pa * s + pb * c
}

const W_DISTANCE = 2.9
const Z_DISTANCE = 4.6
const POSE = 4.2

function tesseract({ cx, cy, box }) {
  const scale = box * 0.1274
  const time = POSE

  const raw = VERTICES.map((v) => {
    const p = [v[0], v[1], v[2], v[3]]
    rotate(p, 0, 3, time * 0.3)
    rotate(p, 1, 2, time * 0.22)

    const kw = W_DISTANCE / (W_DISTANCE - p[3])
    const x3 = p[0] * kw
    const y3 = p[1] * kw
    const z3 = p[2] * kw
    const kz = Z_DISTANCE / (Z_DISTANCE - z3)
    return { x: x3 * kz * scale, y: y3 * kz * scale, depth: kw * kz }
  })

  /* Centred on the figure's own extents, not on the projection origin. A single
     pose is not symmetric about that origin — this one sits low and left of it —
     so centring on the origin would leave the shape visibly off-centre in a way
     the animated version never shows, because there it is always moving. */
  const xs = raw.map((p) => p.x)
  const ys = raw.map((p) => p.y)
  const ox = (Math.min(...xs) + Math.max(...xs)) / 2
  const oy = (Math.min(...ys) + Math.max(...ys)) / 2
  const points = raw.map((p) => ({ x: cx + p.x - ox, y: cy + p.y - oy, depth: p.depth }))

  // Stroke weights scale with the figure. The component's 1.05–2.25px is tuned
  // for a ~300px canvas; at this size those would be hairlines that vanish.
  const weight = box / 300

  const edges = EDGES.map(([a, b]) => ({
    a: points[a],
    b: points[b],
    depth: (points[a].depth + points[b].depth) / 2,
  })).sort((m, n) => m.depth - n.depth)

  let svg = ''
  for (const e of edges) {
    const t = Math.min(Math.max((e.depth - 0.5) / 1.15, 0), 1)
    const o = (0.14 + t * 0.62).toFixed(3)
    const sw = ((1.05 + t * 1.2) * weight).toFixed(2)
    svg += `<line x1="${e.a.x.toFixed(2)}" y1="${e.a.y.toFixed(2)}" x2="${e.b.x.toFixed(2)}" y2="${e.b.y.toFixed(2)}" stroke="${LIME}" stroke-opacity="${o}" stroke-width="${sw}" stroke-linecap="round"/>`
  }
  for (const p of points) {
    const t = Math.min(Math.max((p.depth - 0.95) / 0.95, 0), 1)
    if (t <= 0.02) continue
    const r = ((0.9 + t * 1.7) * weight).toFixed(2)
    svg += `<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${r}" fill="${LIME}" fill-opacity="${(t * 0.85).toFixed(3)}"/>`
  }
  return svg
}

/* ── Background ────────────────────────────────────────────────────────────── */

/* The .grid-lines overlay: 1px rules at 0.022 white, at the same 40px pitch. */
function grid(step = 40) {
  let d = ''
  for (let x = step; x < W; x += step) d += `M${x} 0V${H}`
  for (let y = step; y < H; y += step) d += `M0 ${y}H${W}`
  return `<path d="${d}" stroke="#FFFFFF" stroke-opacity="0.022" stroke-width="1"/>`
}

/* Three of the four aurora blooms, at the sizes and opacities the drift
   animation passes through, held still. */
/* Weighted so the page stays black and the lime stays an accent. The bloom behind
   the figure carries most of it; the other two are barely there, which is the
   proportion the site keeps — four small heavily-blurred blobs in a large dark
   viewport, not a wash. Anything above roughly 0.4 here and the whole banner goes
   olive, which is the opposite of the look. */
const BLOOMS = [
  { cx: 100, cy: -60, rx: 620, ry: 300, o: 0.34, id: 'b1' },
  { cx: 1242, cy: 198, rx: 540, ry: 340, o: 0.66, id: 'b2' },
  { cx: 690, cy: 470, rx: 700, ry: 260, o: 0.26, id: 'b3' },
]

/* ── Marks ─────────────────────────────────────────────────────────────────── */

/* The nav's logo mark, same geometry as components/Nav.jsx on its 24 grid. */
function logoMark(x, y, size) {
  const s = size / 24
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${LIME}" stroke-width="2.5">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5"/>
    <path d="M8 16.5 16 7.5" stroke-linecap="round"/>
  </g>`
}

const TECH = ['TYPESCRIPT', 'REACT', 'NEXT.JS', 'NODE.JS', 'POSTGRESQL', 'DOCKER', 'AWS']

function techStrip(x, y) {
  let out = ''
  let cursor = x
  TECH.forEach((t, i) => {
    out += `<text x="${cursor}" y="${y}" font-family="Menlo, SF Mono, ui-monospace, monospace" font-size="13" letter-spacing="2.6" fill="${SUBTLE}">${t}</text>`
    cursor += t.length * 10.3 + 14
    if (i < TECH.length - 1) {
      out += `<text x="${cursor}" y="${y}" font-family="Menlo, monospace" font-size="13" fill="${LIME}" fill-opacity="0.55">/</text>`
      cursor += 20
    }
  })
  return out
}

/* ── Compose ───────────────────────────────────────────────────────────────── */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    ${BLOOMS.map(
      (b) => `<radialGradient id="${b.id}">
      <stop offset="0" stop-color="${LIME}" stop-opacity="${b.o * 0.16}"/>
      <stop offset="0.55" stop-color="${LIME}" stop-opacity="${b.o * 0.05}"/>
      <stop offset="1" stop-color="${LIME}" stop-opacity="0"/>
    </radialGradient>`,
    ).join('')}
    <radialGradient id="figureGlow">
      <stop offset="0" stop-color="${LIME}" stop-opacity="0.10"/>
      <stop offset="0.7" stop-color="${LIME}" stop-opacity="0.02"/>
      <stop offset="1" stop-color="${LIME}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" x2="1">
      <stop offset="0" stop-color="${LIME}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${LIME}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${INK}"/>
  ${BLOOMS.map((b) => `<ellipse cx="${b.cx}" cy="${b.cy}" rx="${b.rx}" ry="${b.ry}" fill="url(#${b.id})"/>`).join('')}
  ${grid()}

  <!-- Figure, right third. The glow seats it in the same ambient light the hero
       gives it, where .hero-figure carries a closest-side radial behind it.
       Centred at 1242 rather than further right so the whole figure survives the
       narrower crop LinkedIn applies on mobile — at 1268 the right-hand vertex
       sat just outside it. -->
  <ellipse cx="1242" cy="198" rx="300" ry="230" fill="url(#figureGlow)"/>
  ${tesseract({ cx: 1242, cy: 198, box: 414 })}

  <!-- Type, middle. Starts at 420 so the whole block clears the profile photo,
       which LinkedIn lays over the lower left. -->
  <g>
    <circle cx="426" cy="129" r="5" fill="${LIME}"/>
    <circle cx="426" cy="129" r="10" fill="none" stroke="${LIME}" stroke-opacity="0.35" stroke-width="1"/>
    <text x="450" y="134" font-family="Menlo, SF Mono, ui-monospace, monospace" font-size="14" letter-spacing="3.4" fill="${LIME}">OPEN TO REMOTE &amp; HYBRID ROLES</text>

    ${logoMark(420, 168, 46)}
    <text x="484" y="207" font-family="Geist, Helvetica Neue, Helvetica, Arial, sans-serif" font-size="62" font-weight="600" letter-spacing="-1.4" fill="${BONE}">nemanjas<tspan fill="${LIME}">.dev</tspan></text>

    <text x="422" y="252" font-family="Geist, Helvetica Neue, Helvetica, Arial, sans-serif" font-size="21" fill="${MUTED}">Senior software engineer — frontend, backend and cloud</text>

    <rect x="422" y="280" width="300" height="1" fill="url(#rule)"/>
    ${techStrip(422, 312)}
  </g>
</svg>`

await sharp(Buffer.from(svg), { density: 216 })
  // Rendered at 3× and brought back down, so the hairlines and the small mono
  // resolve instead of aliasing at 1×.
  .resize(W, H)
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'linkedin-cover.png'))

await sharp(Buffer.from(svg), { density: 216 })
  .resize(W, H)
  .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
  .toFile(path.join(OUT, 'linkedin-cover.jpg'))

console.log(`wrote ${W}×${H} cover to brand/ (png + jpg)`)

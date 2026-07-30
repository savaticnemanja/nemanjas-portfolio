/**
 * The tesseract's frozen projection, as data.
 *
 * The maths is the one components/Tesseract.jsx animates: 16 vertices, 32 edges,
 * two simultaneous 4D rotations, a perspective divide in 4D and then another in
 * 3D, edges sorted far-to-near and shaded by depth. What this module adds is
 * that the still renderers no longer each keep their own copy of it —
 * scripts/linkedin-cover.mjs carried one and app/opengraph-image.jsx was about
 * to want a second, both "kept in step by hand", which is a promise nobody
 * keeps twice.
 *
 * Geometry and shading only. Both consumers draw lines and circles but into
 * different targets — an SVG string for the cover script, JSX elements for
 * Satori — so colour and markup stay theirs; opacity and stroke width come out
 * of the depth and belong here.
 *
 * Deliberately dependency-free and alias-free: scripts/linkedin-cover.mjs is
 * plain node with no bundler and no path aliases behind it, so anything imported
 * here would have to resolve there too.
 */

/* The 16 corners of the unit tesseract, one per 4-bit pattern. */
const VERTICES = Array.from({ length: 16 }, (_, i) => [
  i & 1 ? 1 : -1,
  i & 2 ? 1 : -1,
  i & 4 ? 1 : -1,
  i & 8 ? 1 : -1,
])

/* Two corners share an edge when they differ in exactly one coordinate, so
   flipping one bit of the index is the whole adjacency test. `j > i` is what
   keeps each of the 32 from being found twice. */
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

/* The pose the stills are frozen at. Not the component's resting time, which was
   chosen against a square canvas and reads as a tall crystal rather than a
   hypercube when it is not moving. Twelve candidates were rendered as a contact
   sheet and this one picked by eye: the outer cube, the inner cube and the edges
   joining them are all legible, and it is wider than it is tall. */
const POSE = 4.2

/**
 * Project the figure into a box of `box` pixels centred on (cx, cy).
 *
 * Returns absolute canvas coordinates, so a caller can drop the result into a
 * full-canvas <svg> without a transform of its own.
 */
export function projectTesseract({ cx, cy, box, pose = POSE }) {
  const scale = box * 0.1274

  const raw = VERTICES.map((v) => {
    const p = [v[0], v[1], v[2], v[3]]
    rotate(p, 0, 3, pose * 0.3)
    rotate(p, 1, 2, pose * 0.22)

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

  /* Stroke weights scale with the figure. The component's 1.05–2.25px is tuned
     for a ~300px canvas; at poster sizes those would be hairlines that vanish. */
  const weight = box / 300

  const edges = EDGES.map(([a, b]) => ({
    a: points[a],
    b: points[b],
    depth: (points[a].depth + points[b].depth) / 2,
  }))
    // Far to near, so the nearer edges are drawn last and read as in front.
    .sort((m, n) => m.depth - n.depth)
    .map((e) => {
      const t = Math.min(Math.max((e.depth - 0.5) / 1.15, 0), 1)
      return {
        x1: e.a.x,
        y1: e.a.y,
        x2: e.b.x,
        y2: e.b.y,
        opacity: 0.14 + t * 0.62,
        width: (1.05 + t * 1.2) * weight,
      }
    })

  /* A dot at each corner, but only where the depth has it near enough to read as
     one. Everything further back would be a smudge the edges already imply. */
  const vertices = points
    .map((p) => {
      const t = Math.min(Math.max((p.depth - 0.95) / 0.95, 0), 1)
      return { x: p.x, y: p.y, r: (0.9 + t * 1.7) * weight, opacity: t * 0.85, t }
    })
    .filter((p) => p.t > 0.02)

  return { edges, vertices }
}

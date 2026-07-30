/**
 * Rasterises the site mark for use in email.
 *
 *   node scripts/email-mark.mjs
 *
 * Writes public/icons/mark-email.png, which lib/email/shell.js links to by
 * absolute URL. Versioned output rather than local-only like brand/, because
 * the file has to be served — a mail client fetches it from the live site.
 *
 * A PNG and not the SVG the rest of the site uses: Gmail strips <svg> outright
 * and blocks `data:` image sources, so a hosted raster is the only form of the
 * mark that survives everywhere. Transparent, so it sits on the card colour
 * rather than carrying a black tile that would show as a slightly darker square
 * against the #0A0A0A surface.
 *
 * 72px for a 24px slot. Three times the display size because mail is read on
 * phones, where the panel is 3x, and because a client that ignores the width
 * attribute shows the intrinsic size — better that be a crisp small mark than a
 * blurry one.
 *
 * Geometry matches app/icon.svg exactly, minus its black field.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const OUT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'icons',
  'mark-email.png',
)

const SIZE = 72
const LIME = '#C8FF00'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${SIZE}" height="${SIZE}">
  <rect x="4" y="4" width="24" height="24" rx="6.5" fill="none" stroke="${LIME}" stroke-width="3.4"/>
  <path d="M11 21 21 11" stroke="${LIME}" stroke-width="3.4" stroke-linecap="round"/>
</svg>`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT)

console.log(`wrote ${SIZE}×${SIZE} mark to public/icons/mark-email.png`)

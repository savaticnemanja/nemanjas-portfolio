/**
 * The project's own favicon, in a chip beside its name.
 *
 * A chip and not a bare image because these come from six different sites and
 * are drawn on whatever field their designer chose — oobee's is a black
 * square, Avala's a white one, VIDIKA's is transparent. Dropped inline they
 * would be six unrelated shapes at six brightnesses; boxed at a fixed size
 * with one border they read as a row of marks, which is also how a browser
 * shows them in its own tab strip.
 *
 * `object-fit: cover` for the same reason: a favicon is designed to fill its
 * square, so cropping to the chip is what its author drew, where `contain`
 * would float it in a border of card colour.
 *
 * Falls back to the first character of the title for a site that serves no
 * icon (3D Tour). Decorative either way — the title is the next thing in the
 * heading — so the image carries an empty alt rather than repeating it, which
 * would have a screen reader announce every project twice.
 */
export default function ProjectIcon({ src, title }) {
  return (
    <span className="project-icon" aria-hidden="true">
      {src ? (
        <img src={src} alt="" width="28" height="28" loading="lazy" decoding="async" />
      ) : (
        <b>{title.charAt(0)}</b>
      )}
    </span>
  )
}

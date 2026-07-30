import { skillIcon } from '@lib/skill-icons'

/**
 * The glyph for one skill, in its own colour.
 *
 * A server component, which is what keeps simple-icons out of the browser: the
 * path and the colour are resolved during the build and what ships is the `<svg>`
 * itself. Renders nothing for a skill with no glyph mapped, so the pill just
 * falls back to text.
 *
 * Decorative — the skill's name is already right beside it in the pill — so
 * aria-hidden, and `focusable="false"` because SVG is still focusable in some
 * engines and 59 of these would otherwise be 59 empty tab stops.
 */
export default function SkillIcon({ name }) {
  const icon = skillIcon(name)
  if (!icon) return null

  return (
    <svg
      className="skill-icon"
      viewBox="0 0 24 24"
      fill={icon.color}
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  )
}

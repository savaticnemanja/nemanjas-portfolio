/**
 * Escaping for the two places this codebase builds HTML as strings rather than
 * as JSX: the markdown renderer in lib/posts.js and the mail templates in
 * lib/email. Both had their own copy of the same five replacements.
 *
 * Not `server-only`, unlike its callers — it is a pure string function with
 * nothing to leak, and marking it would stop a client component from ever using
 * it for no reason.
 */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

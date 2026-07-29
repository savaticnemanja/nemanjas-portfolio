'use client'

import { usePathname } from 'next/navigation'

/* Every path that serves the document the sections live in: the homepage, plus
   the clean URLs middleware.js rewrites onto it. Keep in step with the matcher
   in middleware.js — a path missing here still works, it just loses the smooth
   scroll and reloads instead. */
const SECTION_IDS = ['work', 'about', 'experience', 'blog', 'contact']
const HOME_PATHS = new Set(['/', ...SECTION_IDS.map((id) => `/${id}`)])

/* A bare `#id` while the sections are already in the document, the absolute
   `/#id` once they are not.

   The distinction is the whole point: `/#work` from `/about` is a different
   path, so the browser answers it with a full document navigation. It reloads
   and lands on the anchor instantly, which leaves `scroll-behavior: smooth`
   nothing to animate — the link silently stops scrolling and starts jumping.
   `#work` is same-document from any of those paths, so it always animates.
   From a blog post the absolute form is the correct one, because the sections
   really are on another document by then. */
export function useSectionHref() {
  const pathname = usePathname()
  const onHome = HOME_PATHS.has(pathname)
  return (id) => (onHome ? `#${id}` : `/#${id}`)
}

export function SectionLink({ id, children, ...props }) {
  const sectionHref = useSectionHref()
  return (
    <a href={sectionHref(id)} {...props}>
      {children}
    </a>
  )
}

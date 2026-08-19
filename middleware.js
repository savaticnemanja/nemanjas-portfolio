import { NextResponse } from 'next/server'

const SECTION_IDS = ['work', 'testimonials', 'experience', 'about', 'blog', 'contact']

export function middleware(request) {
  const { pathname } = request.nextUrl
  const segment = pathname.replace(/^\//, '').split('/')[0]

  if (SECTION_IDS.includes(segment) && pathname === `/${segment}`) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/work', '/testimonials', '/experience', '/about', '/blog', '/contact'],
}

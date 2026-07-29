import { SITE } from '@lib/site'

export default function manifest() {
  return {
    name: `${SITE.author} — ${SITE.role}`,
    // The label under a home screen icon, where anything long is truncated to
    // nothing useful.
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: SITE.themeColor,
    theme_color: SITE.themeColor,
    lang: 'en',
    dir: 'ltr',
    categories: ['portfolio', 'business', 'developer'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // Cropped to a circle or squircle by the launcher, so the mark inside is
      // scaled down to survive the crop.
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}

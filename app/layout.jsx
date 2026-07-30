import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import Nav from '@components/Nav'
import Cursor from '@components/Cursor'
import Aurora from '@components/Aurora'
import SmoothScroll from '@components/SmoothScroll'
import SiteFooter from '@components/SiteFooter'
import { SITE } from '@lib/site'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  // Everything relative — the OG image, canonicals — resolves against this.
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.shortRole}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author, url: SITE.url }],
  creator: SITE.author,
  publisher: SITE.author,
  keywords: [
    'Nemanja Savatić',
    'senior software engineer',
    'full-stack developer',
    'Novi Sad',
    'Serbia',
    'React',
    'Next.js',
    'Vue.js',
    'Node.js',
    'fintech',
    'AML',
    'AWS',
  ],
  // No canonical here. Metadata is inherited, so a root canonical is not a
  // default — it is an assertion every page without its own repeats verbatim.
  // Each route sets its own.
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.author} — ${SITE.role}`,
    description: SITE.description,
    url: SITE.url,
    locale: SITE.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.author} — ${SITE.role}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  manifest: '/manifest.webmanifest',
  // None of this was declared, and `viewport-fit: cover` on its own does not
  // replace it: cover says the page may use the full screen, `black-translucent`
  // is what actually hands iOS's status bar region over to it. Without the pair,
  // the system keeps that region, paints its own band across it and reports
  // safe-area-inset-top as 0 — so every rule inset for the notch silently
  // collapses to nothing and the band above the header is not the page's to
  // colour. Same block oobeebets carries, which is where the difference between
  // the two sites at the top of the screen came from.
  appleWebApp: {
    capable: true,
    // The home screen label when iOS installs from the meta tags rather than the
    // manifest; keep it in step with the manifest's short_name.
    title: SITE.name,
    statusBarStyle: 'black-translucent',
  },
  formatDetection: { telephone: false },
  category: 'technology',
}

export const viewport = {
  themeColor: SITE.themeColor,
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  // Never block zoom — disabling pinch-to-zoom is the most common a11y failure
  // on mobile sites.
  maximumScale: 5,
  // The manifest asks for `display: standalone`, and installed on iOS that means
  // the web view owns the whole screen. Without this, the system insets the page
  // away from the status bar and the home indicator itself and fills the
  // remainder with the background colour — which is where the band above the
  // header and the strips down the sides came from. `cover` hands those regions
  // back, and the CSS pads for them with env(safe-area-inset-*) so nothing ends
  // up underneath the clock or the notch.
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* Scroll-revealed content starts hidden in CSS. With JS off there is
            nothing to reveal it, so unhide the lot. */}
        <noscript>
          <style>{`.reveal, .stagger-item { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>

        <SmoothScroll />
        <Aurora />
        <div className="grid-lines" aria-hidden="true" />
        <Cursor />

        <Nav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

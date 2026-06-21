import './globals.css'
import Nav from '@components/Nav'
import Cursor from '@components/Cursor'
import ScrollProgress from '@components/ScrollProgress'
import ScrollReveal from '@components/ScrollReveal'

export const metadata = {
  title: 'nemanjas.dev — Software Developer',
  description:
    'Full-stack software developer specializing in web applications, SaaS platforms, and developer tools.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollProgress />
        <Cursor />
        <Nav />
        {children}
        <ScrollReveal />
      </body>
    </html>
  )
}

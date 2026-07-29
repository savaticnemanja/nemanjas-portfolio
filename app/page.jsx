import { getPostCards } from '@lib/posts'
import content from '@content/en'
import PortfolioShell from '@components/PortfolioShell'
import { SITE, SAME_AS, appUrl } from '@lib/site'

export const metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  // Cards only: BlogSection is a client component, and the full posts carry
  // every article's body twice over.
  const posts = getPostCards()
  const { profile, contact, experience, skills, education } = content

  // Person + WebSite, so a search engine can tie the name, the role, the
  // employer and the profiles together rather than inferring them from prose.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': appUrl('/#person'),
        name: SITE.author,
        alternateName: 'Nemanja Savatic',
        url: SITE.url,
        email: `mailto:${contact.email}`,
        jobTitle: 'Senior Software Engineer',
        description: SITE.description,
        image: appUrl('/icons/icon-512.png'),
        sameAs: SAME_AS,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Novi Sad',
          addressCountry: 'RS',
        },
        worksFor: {
          '@type': 'Organization',
          name: experience.positions[0].company,
        },
        alumniOf: education.map((item) => ({
          '@type': 'CollegeOrUniversity',
          name: item.school,
        })),
        knowsAbout: skills.categories.flatMap((cat) => cat.items),
        knowsLanguage: [
          { '@type': 'Language', name: 'Serbian' },
          { '@type': 'Language', name: 'English' },
        ],
        seeks: {
          '@type': 'Demand',
          name: profile.availability,
        },
      },
      {
        '@type': 'WebSite',
        '@id': appUrl('/#website'),
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: 'en',
        publisher: { '@id': appUrl('/#person') },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD is data, not markup; it is serialised here, never user-authored.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioShell posts={posts} />
    </>
  )
}

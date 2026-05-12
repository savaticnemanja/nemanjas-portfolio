const content = {
  experience: {
    positions: [
      {
        title: 'Senior Software Engineer',
        company: 'Arrowhead Development',
        period: 'January 2023 — Present',
        bullets: [
          'Lead accessible product experiences for mission-driven teams.',
          'Architected and shipped a multi-tenant SaaS platform serving 10,000+ users.',
          'Introduced automated CI/CD pipelines, cutting deployment time by 60%.',
        ],
      },
      {
        title: 'Software Engineer',
        company: 'UnderIT',
        period: 'April 2021 — January 2023',
        bullets: [
          'Built and maintained marketing sites with headless CMS workflows.',
          'Integrated third-party APIs for e-commerce, analytics, and payments.',
          'Mentored two junior developers and led bi-weekly code review sessions.',
        ],
      },
    ],
  },
  work: {
    projects: [
      {
        title: '3D Tour',
        description: 'Interactive 3D property walkthrough built with Three.js and WebGL. Allows real estate clients to explore spaces remotely with full 360° navigation.',
        href: 'https://3d-tour.nemanjas.dev',
        tech: ['Three.js', 'WebGL', 'React', 'Vite'],
      },
      {
        title: 'Avala Home Concept',
        description: 'Marketing site for a premium real estate brand. Custom animations, multilingual content, and CMS-driven property listings.',
        href: 'https://avalahomeconcept.com',
        tech: ['Next.js', 'Sanity', 'SCSS'],
      },
      {
        title: 'AlgoKey',
        description: 'Algorithmic trading dashboard with real-time market data feeds, strategy backtesting, and portfolio analytics.',
        href: 'https://algokey.algo-sphere.com',
        tech: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
      },
      {
        title: 'Minibambini eCommerce',
        description: 'Full-featured e-commerce platform for a children\'s fashion brand. Cart, checkout, order management, and admin dashboard.',
        href: 'https://minibambini.rs',
        tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Docker'],
      },
      {
        title: 'Kosnica ReviewShield',
        description: 'SaaS tool that monitors and manages online reviews for local businesses. Aggregates Google, Yelp, and TripAdvisor in real time.',
        href: 'https://kosnica.nemanjas.dev',
        tech: ['React', 'Node.js', 'REST APIs', 'Redis'],
      },
      {
        title: 'Spacetrin',
        description: 'Booking platform for co-working spaces and short-term office rentals. Real-time availability, payments, and member management.',
        href: 'https://spacetrin.com',
        tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
      },
    ],
  },
  skills: {
    categories: [
      { label: 'Languages',  items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS'] },
      { label: 'Frontend',   items: ['React', 'Next.js', 'Tailwind CSS', 'SCSS', 'Framer Motion'] },
      { label: 'Backend',    items: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST', 'GraphQL'] },
      { label: 'Tools',      items: ['Docker', 'Git', 'Linux', 'GitHub Actions', 'Vercel', 'AWS'] },
    ],
  },
  blog: {
    readMore: 'Read article',
    emptyTitle: 'No articles yet',
    emptyDescription: 'Articles you publish in the posts/ folder will appear here automatically.',
    searchLabel: 'Search articles',
    filtersLabel: 'Filter by tag',
    emptyFilteredTitle: 'No matching articles',
    emptyFilteredDescription: 'Try updating your search or choosing a different tag.',
  },
  contact: {
    email: 'savatic.nemanja@gmail.com',
    github: 'github.com/nsavatic',
    githubHref: 'https://github.com/nsavatic',
    linkedin: 'linkedin.com/in/nemanjas',
    linkedinHref: 'https://linkedin.com/in/nemanjas',
    calLink: 'nemanjas',
    calOrigin: 'https://cal.eu',
  },
}

export default content

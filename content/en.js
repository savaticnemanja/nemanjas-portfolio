const content = {
  experience: {
    positions: [
      {
        title: 'Senior Software Engineer',
        company: 'Arrowhead Development',
        period: 'January 2023 — Present',
        bullets: [
          'Embedded with a top-tier fintech client to develop, maintain, and customize the world\'s leading anti-money-laundering (AML) platform by market share.',
          'Built and extended frontend modules with Vue.js in a micro-frontend architecture, integrating with backends across MSSQL, PostgreSQL, and OracleDB.',
          'Owned architecture and delivery for customer-facing modules, reducing defect rates and review cycles through TDD and rigorous code review.',
          'Mentored engineers and led code reviews, contributing to CI/CD pipelines (Jenkins) and AWS deployments for a high-reliability platform serving financial institutions worldwide.',
        ],
      },
      {
        title: 'Software Engineer',
        company: 'UnderIT',
        period: 'April 2021 — January 2023',
        bullets: [
          'Built full-stack web applications and internal tools for international clients, owning features across the frontend, API, and database layers.',
          'Developed responsive, accessible UIs in React and Vue, backed by Node.js REST APIs and SQL databases.',
          'Introduced CI/CD automation and containerized deployments, cutting release time and improving delivery reliability.',
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
      { label: 'Frontend',   items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'SCSS'] },
      { label: 'Backend',    items: ['Node.js', 'REST APIs', 'GraphQL', 'WebSockets', 'JWT/OAuth', 'Microservices'] },
      { label: 'Databases',  items: ['PostgreSQL', 'MySQL', 'OracleDB', 'MongoDB', 'Prisma'] },
      { label: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Linux', 'Nginx', 'Jenkins', 'GitHub Actions', 'CI/CD'] },
      { label: 'Testing',    items: ['Jest', 'Vitest', 'Cypress', 'Playwright', 'TDD'] },
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
    github: 'github.com/savaticnemanja',
    githubHref: 'https://github.com/savaticnemanja',
    linkedin: 'linkedin.com/in/savaticnemanja',
    linkedinHref: 'https://linkedin.com/in/savaticnemanja',
    calLink: 'savaticnemanja',
    calOrigin: 'https://cal.eu',
  },
}

export default content

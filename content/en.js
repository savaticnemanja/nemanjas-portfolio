const content = {
  profile: {
    name: 'Nemanja Savatić',
    role: 'Senior Software Engineer · Full-Stack & Cloud',
    location: 'Novi Sad, Serbia',
    focus: 'Fintech · Financial crime · Digital banking',
    availability: 'Remote & hybrid roles',
    languages: 'Serbian (native) · English (professional)',
  },

  education: [
    {
      degree: 'Master of Professional Studies (MPS)',
      school: 'Higher Education Technical School of Professional Studies, Novi Sad',
      period: 'October 2021 — October 2023',
    },
    {
      degree: 'Bachelor of Professional Studies (BPS)',
      school: 'Higher Education Technical School of Professional Studies, Novi Sad',
      period: 'October 2018 — June 2021',
    },
  ],

  experience: {
    positions: [
      {
        title: 'Senior Software Engineer',
        company: 'Arrowhead Development',
        location: 'Novi Sad, Serbia',
        period: 'January 2023 — Present',
        bullets: [
          'Embedded with a top-tier fintech client to develop, maintain and customize the leading anti-money-laundering platform by market share.',
          'Built and extended frontend modules in Vue.js within a micro-frontend architecture, integrating with backends across MSSQL, PostgreSQL and OracleDB.',
          'Owned architecture and delivery for customer-facing modules, reducing defect rates and review cycles through TDD and rigorous code review.',
          'Mentored engineers and led code reviews, while contributing to Jenkins CI/CD pipelines and AWS deployments for a platform serving financial institutions worldwide.',
        ],
      },
      {
        title: 'Software Engineer',
        company: 'UnderIT',
        location: 'Novi Sad, Serbia',
        period: 'April 2021 — January 2023',
        bullets: [
          'Built full-stack web applications and internal tools for international clients, owning features across the frontend, API and database layers.',
          'Developed responsive, accessible UIs in React and Vue, backed by Node.js REST APIs and SQL databases.',
          'Introduced CI/CD automation and containerized deployments, cutting release time and improving delivery reliability.',
        ],
      },
    ],

    /* Client and employer systems. No links — these run inside banks and
       financial institutions, not on the public web. */
    systems: [
      {
        name: 'Anti-Money-Laundering Platform',
        domain: 'Fintech / Financial crime',
        description:
          'Development, maintenance and customization of the market-leading AML solution, used by financial institutions worldwide to detect and prevent money laundering and meet regulatory compliance.',
        stack: ['Vue.js', 'Micro-frontends', 'MSSQL', 'PostgreSQL', 'OracleDB', 'AWS', 'Jenkins', 'TDD'],
      },
      {
        name: 'Internal Risk Notification System',
        domain: 'Digital banking',
        description:
          'Secure one-way platform for risk teams to broadcast critical alerts to branch offices nationwide: a React admin panel, a .NET Core API and a lightweight WPF tray app, authenticated over LDAP inside a closed banking network.',
        stack: ['React', '.NET Core', 'WPF', 'LDAP', 'REST APIs', 'Windows Services'],
      },
      {
        name: 'Pension Fund Web Portal',
        domain: 'Pension management',
        description:
          'Secure portal for managing pension accounts and client portfolios: authentication, account overviews, transaction history and digital document access, built for high availability and financial-data compliance.',
        stack: ['TypeScript', 'React', 'Node.js', 'REST APIs', 'Docker', 'CI/CD', 'PostgreSQL'],
      },
      {
        name: 'Franchise CRM & Review Analytics',
        domain: 'CRM / Analytics',
        description:
          'Led development of a CRM platform for franchisers across 10 countries, delivering review analytics and customer insights to support data-driven decisions.',
        stack: ['React', 'Node.js', 'Redis', 'MySQL', 'CI/CD', 'AWS'],
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
      {
        label: 'Frontend',
        items: ['HTML5', 'CSS3', 'SASS/SCSS', 'Tailwind CSS', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Accessibility (WCAG)', 'PWAs', 'SEO'],
      },
      {
        label: 'Backend',
        items: ['Node.js', 'REST APIs', 'GraphQL', 'WebSockets', 'Microservices', 'JWT', 'OAuth', 'SSO', 'API design'],
      },
      {
        label: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'OracleDB', 'MongoDB', 'Prisma', 'Data modeling', 'Migrations'],
      },
      {
        label: 'Cloud (AWS)',
        items: ['EC2', 'S3', 'RDS', 'Lambda', 'EKS', 'CloudFront', 'Route 53', 'IAM'],
      },
      {
        label: 'DevOps',
        items: ['Linux', 'Docker', 'Nginx', 'Reverse proxies', 'Load balancing', 'CI/CD', 'Jenkins', 'GitHub Actions'],
      },
      {
        label: 'State & Testing',
        items: ['Redux', 'Zustand', 'TanStack Query', 'Jest', 'Vitest', 'Cypress', 'Playwright', 'TDD'],
      },
      {
        label: 'Engineering',
        items: ['System design', 'Software architecture', 'Performance', 'Security', 'Code reviews', 'Agile', 'Technical leadership'],
      },
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
    location: 'Novi Sad, Serbia · Remote & hybrid',
    calLink: 'savaticnemanja',
    calOrigin: 'https://cal.eu',
  },
}

export default content

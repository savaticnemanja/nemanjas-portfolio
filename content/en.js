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
    // Shown while posts/ holds no articles. The old copy here pointed at the
    // posts/ folder, which is a note to me — a visitor has no folder.
    emptyTitle: 'First articles are on the way',
    emptyDescription:
      'Notes on the things I have had to work out the hard way — deployment, system design, the parts of a stack that only misbehave in production. Nothing published yet.',
    searchLabel: 'Search articles',
    filtersLabel: 'Filter by tag',
    emptyFilteredTitle: 'No matching articles',
    emptyFilteredDescription: 'Try updating your search or choosing a different tag.',
  },

  newsletter: {
    heading: 'Get the first one',
    description: 'One email when an article goes up. No schedule to pad out, so nothing else.',
    inputLabel: 'Email address',
    placeholder: 'you@example.com',
    cta: 'Notify me',
    sending: 'Adding…',
    success: "You're on the list. The first article will find you.",
    errors: {
      email: 'That email address does not look right.',
      failed: 'That did not go through. You can reach me at',
    },
  },

  contactForm: {
    heading: 'Send a message',
    description: 'Tell me what you are building and roughly where it is. I answer everything.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    messageLabel: 'Message',
    messagePlaceholder: 'What are you working on?',
    cta: 'Send message',
    sending: 'Sending…',
    success: "Thanks — that's with me. I'll come back to you within a day or two.",
    errors: {
      name: 'Please add your name so I know who I am replying to.',
      nameLong: 'That name is longer than this form can take.',
      email: 'That email address does not look right.',
      messageShort: 'A couple more words would help — ten characters minimum.',
      messageLong: 'That message is too long to send from here. Email it instead.',
      failed: 'That did not send. You can reach me at',
      unconfigured: 'The form is not wired up yet. In the meantime, email me at',
    },
  },

  /* Everything the site sends by email, plus the pages an unsubscribe link
     lands on. Written in the same voice as the rest of the copy — short
     sentences, no exclamation marks, nothing that reads as a marketing
     sequence, because none of these are one. */
  emails: {
    footer: {
      sentBecause: 'You are getting this because you asked for new articles from',
      unsubscribe: 'Unsubscribe',
    },

    welcome: {
      subject: "You're on the list",
      preheader: 'One email when an article goes up. Nothing else.',
      title: "You're on the list",
      lead: 'One email when an article goes up. No schedule to pad out, so nothing else lands in between.',
      body: 'Mostly the things I had to work out the hard way — the ones where the answer was not in the docs. If that stops being useful, the unsubscribe link at the bottom of every one of these works immediately.',
      cta: 'Read what is there',
    },

    notification: {
      title: 'New message from the site',
      from: 'From',
      cta: 'Reply',
    },

    acknowledgement: {
      subject: 'Got your message',
      preheader: 'It reached me. I answer everything, usually within a day or two.',
      // {name} is replaced with whatever they typed, escaped.
      title: 'Thanks, {name}',
      lead: 'Your message reached me. I answer everything, usually within a day or two — if it is urgent, replying to this email comes straight back to me.',
      copyLabel: 'What you sent',
    },

    unsubscribed: {
      subject: "You're unsubscribed",
      preheader: 'No more emails. Nothing else needed from you.',
      title: "You're unsubscribed",
      lead: 'That is done — no more emails from the list. Nothing else is needed from you.',
      resubscribe: 'If it was a mistake, the box at the bottom of',
    },
  },

  /* The page an unsubscribe link lands on. Deliberately its own copy rather
     than reusing the email's: one is read after the fact, this one is read
     before anything has happened. */
  unsubscribePage: {
    title: 'Unsubscribe',
    confirmHeading: 'Unsubscribe from the list?',
    confirmBody: 'You will stop getting the email that goes out when a new article is published. Nothing else changes.',
    confirmCta: 'Yes, unsubscribe',
    cancel: 'Never mind',
    pending: 'Unsubscribing…',

    doneHeading: "You're unsubscribed",
    doneBody: 'No more emails from the list. You can subscribe again any time from the blog.',
    doneCta: 'Back to the site',

    invalidHeading: 'That link is not valid',
    invalidBody:
      'The link is incomplete or has been altered in transit — some mail clients rewrite them. Copy the full address from the email, or write to me and I will take you off the list myself.',
    invalidCta: 'Email me instead',

    // Rendered inline under the button rather than as its own screen, so there
    // is no heading to go with it.
    failedBody: 'Something went wrong at our end rather than yours. Write to me and I will take you off the list myself.',
  },

  contact: {
    eyebrow: '05 — Contact',
    headline: {
      lead: "Let's build",
      emphasis: 'something great',
    },
    email: 'savatic.nemanja@gmail.com',
    github: 'github.com/savaticnemanja',
    githubHref: 'https://github.com/savaticnemanja',
    linkedin: 'linkedin.com/in/savaticnemanja',
    linkedinHref: 'https://linkedin.com/in/savaticnemanja',
    calLink: 'savaticnemanja',
    calOrigin: 'https://cal.eu',

    /* The rail shows the handle rather than the URL. `github.com/` in front of a
       username is nine characters that say nothing the icon has not already
       said, and the full form wraps on a phone. The href keeps the whole
       address; only the label is short.

       The address is the exception: an email is written out in full or it cannot
       be used. A local part on its own is not something anyone can send to.

       `aria` is what a screen reader gets, where there is no icon to supply the
       context. Each one contains its row's visible text, so saying what is on
       screen still activates the right thing (WCAG 2.5.3). */
    handles: {
      email: 'savatic.nemanja@gmail.com',
      github: 'savaticnemanja',
      linkedin: 'savaticnemanja',
      booking: 'Book a call',
    },
    aria: {
      email: 'Email savatic.nemanja@gmail.com',
      github: 'GitHub: savaticnemanja',
      linkedin: 'LinkedIn: savaticnemanja',
      booking: 'Book a call',
    },
  },
}

export default content

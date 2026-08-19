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

  /* Order is the layout. The work grid is a bento — the first entry is the
     featured card, and the rest alternate wide | narrow | narrow | wide down a
     six-column grid, with a leftover odd tile taking the full width. So a
     project with a three-line description belongs in a wide slot (positions 2
     and 5 of `rest`) and a short one in a narrow slot (3 and 4), or the narrow
     tiles run tall and drag their neighbours with them. WorkSection owns the
     rhythm; see `spanFor` there.

     `icon` is the site's own favicon, saved into public/favicons rather than
     hotlinked — a third-party request per card on a page that otherwise makes
     none, for an image that changes maybe once a year, and one that fails
     silently to a broken chip the day a site reorganises its public folder.
     Re-download it if a brand changes. Optional: a project without one falls
     back to a monogram, which is the case for 3D Tour, whose site serves no
     icon at all. */
  work: {
    projects: [
      {
        title: 'Mimoland',
        icon: '/favicons/mimoland.png',
        description: 'Partner and investor-facing site for an award-winning original animated IP. Full-bleed video hero, character universe and festival laurels, exported to static files so the site has no runtime — only the contact handler is a container.',
        href: 'https://welcometomimoland.com',
        tech: ['Next.js', 'React', 'TypeScript', 'Docker'],
      },
      {
        title: 'oobee bets',
        icon: '/favicons/oobeebets.svg',
        description: 'Daily sports betting picks, settled in public against the real final score. Tier gating strips locked picks out of the payload rather than hiding them client-side, sessions are database-backed and revocable, and the pick record is append-only with an audit trail. Live today as the pre-launch list while the first slate fills.',
        href: 'https://oobeebets.com',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
      },
      {
        title: '3D Tour',
        description: 'Interactive 3D property walkthrough built with Three.js and WebGL. Allows real estate clients to explore spaces remotely with full 360° navigation.',
        href: 'https://3d-tour.nemanjas.dev',
        tech: ['Three.js', 'WebGL', 'React', 'Vite'],
      },
      {
        title: 'Avala Home Concept',
        icon: '/favicons/avala.svg',
        description: 'Marketing site for a premium real estate brand. Custom animations, multilingual content, and CMS-driven property listings.',
        href: 'https://avalahomeconcept.com',
        tech: ['Next.js', 'Sanity', 'SCSS'],
      },
      {
        title: 'VIDIKA',
        icon: '/favicons/vidika.svg',
        description: 'Single-page site for the creative studio behind Mimoland. Three full-viewport panels on a scroll-snap rail, with no UI framework and no bitmaps — every mark is inline SVG, and the page ships around 5 KB of JavaScript.',
        href: 'https://vidika.co',
        tech: ['Astro', 'TypeScript', 'Node.js', 'Nginx'],
      },
      {
        title: 'Spacetrin',
        icon: '/favicons/spacetrin.svg',
        description: 'Booking platform for co-working spaces and short-term office rentals. Real-time availability, payments, and member management.',
        href: 'https://spacetrin.com',
        tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
      },
    ],
  },

  /* Quotes from clients, in their own words. Nothing here is paraphrased and
     nothing is rewritten — the only liberties taken are cutting and the
     paragraph break, and a cut is marked with a leading ellipsis on the
     paragraph that follows it so a reader can see that something was removed.

     Jasna's runs at about half its original length. The full text, as sent:

       "Working with Nemanja on vidika.co and welcometomimoland.com has been an
        exceptional experience. He combines outstanding technical expertise
        across front-end and back-end development with a refined design
        sensibility and remarkable attention to detail. Equally impressive are
        his responsiveness, flexibility and commitment to finding the best
        solution at every stage.

        Facing a particularly tight deadline, Nemanja remained fully engaged,
        often working late into the night to ensure both websites were
        delivered to the highest standard. It is rare to find this level of
        technical capability, aesthetic judgement and professionalism in one
        person. I have found a trusted long-term collaborator and a valued
        member of our extended team."

     What was kept is the part nobody else can say: the front-to-back-plus-design
     combination, and the judgement that it is rare in one person. What went is
     the opener (the projects are linked under the quote, so it was naming what
     the card already names) and the late-nights sentence, which is the one line
     here that reads as a warning as easily as a compliment.

     Anthony's runs at about half its original length too. The full text, as
     sent:

       "Early in my company's development, we faced an uphill battle with web
        development. Everywhere we looked seemed to offer unreasonable high
        prices for the same LLM-quality development. This could not be further
        than the case when hiring Nemanja. He works with efficiency that is
        unparalleled. When you hire Nemanja you aren't just hiring a developer
        you're hiring someone ready to fulfill every request, beyond what you
        could have seen before he delivers his product. His creative touch and
        expertise in the field shines through his loyalty and collaborative
        nature. Every project or call Nemanja is on is lifted in both
        communication and efficiency. Nemanja's talent reaches far beyond his
        phenomenal technical skills."

     What was kept is the part that describes working with me rather than
     ranking me: that the delivery goes past the brief, and that the call
     itself gets better. What went is the opener, which is a verdict on other
     agencies' pricing rather than on this work and reads as a swipe on a page
     it has nothing to do with, and the two superlative sentences — a quote
     that says "unparalleled" persuades nobody, while "beyond what you could
     have seen before he delivers his product" is a specific claim a reader can
     weigh. Not reworded: the run-on in the kept first sentence is his.

     ── ADDING THE NEXT ONE ─────────────────────────────────────────────────
     Copy this shape. Nothing else needs touching — the grid goes to two
     columns at two quotes and three at three, and the section heading and note
     already read for any number.

       {
         quote: [
           'First paragraph.',
           '… Second paragraph, if the cut left one.',
         ],
         name: 'Their Name',
         role: 'Title, Company',
         projects: [
           { label: 'their-site.com', href: 'https://their-site.com' },
         ],
       },

     `projects` is optional — drop it and the card just ends at the name. Keep
     each quote near this length: three of these sit side by side on a desktop,
     and one that runs twice as long as its neighbours sets the height for all
     three. */
  testimonials: {
    note: 'People I have built for, in their own words. Quoted, not paraphrased.',
    quotes: [
      {
        quote: [
          'He combines outstanding technical expertise across front-end and back-end development with a refined design sensibility and remarkable attention to detail.',
          '\u2026 It is rare to find this level of technical capability, aesthetic judgement and professionalism in one person. I have found a trusted long-term collaborator and a valued member of our extended team.',
        ],
        name: 'Jasna Dragojević',
        role: 'Founder, VIDIKA · Creator of Mimoland',
        projects: [
          { label: 'vidika.co', href: 'https://vidika.co' },
          { label: 'welcometomimoland.com', href: 'https://welcometomimoland.com' },
        ],
      },
      {
        quote: [
          'When you hire Nemanja you aren’t just hiring a developer you’re hiring someone ready to fulfill every request, beyond what you could have seen before he delivers his product.',
          '\u2026 Every project or call Nemanja is on is lifted in both communication and efficiency. Nemanja’s talent reaches far beyond his phenomenal technical skills.',
        ],
        name: 'Anthony Magera',
        role: 'Founder & CEO, oobee',
        projects: [
          { label: 'oobeebets.com', href: 'https://oobeebets.com' },
        ],
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
    eyebrow: '06 — Contact',
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

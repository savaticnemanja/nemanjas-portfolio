import { Reveal, Stagger } from '@components/motion'
import { SITE, OG_IMAGE } from '@lib/site'

const DESCRIPTION =
  'The AI tools used to design and develop nemanjas.dev, and how they fit into the workflow.'

export const metadata = {
  title: 'Built with AI',
  description: DESCRIPTION,
  alternates: { canonical: '/llm-info' },
  openGraph: {
    type: 'article',
    title: 'Built with AI',
    description: DESCRIPTION,
    url: '/llm-info',
    siteName: SITE.name,
    locale: SITE.locale,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Built with AI',
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

const tools = [
  {
    name: 'Claude',
    by: 'Anthropic',
    href: 'https://claude.ai',
    use: 'Primary AI assistant for code generation, review, and architecture decisions.',
  },
  {
    name: 'Cursor',
    by: 'Anysphere',
    href: 'https://cursor.com',
    use: 'AI-powered code editor used for day-to-day development.',
  },
  {
    name: 'GitHub Copilot',
    by: 'GitHub / OpenAI',
    href: 'https://github.com/features/copilot',
    use: 'Inline code completions and autocomplete in the editor.',
  },
  {
    name: 'ChatGPT',
    by: 'OpenAI',
    href: 'https://openai.com',
    use: 'Brainstorming, copy editing, and quick research.',
  },
]

export default function LlmInfoPage() {
  return (
    <div className="page plain">
      <Reveal className="plain-header">
        <p className="eyebrow">Colophon</p>
        <h1 className="plain-title">Built with AI</h1>
        <p className="plain-lead">
          This site was designed and developed with the assistance of large language
          models. Below is a transparent breakdown of the tools used and how they fit
          into the workflow.
        </p>
      </Reveal>

      <Stagger className="tool-grid">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.href}
            target="_blank"
            rel="noreferrer"
            className="tool-card"
          >
            <span className="tool-card-top">
              <span className="tool-card-name">{tool.name}</span>
              <span className="tool-card-by">{tool.by}</span>
            </span>
            <span className="tool-card-use">{tool.use}</span>
            <span className="tool-card-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </Stagger>

      <Reveal className="plain-note">
        <p className="eyebrow">Note</p>
        <p>
          All content, decisions, and final implementations are reviewed and owned by
          the developer. AI is used as a tool to move faster — not as a replacement for
          engineering judgement.
        </p>
      </Reveal>
    </div>
  )
}

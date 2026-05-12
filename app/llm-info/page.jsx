export const metadata = {
  title: 'LLM Info · nemanjas.dev',
  description: 'Information about AI tools and LLMs used in this portfolio.',
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
    <main className="llm-info-page">
      <div className="llm-info-inner">
        <div className="llm-info-header">
          <div className="section-label">// AI &amp; LLMs</div>
          <h1 className="llm-info-title">Built with AI</h1>
          <p className="llm-info-lead">
            This site was designed and developed with the assistance of large language models.
            Below is a transparent breakdown of the tools used and how they fit into the workflow.
          </p>
        </div>

        <div className="llm-info-grid">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noreferrer"
              className="llm-tool-card"
            >
              <div className="llm-tool-top">
                <span className="llm-tool-name">{tool.name}</span>
                <span className="llm-tool-by">{tool.by}</span>
              </div>
              <p className="llm-tool-use">{tool.use}</p>
              <span className="llm-tool-arrow">↗</span>
            </a>
          ))}
        </div>

        <div className="llm-info-note">
          <span className="section-label">// Note</span>
          <p>
            All content, decisions, and final implementations are reviewed and owned by the developer.
            AI is used as a tool to move faster — not as a replacement for engineering judgement.
          </p>
        </div>
      </div>
    </main>
  )
}

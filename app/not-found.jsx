export default function NotFound() {
  return (
    <main style={{ padding: '140px 48px 100px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        color: 'var(--lime)',
        marginBottom: '16px',
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(32px, 5vw, 56px)',
        fontWeight: 800,
        letterSpacing: '-2px',
        color: 'var(--white)',
        marginBottom: '24px',
        lineHeight: 1,
      }}>
        Page not found.
      </h1>
      <a href="/" style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--text2)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'color 0.2s',
      }}>
        ← Back to portfolio
      </a>
    </main>
  )
}

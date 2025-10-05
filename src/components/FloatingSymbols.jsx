const SYMBOLS = ['{', '}', '<', '>', '/', '*', '()', '< / >']

const FloatingSymbols = () => (
  <div className="floating-symbols" aria-hidden="true">
    {SYMBOLS.map((symbol, index) => (
      <span key={index} className={`symbol symbol-${index}`}>
        {symbol}
      </span>
    ))}
  </div>
)

export default FloatingSymbols

const clampPercent = (value) => {
  if (Number.isNaN(value)) return 0
  return Math.min(100, Math.max(0, value))
}

const ScrollProgress = ({
  value = 0,
  orientation = 'vertical',
  className,
  ...rest
}) => {
  const normalized = clampPercent(value)
  const fillStyle =
    orientation === 'vertical'
      ? { height: `${normalized}%` }
      : { width: `${normalized}%` }

  const classes = ['scroll-progress', `scroll-progress--${orientation}`]
  if (className) classes.push(className)

  return (
    <div className={classes.join(' ')} aria-hidden="true" {...rest}>
      <span className="scroll-progress__fill" style={fillStyle} />
    </div>
  )
}

export default ScrollProgress

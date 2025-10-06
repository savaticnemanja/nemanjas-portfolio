const classNames = (...values) => values.filter(Boolean).join(' ')

const Button = ({
  as = 'button',
  href,
  icon,
  children,
  className,
  variant = 'primary',
  rel,
  target,
  type,
  ...rest
}) => {
  const Component = as === 'a' ? 'a' : 'button'
  const isLink = Component === 'a'
  const finalClassName = classNames('button', `button--${variant}`, className)

  const props = {
    className: finalClassName,
    ...rest,
  }

  if (isLink) {
    props.href = href
    if (target) {
      props.target = target
      props.rel = rel ?? 'noreferrer noopener'
    } else if (rel) {
      props.rel = rel
    }
  } else {
    props.type = type ?? 'button'
  }

  return (
    <Component {...props}>
      {icon ? <span className="button__icon" aria-hidden="true">{icon}</span> : null}
      <span className="button__label">{children}</span>
    </Component>
  )
}

export default Button

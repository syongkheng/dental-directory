import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import './Button.css'

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost'

interface CommonProps {
  variant?: ButtonVariant
  icon?: ReactNode
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined }

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }

type ButtonAsLink = CommonProps & LinkProps & { href?: undefined }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

/**
 * Polymorphic CTA button: renders a <button>, an external <a>, or an
 * internal router <Link> depending on which props are passed, so every
 * call-site styles consistently. Used for all CTAs across the site.
 */
export function Button({
  variant = 'primary',
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, className].filter(Boolean).join(' ')

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as ButtonAsLink
    return (
      <Link to={to} className={classes} {...linkRest}>
        {children}
        {icon}
      </Link>
    )
  }

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
        {icon}
      </a>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
      {icon}
    </button>
  )
}

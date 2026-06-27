import { isValidElement, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { Analytics } from '../../analytics/events'
import './Button.css'

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost'

interface CommonProps {
  variant?: ButtonVariant
  icon?: ReactNode
  // Override the label sent to analytics (defaults to button text content)
  trackAs?: string
  // Which section/component the button lives in, for click attribution
  trackComponent?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined }

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }

type ButtonAsLink = CommonProps & LinkProps & { href?: undefined }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

function nodeToText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeToText).join(' ')
  if (isValidElement(node)) return nodeToText((node.props as { children?: ReactNode }).children)
  return ''
}

export function Button({
  variant = 'primary',
  icon,
  className,
  children,
  trackAs,
  trackComponent,
  ...rest
}: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, className].filter(Boolean).join(' ')

  function handleTrack() {
    const label = (trackAs ?? nodeToText(children)).trim() || 'button'
    const href = 'href' in rest ? (rest as ButtonAsAnchor).href : undefined
    const to =
      'to' in rest && (rest as ButtonAsLink).to != null
        ? String((rest as ButtonAsLink).to)
        : undefined
    if (href?.includes('wa.me')) {
      Analytics.whatsappClick(trackComponent ?? label)
    } else {
      Analytics.buttonClick(label, { component: trackComponent, destination: href ?? to, variant })
    }
  }

  if ('to' in rest && rest.to !== undefined) {
    const { to, onClick: existingClick, ...linkRest } = rest as ButtonAsLink
    return (
      <Link
        to={to}
        className={classes}
        onClick={(e) => { handleTrack(); existingClick?.(e) }}
        {...linkRest}
      >
        {children}
        {icon}
      </Link>
    )
  }

  if ('href' in rest && rest.href !== undefined) {
    const { href, onClick: existingClick, ...anchorRest } = rest as ButtonAsAnchor
    return (
      <a
        href={href}
        className={classes}
        onClick={(e) => { handleTrack(); existingClick?.(e) }}
        {...anchorRest}
      >
        {children}
        {icon}
      </a>
    )
  }

  const { onClick: existingClick, ...buttonRest } = rest as ButtonAsButton
  return (
    <button
      className={classes}
      onClick={(e) => { handleTrack(); existingClick?.(e) }}
      {...buttonRest}
    >
      {children}
      {icon}
    </button>
  )
}

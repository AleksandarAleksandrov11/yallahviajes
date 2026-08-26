import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'light'
type Size = 'md' | 'lg'

const base =
  'group/btn relative inline-flex items-center justify-center gap-2.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:cursor-not-allowed disabled:opacity-55'

const sizes: Record<Size, string> = {
  md: 'px-6 py-3.5',
  lg: 'px-8 py-4.5 text-[0.72rem]',
}

/** El botón perfilado en oro reproduce el «RESERVA AHORA» del material de marca. */
const variants: Record<Variant, string> = {
  primary: 'bg-ink text-sand hover:bg-ink-2',
  outline: 'border border-gold/70 text-gold-deep hover:border-gold hover:bg-gold/10',
  light: 'border border-sand/45 text-sand hover:border-sand hover:bg-sand/10',
  ghost: 'text-ink hover:text-gold-deep',
}

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  withArrow?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  withArrow = false,
  ...rest
}: ButtonProps & Omit<ComponentProps<'button'>, 'children' | 'className'>) {
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </button>
  )
}

export function ButtonLink({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  withArrow = false,
  ...rest
}: ButtonProps & { href: string } & Omit<ComponentProps<typeof Link>, 'children' | 'className' | 'href'>) {
  const external = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
        {withArrow && <Arrow />}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </Link>
  )
}

function Arrow() {
  return (
    <ArrowRight
      className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
      strokeWidth={1.5}
      aria-hidden="true"
    />
  )
}

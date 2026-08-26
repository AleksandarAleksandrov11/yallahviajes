import Link from 'next/link'
import { WORDMARK_VIEWBOX_HEIGHT } from './paths'
import { site } from '@/data/site'

type MarkProps = {
  className?: string
  /** Color del rombo central. Por defecto, el oro de la marca. */
  diamond?: string
}

/** Emblema suelto (nudo bereber + rombo). Hereda el color con currentColor. */
export function Mark({ className = 'h-8 w-8', diamond }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={diamond ? ({ '--yv-diamond': diamond } as React.CSSProperties) : undefined}
    >
      <use href="#yv-mark" />
    </svg>
  )
}

/** Logotipo tipográfico «yalāh viajes». */
export function Wordmark({ className = 'h-5' }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 1000 ${WORDMARK_VIEWBOX_HEIGHT}`}
      className={className}
      style={{ width: 'auto' }}
      aria-hidden="true"
      focusable="false"
    >
      <use href="#yv-wordmark" />
    </svg>
  )
}

type LogoProps = {
  className?: string
  /** 'row' para cabeceras, 'stack' para el pie y la animación de entrada. */
  layout?: 'row' | 'stack'
  showDescriptor?: boolean
  markClassName?: string
  wordClassName?: string
}

/** Lockup completo: emblema + logotipo (+ descriptor «Marruecos»). */
export function LogoLockup({
  className = '',
  layout = 'row',
  showDescriptor = false,
  markClassName,
  wordClassName,
}: LogoProps) {
  if (layout === 'stack') {
    return (
      <span className={`flex flex-col items-center ${className}`}>
        <Mark className={markClassName ?? 'h-12 w-12'} />
        <Wordmark className={wordClassName ?? 'mt-4 h-8'} />
        {showDescriptor && (
          <span className="mt-3 flex items-center gap-2.5 text-[0.6rem] font-medium tracking-[0.34em] text-gold uppercase">
            <span aria-hidden="true" className="text-[0.5rem]">
              ◆
            </span>
            {site.descriptor}
            <span aria-hidden="true" className="text-[0.5rem]">
              ◆
            </span>
          </span>
        )}
      </span>
    )
  }

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark className={markClassName ?? 'h-8 w-8 shrink-0'} />
      <span className="flex flex-col">
        <Wordmark className={wordClassName ?? 'h-[1.15rem]'} />
        {showDescriptor && (
          <span className="mt-1 text-[0.5rem] font-medium tracking-[0.34em] text-gold uppercase">
            {site.descriptor}
          </span>
        )}
      </span>
    </span>
  )
}

/** Logotipo enlazado al inicio, con nombre accesible. */
export function LogoLink({
  className = '',
  ...rest
}: LogoProps & { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — inicio`}
      className={`group inline-flex items-center ${className}`}
    >
      <LogoLockup {...rest} />
    </Link>
  )
}

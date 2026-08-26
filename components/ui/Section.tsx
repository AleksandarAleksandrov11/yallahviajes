import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'

/** Antetítulo numerado: da ritmo editorial y orienta al usuario. */
export function Eyebrow({
  children,
  number,
  className = '',
  tone = 'gold',
}: {
  children: ReactNode
  number?: string
  className?: string
  tone?: 'gold' | 'light'
}) {
  return (
    <span
      className={`eyebrow ${tone === 'light' ? 'text-gold-soft' : 'text-gold-deep'} ${className}`}
    >
      {number && <span className="tabular-nums opacity-70">{number}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-45" />
      {children}
    </span>
  )
}

/** Filete de oro con rombo, tomado del material gráfico de la marca. */
export function Divider({ className = '', tone = 'ink' }: { className?: string; tone?: 'ink' | 'light' }) {
  const line = tone === 'light' ? 'bg-sand/25' : 'bg-ink/12'
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className={`h-px flex-1 ${line}`} />
      <span className="text-[0.5rem] text-gold">◆</span>
      <span className={`h-px flex-1 ${line}`} />
    </div>
  )
}

type SectionHeaderProps = {
  eyebrow?: string
  number?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  tone?: 'ink' | 'light'
  className?: string
  children?: ReactNode
  as?: 'h1' | 'h2'
}

export function SectionHeader({
  eyebrow,
  number,
  title,
  lead,
  align = 'left',
  tone = 'ink',
  className = '',
  children,
  as = 'h2',
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start'} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow number={number} tone={tone === 'light' ? 'light' : 'gold'}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <SplitText
        as={as}
        text={title}
        className={`mt-5 max-w-3xl text-display leading-[1.04] ${
          tone === 'light' ? 'text-sand' : 'text-ink'
        }`}
      />
      {lead && (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 max-w-xl prose-editorial ${
              tone === 'light' ? '!text-sand/70' : ''
            } ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  )
}

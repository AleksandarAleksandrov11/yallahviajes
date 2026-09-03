import Link from 'next/link'
import type { ReactNode } from 'react'
import { Divider } from '@/components/ui/Section'
import { formatLegalDate, legal } from '@/data/legal'
import { legalNav } from '@/data/site'

/** Cabecera y estructura común de las tres páginas legales. */
export function LegalLayout({
  title,
  intro,
  children,
  current,
}: {
  title: string
  intro: string
  children: ReactNode
  current: string
}) {
  return (
    <>
      <header className="grain relative bg-ink pt-32 pb-16 text-sand md:pt-40 md:pb-20">
        <div
          aria-hidden="true"
          className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.05]"
        />
        <div className="container-page relative">
          <nav aria-label="Migas de pan" className="text-[0.68rem] tracking-[0.16em] text-sand/58 uppercase">
            <Link href="/" className="link-underline">
              Inicio
            </Link>
            <span className="mx-2.5 text-gold/70" aria-hidden="true">
              ◆
            </span>
            <span>Legal</span>
          </nav>
          <h1 className="mt-6 max-w-3xl text-display leading-[1.06] text-sand">{title}</h1>
          <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-sand/62">{intro}</p>
          <p className="mt-7 text-[0.72rem] tracking-[0.14em] text-sand/55 uppercase">
            Última actualización: {formatLegalDate(legal.lastUpdated)}
          </p>
        </div>
      </header>

      <div className="grain relative bg-paper py-16 md:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Textos legales" className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-[0.62rem] font-medium tracking-[0.24em] text-muted uppercase">
                Textos legales
              </h2>
              <ul className="mt-5 space-y-3">
                {legalNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={item.href === current ? 'page' : undefined}
                      className={`link-underline text-[0.92rem] ${
                        item.href === current ? 'text-ink' : 'text-ink/68'
                      }`}
                      data-active={item.href === current}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Divider className="mt-8 max-w-40" />
            </div>
          </nav>

          <article className="legal-body lg:col-span-9">{children}</article>
        </div>
      </div>
    </>
  )
}

/** Sección numerada dentro de un texto legal. */
export function LegalSection({
  n,
  title,
  children,
  id,
}: {
  n: string
  title: string
  children: ReactNode
  id?: string
}) {
  return (
    <section id={id} className="border-t border-ink/10 pt-8 first:border-t-0 first:pt-0 [&+&]:mt-12">
      <span className="font-sans text-[0.6rem] tracking-[0.24em] text-gold-deep tabular-nums">{n}</span>
      <h2 className="mt-3 font-display text-2xl leading-tight text-ink md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-ink/72">{children}</div>
    </section>
  )
}

/** Dato pendiente de facilitar: se marca en pantalla, no se inventa. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <span
      title="Dato pendiente de facilitar por Yallah Viajes"
      className="border-b border-dashed border-gold/70 bg-gold/8 px-1 font-medium text-gold-deep"
    >
      {children}
    </span>
  )
}

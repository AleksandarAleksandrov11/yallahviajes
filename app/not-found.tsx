import type { Metadata } from 'next'
import Link from 'next/link'
import { Mark } from '@/components/brand/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Section'
import { nav } from '@/data/site'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o ha cambiado de dirección.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[86svh] items-center overflow-hidden bg-ink text-sand">
      <div
        aria-hidden="true"
        className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.05]"
      />
      <div className="container-page relative py-28 text-center">
        <Mark className="mx-auto h-12 w-12" diamond="#e2c88f" />
        <p className="mt-8 text-[0.62rem] tracking-[0.26em] text-gold-soft uppercase">Error 404</p>
        <h1 className="mx-auto mt-6 max-w-3xl text-display leading-[1.05] font-light text-sand">
          Esta página se ha perdido por el desierto.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[1rem] leading-relaxed text-sand/62">
          La dirección que buscas no existe o ha cambiado de sitio. Volvamos al camino conocido.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href="/" variant="light" size="lg" withArrow>
            Volver al inicio
          </ButtonLink>
          <ButtonLink href="/viajes" variant="outline" size="lg" className="!text-gold-soft">
            Ver los viajes
          </ButtonLink>
        </div>

        <Divider className="mx-auto mt-16 max-w-40" tone="light" />

        <nav aria-label="Enlaces principales" className="mt-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[0.8rem] text-sand/55">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline transition-colors hover:text-sand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

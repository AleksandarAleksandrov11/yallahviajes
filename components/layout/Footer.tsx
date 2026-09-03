import Link from 'next/link'
import { CookieSettingsButton } from '@/components/consent/CookieBanner'
import { ArrowUpRight, Instagram, Mail, Phone } from 'lucide-react'
import { LogoLockup, Mark } from '@/components/brand/Logo'
import { Divider } from '@/components/ui/Section'
import { contact, legalNav, nav, site, social } from '@/data/site'
import { tours } from '@/data/tours'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="grain relative overflow-hidden bg-ink text-sand">
      <div
        aria-hidden="true"
        className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.05]"
      />

      <div className="container-page relative py-16 md:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <LogoLockup layout="row" markClassName="h-9 w-9" wordClassName="h-5" />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-sand/62">
              {site.shortDescription}
            </p>
            <p className="mt-4 flex items-center gap-2.5 text-[0.62rem] tracking-[0.24em] text-gold-soft/80 uppercase">
              <span aria-hidden="true" className="text-[0.5rem]">
                ◆
              </span>
              {site.tagline}
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Navegación del pie">
            <h2 className="text-[0.62rem] font-medium tracking-[0.24em] text-sand/58 uppercase">
              Navegación
            </h2>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-[0.92rem] text-sand/78 transition-colors hover:text-sand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-[0.62rem] font-medium tracking-[0.24em] text-sand/58 uppercase">
              Nuestros viajes
            </h2>
            <ul className="mt-5 space-y-2.5">
              {tours.map((tour) => (
                <li key={tour.slug}>
                  <Link
                    href={`/viajes/${tour.slug}`}
                    className="link-underline text-[0.92rem] text-sand/78 transition-colors hover:text-sand"
                  >
                    {tour.name}{' '}
                    <span className="text-sand/55">· {tour.days} días</span>
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-9 text-[0.62rem] font-medium tracking-[0.24em] text-sand/58 uppercase">
              Contacto
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`tel:${contact.phoneRaw}`}
                  className="group inline-flex items-center gap-2.5 text-[0.92rem] text-sand/78 transition-colors hover:text-sand"
                >
                  <Phone className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  {contact.phoneDisplay}
                </a>
              </li>
              {social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-[0.92rem] text-sand/78 transition-colors hover:text-sand"
                  >
                    <Instagram className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                    {s.handle}
                    <ArrowUpRight
                      className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="group inline-flex items-center gap-2.5 text-[0.92rem] text-sand/78 transition-colors hover:text-sand"
                  >
                    <Mail className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Divider className="mt-14" tone="light" />

        <div className="mt-8 flex flex-col gap-5 text-[0.75rem] text-sand/58 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2.5">
            <Mark className="h-4 w-4 opacity-70" diamond="#e2c88f" />© {year} {site.name}. Todos los
            derechos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline transition-colors hover:text-sand/80">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {/* Permite revocar o modificar el consentimiento en cualquier momento */}
              <CookieSettingsButton className="link-underline transition-colors hover:text-sand/80" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

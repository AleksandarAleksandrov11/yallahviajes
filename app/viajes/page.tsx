import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Divider, Eyebrow } from '@/components/ui/Section'
import { TourCard } from '@/components/trips/TourCard'
import { TourCompare } from '@/components/trips/TourCompare'
import { contact, site, whatsappUrl } from '@/data/site'
import { tours } from '@/data/tours'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Viajes organizados a Marruecos desde España',
  description:
    'Dos circuitos por Marruecos con salida desde Marrakech: 5 días con una noche en el desierto de Merzouga o 6 días con dos noches y excursión en 4x4. Alojamiento, comidas, transporte y guía de habla hispana.',
  path: '/viajes',
})

export default function ViajesPage() {
  return (
    <>
      <PageHero
        image="dunas-caravana-amplia"
        eyebrow="Nuestros viajes"
        title="Dos rutas al desierto. Elige cuánto tiempo quieres quedarte."
        lead="Las dos empiezan y terminan en Marrakech, cruzan el Alto Atlas y llegan hasta las dunas del Erg Chebbi. Cambia lo que haces cuando llegas allí."
        crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Viajes' },
        ]}
      />

      <section className="grain relative bg-paper py-section" aria-labelledby="listado-viajes">
        <div className="container-page">
          <h2 id="listado-viajes" className="sr-only">
            Viajes organizados a Marruecos disponibles
          </h2>
          <div className="grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-14">
            {tours.map((tour, i) => (
              <Reveal key={tour.slug} delay={i * 0.1} className="h-full">
                <TourCard tour={tour} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grain relative bg-sand py-section" id="comparativa">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow number="01">Comparativa</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Lo mismo, punto por punto."
              className="mt-6 text-display leading-[1.06] text-ink"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 prose-editorial">
                Sin letra pequeña. Esto es exactamente lo que entra en cada ruta, tal y como figura
                en nuestros itinerarios.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-12">
            <TourCompare />
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-[0.86rem] leading-relaxed text-muted">
              El precio de cada ruta depende del número de viajeros y de las fechas. Escríbenos y te
              lo cerramos por escrito, sin compromiso.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-ink py-20 text-sand md:py-24">
        <div
          aria-hidden="true"
          className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.05]"
        />
        <div className="container-page relative text-center">
          <Divider className="mx-auto max-w-24" tone="light" />
          <h2 className="mx-auto mt-8 max-w-2xl text-title leading-tight text-sand">
            ¿No sabes cuál de las dos te encaja?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[1rem] leading-relaxed text-sand/62">
            Dinos cuántos días tenéis y qué os apetece y te decimos con franqueza cuál elegiríamos
            nosotros. También adaptamos la ruta si necesitáis algo distinto.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/contacto" variant="light" size="lg" withArrow>
              Consultar disponibilidad
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} variant="outline" size="lg" className="!text-gold-soft">
              Hablar por WhatsApp
            </ButtonLink>
          </div>
          <p className="mt-7 text-[0.75rem] tracking-[0.14em] text-sand/55">
            {contact.phoneDisplay} · {site.tagline}
          </p>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Viajes', path: '/viajes' },
        ])}
      />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, BedDouble, CalendarDays, Check, MapPin, Minus, Users } from 'lucide-react'

import { PageHero } from '@/components/layout/PageHero'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { Itinerary } from '@/components/trips/Itinerary'
import { TourGallery } from '@/components/trips/TourGallery'
import { ButtonLink } from '@/components/ui/Button'
import { FaqList } from '@/components/ui/FaqList'
import { JsonLd } from '@/components/ui/JsonLd'
import { Divider, Eyebrow } from '@/components/ui/Section'
import { featuredFaq } from '@/data/faq'
import { contact, whatsappUrl } from '@/data/site'
import { getTour, priceLabel, tours } from '@/data/tours'
import { breadcrumbJsonLd, pageMetadata, tourJsonLd } from '@/lib/seo'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const tour = getTour(slug)
  if (!tour) return {}

  return pageMetadata({
    title: tour.seo.title,
    description: tour.seo.description,
    path: `/viajes/${tour.slug}`,
    image: {
      url: `/img/${tour.hero}.jpg`,
      width: 1200,
      height: 900,
      alt: `${tour.name}, Yalah Viajes`,
    },
  })
}

export default async function TourPage({ params }: Params) {
  const { slug } = await params
  const tour = getTour(slug)
  if (!tour) notFound()

  const other = tours.find((t) => t.slug !== tour.slug)
  const mealsIncluded = tour.itinerary.flatMap((d) => d.meals).length

  return (
    <>
      <PageHero
        image={tour.hero}
        eyebrow={`${tour.days} días · ${tour.nights} noches`}
        title={tour.name}
        lead={tour.claim}
        crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Viajes', href: '/viajes' },
          { label: `${tour.days} días` },
        ]}
      >
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink href="#itinerario" variant="light" withArrow>
              Ver el itinerario
            </ButtonLink>
            <ButtonLink href="/contacto" variant="outline" className="!text-gold-soft">
              Consultar disponibilidad
            </ButtonLink>
          </div>
        </Reveal>
      </PageHero>

      {/* Resumen: los datos que deciden la compra, sin tener que bajar */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:py-12">
            <Fact icon={CalendarDays} label="Duración">
              {tour.days} días · {tour.nights} noches
            </Fact>
            <Fact icon={MapPin} label="Salida y regreso">
              {tour.startsIn}
            </Fact>
            <Fact icon={BedDouble} label="Alojamiento">
              {tour.nights} noches incluidas
            </Fact>
            <Fact icon={Users} label="Precio">
              {priceLabel(tour.price)}
            </Fact>
          </dl>
        </div>
      </section>

      {/* Resumen editorial + ruta */}
      <section className="grain relative bg-paper py-section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow number="01">El viaje</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text={tour.officialTitle}
              className="mt-6 text-title leading-[1.1] text-ink"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl prose-editorial">{tour.intro}</p>
            </Reveal>

            <Reveal delay={0.16} className="mt-10">
              <h3 className="text-[0.62rem] font-medium tracking-[0.24em] text-muted uppercase">
                La ruta
              </h3>
              <ol className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
                {tour.route.map((stop, i) => (
                  <li key={stop} className="flex items-center gap-3">
                    <span className="border border-ink/12 px-3.5 py-2 text-[0.78rem] text-ink/75">
                      {stop}
                    </span>
                    {i < tour.route.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-gold" strokeWidth={1.4} aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <h3 className="text-[0.62rem] font-medium tracking-[0.24em] text-muted uppercase">
                Experiencias principales
              </h3>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {tour.experiences.map((exp) => (
                  <li key={exp} className="flex items-start gap-2.5 text-[0.95rem] text-ink/72">
                    <span aria-hidden="true" className="mt-2 text-[0.45rem] text-gold">
                      ◆
                    </span>
                    {exp}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Tarjeta de reserva pegajosa */}
          <div className="lg:col-span-5">
            <aside className="lg:sticky lg:top-28">
              <div className="grain relative overflow-hidden bg-ink p-8 text-sand md:p-9">
                <div
                  aria-hidden="true"
                  className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.06]"
                />
                <div className="relative">
                  <p className="text-[0.6rem] tracking-[0.24em] text-gold-soft uppercase">
                    {tour.days} días · {tour.nights} noches
                  </p>
                  <p className="mt-4 font-display text-3xl leading-none text-sand">
                    {priceLabel(tour.price)}
                  </p>
                  {tour.price.from === null && (
                    <p className="mt-3 text-[0.85rem] leading-relaxed text-sand/58">
                      El precio depende del número de viajeros y de las fechas. Escríbenos y te lo
                      damos cerrado, por escrito y sin compromiso.
                    </p>
                  )}

                  <Divider className="my-7" tone="light" />

                  <ul className="space-y-2.5 text-[0.88rem] text-sand/72">
                    <li className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
                      {tour.nights} noches de alojamiento incluidas
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
                      {mealsIncluded} comidas incluidas
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
                      Conductor y guía durante todo el recorrido
                    </li>
                  </ul>

                  <div className="mt-8 flex flex-col gap-3">
                    <ButtonLink
                      href={`/contacto?viaje=${tour.slug}`}
                      variant="light"
                      className="!border-sand !bg-sand !text-ink hover:!bg-white"
                      withArrow
                    >
                      Quiero este viaje
                    </ButtonLink>
                    <ButtonLink
                      href={whatsappUrl(
                        `Hola Yalah Viajes, me interesa el viaje de ${tour.days} días (${tour.name}). ¿Podéis darme precio y disponibilidad?`,
                      )}
                      variant="outline"
                      className="!text-gold-soft"
                    >
                      Preguntar por WhatsApp
                    </ButtonLink>
                  </div>

                  <p className="mt-6 text-center text-[0.72rem] tracking-[0.12em] text-sand/55">
                    o llámanos al {contact.phoneDisplay}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Itinerario día a día */}
      <section className="grain relative bg-sand py-section" id="itinerario">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow number="02">Día a día</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="El viaje, jornada por jornada."
              className="mt-6 text-display leading-[1.06] text-ink"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 prose-editorial">
                Toca cualquier día para desplegarlo: qué se ve, qué comidas entran y dónde se duerme
                esa noche.
              </p>
            </Reveal>
          </div>

          <div className="mt-14">
            <Itinerary days={tour.itinerary} />
          </div>
        </div>
      </section>

      {/* Incluye / no incluye */}
      <section className="grain relative bg-paper py-section">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow number="03">Condiciones</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Qué entra y qué no."
              className="mt-6 text-display leading-[1.06] text-ink"
            />
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <h3 className="flex items-center gap-3 font-display text-2xl text-ink">
                <Check className="h-5 w-5 text-gold" strokeWidth={1.4} aria-hidden="true" />
                El viaje incluye
              </h3>
              <ul className="mt-6 space-y-3 border-t border-ink/10 pt-6">
                {tour.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-ink/75">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.8} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6">
              <h3 className="flex items-center gap-3 font-display text-2xl text-ink">
                <Minus className="h-5 w-5 text-ink/30" strokeWidth={1.4} aria-hidden="true" />
                No incluye
              </h3>
              <ul className="mt-6 space-y-3 border-t border-ink/10 pt-6">
                {tour.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-ink/68">
                    <Minus className="mt-1 h-3.5 w-3.5 shrink-0 text-ink/25" strokeWidth={1.8} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-md text-[0.84rem] leading-relaxed text-muted">
                Si necesitas que nos encarguemos de algo que no aparece en la lista, dínoslo y lo
                miramos: casi siempre se puede añadir.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Galería del viaje */}
      <section className="grain relative bg-sand py-section">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Reveal>
                <Eyebrow number="04">Galería</Eyebrow>
              </Reveal>
              <SplitText
                as="h2"
                text="Cómo se ve esta ruta."
                className="mt-6 text-display leading-[1.06] text-ink"
              />
            </div>
            <Reveal delay={0.12}>
              <ButtonLink href="/galeria" variant="outline" withArrow>
                Toda la galería
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-12">
            <TourGallery keys={tour.gallery} />
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="grain relative bg-paper py-section">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow number="05">Dudas</Eyebrow>
              </Reveal>
              <SplitText
                as="h2"
                text="Antes de reservar."
                className="mt-6 text-title leading-[1.1] text-ink"
              />
              <Reveal delay={0.12} className="mt-8">
                <ButtonLink href="/faq" variant="outline" withArrow>
                  Todas las preguntas
                </ButtonLink>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={featuredFaq.slice(0, 6)} defaultOpenFirst />
          </div>
        </div>
      </section>

      {/* El otro viaje */}
      {other && (
        <section className="relative overflow-hidden bg-ink">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[18rem] lg:min-h-[30rem]">
              <ImageReveal
                image={other.cardImage}
                className="absolute inset-0"
                sizes="(max-width: 1024px) 100vw, 50vw"
                mask={false}
                parallax={5}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-ink/30" />
            </div>
            <div className="flex items-center px-6 py-16 md:px-12 lg:px-16">
              <div>
                <p className="eyebrow text-gold-soft">
                  <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
                  La otra ruta
                </p>
                <h2 className="mt-6 max-w-md text-title leading-tight text-sand">{other.name}</h2>
                <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-sand/62">
                  {other.claim}
                </p>
                <p className="mt-4 text-[0.82rem] tracking-wide text-sand/58">
                  {other.days} días · {other.nights} noches · {other.bestFor}
                </p>
                <Link
                  href={`/viajes/${other.slug}`}
                  className="group mt-9 inline-flex items-center gap-2.5 border border-sand/40 px-7 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-sand uppercase transition-colors duration-500 hover:border-sand hover:bg-sand/10"
                >
                  Ver este viaje
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <JsonLd data={tourJsonLd(tour.slug)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Viajes', path: '/viajes' },
          { name: tour.name, path: `/viajes/${tour.slug}` },
        ])}
      />
    </>
  )
}

function Fact({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 pr-4">
      <dt className="flex items-center gap-2 text-[0.6rem] font-medium tracking-[0.2em] text-muted uppercase">
        <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.4} aria-hidden={true} />
        {label}
      </dt>
      <dd className="font-display text-lg leading-snug text-ink md:text-xl">{children}</dd>
    </div>
  )
}

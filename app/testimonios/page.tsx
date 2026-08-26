import type { Metadata } from 'next'
import { ArrowUpRight, Quote, Star } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Divider, Eyebrow } from '@/components/ui/Section'
import { images } from '@/data/images'
import { social, whatsappUrl } from '@/data/site'
import { hasTestimonials, testimonials } from '@/data/testimonials'
import { tours } from '@/data/tours'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Testimonios de viajeros',
  description:
    'Opiniones de quienes han viajado a Marruecos con Yalah Viajes. Publicamos únicamente testimonios reales de nuestros viajeros.',
  path: '/testimonios',
  image: {
    url: '/img/amanecer-viajera.jpg',
    width: 1179,
    height: 1557,
    alt: 'Viajera contemplando el amanecer sobre las dunas',
  },
})

function formatDate(value?: string) {
  if (!value) return null
  const [year, month] = value.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
}

export default function TestimoniosPage() {
  return (
    <>
      <PageHero
        image="amanecer-viajera"
        eyebrow="Testimonios"
        title="Lo que cuentan quienes ya han ido."
        lead={
          hasTestimonials
            ? 'Opiniones de viajeros que han hecho la ruta con nosotros, con su nombre y el viaje que hicieron.'
            : 'Aquí irán las opiniones de nuestros viajeros. Publicamos solo las reales, con nombre y viaje.'
        }
        crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Testimonios' },
        ]}
      />

      {hasTestimonials ? (
        <section className="grain relative bg-paper py-section">
          <div className="container-page">
            {/* Composición editorial: el primer testimonio ocupa el ancho */}
            <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
              {testimonials.map((t, i) => {
                const tour = tours.find((x) => x.slug === t.tourSlug)
                const featured = i === 0
                const photo = t.photo ? images[t.photo] : null

                return (
                  <Reveal
                    key={t.id}
                    delay={(i % 2) * 0.08}
                    className={featured ? 'md:col-span-2' : undefined}
                  >
                    <figure
                      className={`flex h-full flex-col border-t border-ink/12 pt-8 ${
                        featured ? 'md:flex-row md:items-start md:gap-12' : ''
                      }`}
                    >
                      {featured && photo && (
                        <div className="mb-7 w-full shrink-0 md:mb-0 md:w-2/5">
                          <ImageReveal
                            image={t.photo!}
                            className="aspect-4/3"
                            sizes="(max-width: 768px) 100vw, 38vw"
                          />
                        </div>
                      )}

                      <div className="flex flex-1 flex-col">
                        <Quote className="h-5 w-5 text-gold" strokeWidth={1.2} aria-hidden="true" />

                        {t.rating && (
                          <div className="mt-4 flex items-center gap-1" aria-label={`${t.rating} de 5`}>
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star
                                key={s}
                                className={`h-3.5 w-3.5 ${
                                  s < t.rating! ? 'fill-gold text-gold' : 'text-ink/18'
                                }`}
                                strokeWidth={1.2}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        )}

                        <blockquote
                          className={`mt-5 flex-1 font-display leading-snug text-ink ${
                            featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                          }`}
                        >
                          {t.quote ?? t.text}
                        </blockquote>

                        {t.quote && t.text !== t.quote && (
                          <p className="mt-5 text-[0.95rem] leading-relaxed text-ink/68">{t.text}</p>
                        )}

                        <figcaption className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] tracking-[0.16em] text-muted uppercase">
                          <span className="text-ink">{t.name}</span>
                          {t.location && <span>· {t.location}</span>}
                          {tour && <span className="text-gold-deep">· {tour.name}</span>}
                          {formatDate(t.date) && <span>· {formatDate(t.date)}</span>}
                        </figcaption>
                      </div>
                    </figure>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      ) : (
        <EmptyState />
      )}

      <section className="grain relative bg-sand py-20 md:py-28">
        <div className="container-page text-center">
          <Divider className="mx-auto max-w-24" />
          <Reveal>
            <h2 className="mx-auto mt-8 max-w-2xl text-title leading-tight text-ink">
              ¿Has viajado con nosotros?
            </h2>
            <p className="mx-auto mt-5 max-w-lg prose-editorial">
              Cuéntanos cómo fue. Publicamos los testimonios tal cual nos llegan, con tu nombre y el
              viaje que hiciste — nunca reseñas inventadas.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink
              href={whatsappUrl('Hola Yalah Viajes, quiero contaros cómo fue mi viaje.')}
              size="lg"
              withArrow
            >
              Contar mi experiencia
            </ButtonLink>
            <ButtonLink href="/viajes" variant="outline" size="lg">
              Ver los viajes
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Testimonios', path: '/testimonios' },
        ])}
      />
    </>
  )
}

/**
 * Estado sin testimonios.
 *
 * Es deliberado: mientras la agencia no facilite opiniones reales, esta página
 * no inventa ninguna. En su lugar explica la política y lleva al Instagram,
 * donde sí hay material real de los viajes.
 */
function EmptyState() {
  return (
    <section className="grain relative bg-paper py-section">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow number="01">Todavía no hay reseñas publicadas</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            by="line"
            text={'Preferimos una página\nvacía a una reseña falsa.'}
            className="mt-6 text-display leading-[1.06] text-ink"
          />
          <Reveal delay={0.1} className="mt-8 prose-editorial">
            <p>
              Somos una agencia joven. Podríamos llenar esta página de estrellas y frases genéricas,
              pero no serviría de nada: no serían de nadie.
            </p>
            <p>
              Iremos publicando aquí los testimonios de nuestros viajeros a medida que nos los
              manden, con su nombre, la fecha y la ruta que hicieron. Mientras tanto, lo más honesto
              que podemos enseñarte es el trabajo del día a día en Instagram, y nuestro teléfono
              para que preguntes lo que quieras.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {social.map((s) => (
              <ButtonLink key={s.name} href={s.href}>
                Ver {s.handle}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              </ButtonLink>
            ))}
            <ButtonLink href="/contacto" variant="outline">
              Preguntar lo que quieras
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:gap-6">
          <ImageReveal
            image="musicos-bereberes"
            className="aspect-square"
            sizes="(max-width: 1024px) 46vw, 24vw"
          />
          <ImageReveal
            image="duna-caminando"
            className="mt-8 aspect-3/4"
            sizes="(max-width: 1024px) 46vw, 24vw"
            parallax={4}
          />
          <ImageReveal
            image="riad-desayuno"
            className="aspect-3/4"
            sizes="(max-width: 1024px) 46vw, 24vw"
            parallax={4}
          />
          <ImageReveal
            image="jemaa-el-fna-noche"
            className="mt-8 aspect-square"
            sizes="(max-width: 1024px) 46vw, 24vw"
          />
        </div>
      </div>
    </section>
  )
}

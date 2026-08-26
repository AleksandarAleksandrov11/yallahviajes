import Link from 'next/link'
import { ArrowUpRight, Quote } from 'lucide-react'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Section'
import { social } from '@/data/site'
import { hasTestimonials, testimonials } from '@/data/testimonials'
import { tours } from '@/data/tours'

/**
 * Testimonios en la home.
 *
 * Mientras Yalah Viajes no facilite opiniones reales, no se inventa ninguna:
 * el bloque se transforma en una invitación honesta a ver el día a día en
 * Instagram y a preguntar directamente. En cuanto se añadan testimonios a
 * data/testimonials.ts, esta sección pasa a mostrarlos automáticamente.
 */
export function TestimonialsTeaser() {
  return (
    <section className="grain relative bg-paper py-section">
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow number="07">Viajeros</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text={hasTestimonials ? 'Lo cuentan mejor ellos.' : 'Las historias las escribís vosotros.'}
            className="mt-6 text-display leading-[1.06] text-ink"
          />
        </div>

        {hasTestimonials ? (
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <figure className="flex h-full flex-col border-t border-ink/12 pt-7">
                  <Quote className="h-5 w-5 text-gold" strokeWidth={1.2} aria-hidden="true" />
                  <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-ink md:text-2xl">
                    {t.quote ?? t.text}
                  </blockquote>
                  <figcaption className="mt-6 text-[0.72rem] tracking-[0.16em] text-muted uppercase">
                    {t.name}
                    {t.tourSlug && (
                      <span className="text-gold-deep">
                        {' · '}
                        {tours.find((x) => x.slug === t.tourSlug)?.name}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="prose-editorial">
                Somos una agencia joven y preferimos no rellenar esta página con frases inventadas.
                Publicamos aquí las opiniones de nuestros viajeros según las vamos recibiendo, con
                su nombre y el viaje que hicieron.
              </p>
              <p className="mt-5 prose-editorial">
                Mientras tanto, el día a día de las rutas está en nuestro Instagram: fotos y vídeos
                de los grupos que van saliendo, sin filtro.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                {social.map((s) => (
                  <ButtonLink key={s.name} href={s.href} variant="primary">
                    Ver {s.handle}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                  </ButtonLink>
                ))}
                <Link
                  href="/testimonios"
                  className="link-underline self-start text-[0.8rem] text-ink/65 sm:self-auto"
                >
                  Cuéntanos tu experiencia
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:gap-6">
              <ImageReveal
                image="duna-caminando"
                className="aspect-3/4"
                sizes="(max-width: 1024px) 46vw, 24vw"
              />
              <ImageReveal
                image="quad-dunas"
                className="mt-10 aspect-3/4"
                sizes="(max-width: 1024px) 46vw, 24vw"
                parallax={5}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

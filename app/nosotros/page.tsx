import type { Metadata } from 'next'
import { Instagram } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Divider, Eyebrow } from '@/components/ui/Section'
import { Mark } from '@/components/brand/Logo'
import { contact, site, social, whatsappUrl } from '@/data/site'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Quiénes somos',
  description:
    'Yalah Viajes organiza desde España viajes a Marruecos y acompaña a los viajeros sobre el terreno con conductor y guía de habla hispana. Así trabajamos.',
  path: '/nosotros',
  image: {
    url: '/img/dades-carretera-roja.jpg',
    width: 1200,
    height: 1800,
    alt: 'Carretera entre las paredes rojizas del valle del Dades',
  },
})

const VALUES = [
  {
    title: 'Cercanía',
    text: 'Hablas con una persona, no con un centro de llamadas. La misma que te atiende al principio te contesta el mensaje que mandas desde el desierto.',
  },
  {
    title: 'Conocimiento local',
    text: 'Nuestro equipo en Marruecos es de allí. Sabe qué camino está cortado, dónde se come bien de verdad y a qué hora sale el sol sobre las dunas.',
  },
  {
    title: 'Claridad',
    text: 'Lo que entra en el precio está escrito y lo que no, también. Preferimos decir «esto no lo cubrimos» antes que sorprenderte a mitad de viaje.',
  },
  {
    title: 'Sin masificar',
    text: 'Rutas pensadas para grupos pequeños, con tiempo para pararse a mirar. No hacemos turismo de autobús.',
  },
]

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        image="dades-carretera-roja"
        eyebrow="Quiénes somos"
        title="Organizamos tu viaje a Marruecos desde España."
        lead="Yalah Viajes nace para que ir a Marruecos desde España sea sencillo, seguro y de verdad."
        crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Nosotros' },
        ]}
      />

      <section className="grain relative bg-paper py-section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow number="01">La historia</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              by="line"
              text={'«Yalah» significa\nvamos, en marcha.'}
              className="mt-6 text-display leading-[1.06] text-ink"
            />
            <Reveal delay={0.1} className="mt-8 prose-editorial">
              <p>
                Es una de esas palabras que en Marruecos se oyen todo el día: en el zoco, en la
                carretera, cuando alguien te empuja cariñosamente a moverte. Nos pareció el nombre
                exacto para lo que hacemos.
              </p>
              <p>
                Yalah Viajes existe porque mucha gente en España quiere conocer Marruecos y no sabe
                por dónde empezar: qué ruta hacer, dónde dormir en el desierto, si hará falta hablar
                árabe, si es buena idea alquilar un coche. Nosotros resolvemos todo eso antes de que
                cojas el vuelo.
              </p>
              <p>
                Organizamos el viaje desde España, en tu idioma y en tu horario. Y cuando aterrizas
                en Marrakech, te espera nuestro equipo sobre el terreno: un conductor y un guía de
                habla hispana que te acompañan durante todo el recorrido, desde el aeropuerto hasta
                la última noche.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <ImageReveal
              image="musicos-bereberes"
              className="aspect-4/5"
              sizes="(max-width: 1024px) 100vw, 38vw"
              parallax={5}
            />
            <Reveal delay={0.12}>
              <figure className="mt-8 border-l border-gold/45 pl-6">
                <blockquote className="font-display text-xl leading-snug text-ink italic">
                  Tu viaje a Marruecos, organizado desde España. A un viaje de distancia.
                </blockquote>
                <figcaption className="mt-3 text-[0.62rem] tracking-[0.22em] text-muted uppercase">
                  {site.name}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos: dos lados */}
      <section className="grain relative overflow-hidden bg-ink py-section text-sand">
        <div
          aria-hidden="true"
          className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.05]"
        />
        <div className="container-page relative">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow number="02" tone="light">
                Cómo trabajamos
              </Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Dos orillas, un solo viaje."
              className="mt-6 text-display leading-[1.06] text-sand"
            />
          </div>

          <div className="mt-16 grid gap-px md:grid-cols-2">
            <Reveal className="border-t border-sand/14 py-10 md:pr-12">
              <span className="text-[0.6rem] tracking-[0.24em] text-gold-soft uppercase">
                Desde España
              </span>
              <h3 className="mt-5 font-display text-3xl leading-tight text-sand">
                La organización
              </h3>
              <p className="mt-4 max-w-md text-[0.96rem] leading-relaxed text-sand/62">
                Aquí es donde empieza todo: resolvemos tus dudas, te proponemos la ruta que encaja
                con tus días y tu ritmo, ajustamos los horarios a los vuelos y dejamos
                cerrado alojamiento, comidas, transporte y actividades. Todo por escrito, antes de
                que pagues nada.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="border-t border-sand/14 py-10 md:pl-12">
              <span className="text-[0.6rem] tracking-[0.24em] text-gold-soft uppercase">
                En Marruecos
              </span>
              <h3 className="mt-5 font-display text-3xl leading-tight text-sand">
                El acompañamiento
              </h3>
              <p className="mt-4 max-w-md text-[0.96rem] leading-relaxed text-sand/62">
                Nuestro conductor y nuestro guía te recogen en el aeropuerto y no te sueltan hasta el
                final. Conducen por ti, traducen, te cuentan la historia de cada kasbah y te
                llevan a los sitios donde ellos comerían. Si surge un imprevisto, lo resuelven allí
                mismo.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3 md:gap-6">
            <ImageReveal
              image="jaima-nomada"
              className="aspect-4/3"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
            <ImageReveal
              image="valle-pueblo"
              className="aspect-4/3"
              sizes="(max-width: 768px) 100vw, 30vw"
              parallax={4}
            />
            <ImageReveal
              image="te-menta"
              className="aspect-4/3"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="grain relative bg-sand py-section">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow number="03">Lo que nos importa</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Cuatro cosas que no negociamos."
              className="mt-6 text-display leading-[1.06] text-ink"
            />
          </div>

          <RevealGroup as="dl" className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {VALUES.map((value, i) => (
              <RevealItem key={value.title} className="border-t border-ink/12 pt-6">
                <dt className="flex items-baseline gap-4">
                  <span className="font-sans text-[0.6rem] tracking-[0.24em] text-gold-deep tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-2xl text-ink">{value.title}</span>
                </dt>
                <dd className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink/68">
                  {value.text}
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-14 max-w-2xl text-[0.84rem] leading-relaxed text-muted">
              Preferimos no adornar esta página con cifras genéricas. Lo que puedes comprobar es el
              trabajo: nuestras rutas, nuestras fotos y un teléfono al otro lado siempre que lo
              necesites.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cierre */}
      <section className="grain relative bg-paper py-20 md:py-28">
        <div className="container-page text-center">
          <Reveal>
            <Mark className="mx-auto h-10 w-10 text-ink" />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-8 max-w-2xl text-title leading-tight text-ink">
              ¿Hablamos de tu viaje?
            </h2>
            <p className="mx-auto mt-5 max-w-lg prose-editorial">
              Escríbenos sin compromiso. Te contamos cómo sería, cuánto costaría y qué días son
              mejores para ir.
            </p>
          </Reveal>
          <Reveal delay={0.14} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/contacto" size="lg" withArrow>
              Hablar con Yalah Viajes
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} variant="outline" size="lg">
              WhatsApp {contact.phoneDisplay}
            </ButtonLink>
          </Reveal>
          <Divider className="mx-auto mt-14 max-w-40" />
          <Reveal delay={0.18}>
            <div className="mt-8 flex items-center justify-center gap-6">
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2.5 text-[0.82rem] text-ink/65"
                >
                  <Instagram className="h-4 w-4 text-gold" strokeWidth={1.4} aria-hidden="true" />
                  {s.handle}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Nosotros', path: '/nosotros' },
        ])}
      />
    </>
  )
}

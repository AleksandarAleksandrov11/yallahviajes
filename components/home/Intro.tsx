import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Section'

/**
 * Sección editorial de apertura. Explica en dos párrafos lo único que
 * el visitante necesita entender: quién organiza y quién acompaña.
 */
export function HomeIntro() {
  return (
    <section className="grain relative bg-paper py-section">
      <div className="container-page">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow number="01">Mucho más que un viaje</Eyebrow>
            </Reveal>

            <SplitText
              as="h2"
              by="line"
              text={'Tú pones las ganas.\nDel resto nos ocupamos\nnosotros.'}
              className="mt-6 text-display leading-[1.06] text-ink"
            />

            <Reveal delay={0.1} className="mt-8 max-w-lg prose-editorial">
              <p>
                Marruecos debe vivirse sin prisa y sin pelearse con la logística. Por eso Yallah
                Viajes prepara el viaje contigo desde España: ruta, alojamientos, tiempos, lo que te
                apetece ver. Cuando aterrizas en Marrakech ya está todo resuelto.
              </p>
              <p>
                Allí te espera nuestro equipo. Un conductor y un guía de habla hispana te acompañan
                durante todo el recorrido: conducen, traducen, negocian, te cuentan lo que estás
                viendo y te llevan a los sitios que no salen en las guías. No eres un número en un
                grupo: eres tú quien viaja en ese coche.
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-10">
              <ButtonLink href="/nosotros" variant="outline" withArrow>
                Cómo trabajamos
              </ButtonLink>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <ImageReveal
                image="camellos-cielo-azul"
                className="col-span-2 aspect-3/2"
                sizes="(max-width: 1024px) 100vw, 42vw"
                parallax={5}
              />
              <ImageReveal
                image="te-menta"
                className="aspect-square"
                sizes="(max-width: 1024px) 50vw, 21vw"
              />
              <ImageReveal
                image="riad-desayuno"
                className="aspect-square"
                sizes="(max-width: 1024px) 50vw, 21vw"
              />
            </div>

            <Reveal delay={0.15}>
              <figure className="mt-10 border-l border-gold/45 pl-6">
                <blockquote className="font-display text-2xl leading-snug text-ink italic md:text-[1.75rem]">
                  «Yallah» es esa palabra que en Marruecos lo empuja todo: vamos, en marcha, adelante.
                </blockquote>
                <figcaption className="mt-4 text-[0.62rem] tracking-[0.22em] text-muted uppercase">
                  El nombre de la casa
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

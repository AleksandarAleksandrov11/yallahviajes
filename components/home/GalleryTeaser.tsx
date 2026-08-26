import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Section'

/**
 * Composición fotográfica de la home: tamaños distintos, aire alrededor
 * y una foto grande que manda. Nada de cuadrícula uniforme.
 */
export function GalleryTeaser() {
  return (
    <section className="grain relative bg-sand py-section">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow number="06">La galería</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Fotos nuestras, de viajes nuestros."
              className="mt-6 text-display leading-[1.06] text-ink"
            />
          </div>
          <Reveal delay={0.12} className="lg:col-span-5">
            <p className="max-w-md prose-editorial lg:pb-2">
              Ninguna imagen de banco. Todo lo que ves en esta web está hecho en las rutas que
              organizamos, por nosotros y por los viajeros que nos acompañan.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-4 md:gap-6">
          <ImageReveal
            image="amanecer-dunas"
            className="col-span-12 aspect-3/2 md:col-span-8 md:aspect-16/10"
            sizes="(max-width: 768px) 100vw, 62vw"
            parallax={5}
          />
          <div className="col-span-12 flex flex-col justify-end md:col-span-4">
            <ImageReveal
              image="cielo-estrellado"
              className="aspect-4/5"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>

          <div className="col-span-12 md:col-span-3" />
          <ImageReveal
            image="jemaa-el-fna-noche"
            className="col-span-6 aspect-square md:col-span-4"
            sizes="(max-width: 768px) 50vw, 30vw"
          />
          <ImageReveal
            image="musicos-bereberes"
            className="col-span-6 aspect-square md:col-span-5 md:aspect-4/3"
            sizes="(max-width: 768px) 50vw, 38vw"
            parallax={4}
          />
        </div>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <ButtonLink href="/galeria" variant="outline" size="lg" withArrow>
            Ver la galería completa
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}

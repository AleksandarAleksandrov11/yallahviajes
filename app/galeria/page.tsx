import type { Metadata } from 'next'
import { MasonryGallery } from '@/components/gallery/MasonryGallery'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Divider } from '@/components/ui/Section'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Galería de Marruecos',
  description:
    'Fotografías del desierto de Merzouga, Marrakech, Aït Ben Haddou y las gargantas del Dades y del Todra, tomadas en los viajes que organiza Yalah Viajes.',
  path: '/galeria',
  image: {
    url: '/img/amanecer-dunas.jpg',
    width: 1600,
    height: 1200,
    alt: 'Amanecer sobre las dunas del Erg Chebbi',
  },
})

export default function GaleriaPage() {
  return (
    <>
      <PageHero
        image="erg-chebbi"
        eyebrow="Galería"
        title="Fotos de Marruecos hechas en nuestros viajes."
        lead="Todas estas fotos están hechas en nuestras rutas. Ninguna es de banco de imágenes."
        crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Galería' },
        ]}
      />

      <section className="grain relative bg-paper py-section">
        <div className="container-page">
          <MasonryGallery />
        </div>
      </section>

      <section className="grain relative bg-sand py-20 md:py-24">
        <div className="container-page text-center">
          <Divider className="mx-auto max-w-24" />
          <Reveal>
            <h2 className="mx-auto mt-8 max-w-2xl text-title leading-tight text-ink">
              La próxima foto podría ser tuya.
            </h2>
            <p className="mx-auto mt-5 max-w-lg prose-editorial">
              Cuéntanos cuándo quieres ir y preparamos la ruta. Nosotros ponemos el desierto; tú, la
              cámara.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/viajes" size="lg" withArrow>
              Ver los viajes
            </ButtonLink>
            <ButtonLink href="/contacto" variant="outline" size="lg">
              Planificar mi viaje
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Galería', path: '/galeria' },
        ])}
      />
    </>
  )
}

import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Section'
import { TourCard } from '@/components/trips/TourCard'
import { tours } from '@/data/tours'

export function Trips() {
  return (
    <section className="grain relative bg-paper py-section" id="viajes">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow number="04">Nuestros viajes</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Dos rutas. La misma forma de viajar."
              className="mt-6 text-display leading-[1.06] text-ink"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg prose-editorial">
                Comparten el recorrido por el Atlas, Aït Ben Haddou y las gargantas. La diferencia
                está en el desierto: una noche o dos, y una jornada entera para conocerlo por dentro.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <ButtonLink href="/viajes" variant="outline" withArrow className="shrink-0">
              Comparar los dos viajes
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-14">
          {tours.map((tour, i) => (
            <Reveal key={tour.slug} delay={i * 0.1} className="h-full">
              <TourCard tour={tour} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

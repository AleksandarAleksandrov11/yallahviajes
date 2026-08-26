import Link from 'next/link'
import { ArrowRight, CalendarDays, MapPin, Moon } from 'lucide-react'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { priceLabel, type Tour } from '@/data/tours'

/**
 * Tarjeta de viaje. Muestra de un vistazo lo que el usuario necesita para
 * decidir: duración, recorrido, experiencias y precio (o «a consultar»
 * mientras la agencia no lo facilite).
 */
export function TourCard({ tour, index }: { tour: Tour; index: number }) {
  return (
    <article className="group relative flex h-full flex-col">
      <Link href={`/viajes/${tour.slug}`} className="absolute inset-0 z-10" aria-label={`Ver ${tour.name}`}>
        <span className="sr-only">Ver el itinerario de {tour.name}</span>
      </Link>

      <div className="relative overflow-hidden">
        <ImageReveal
          image={tour.cardImage}
          className="aspect-4/5 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:aspect-3/2"
          sizes="(max-width: 768px) 100vw, 48vw"
        />
        <span className="absolute top-5 left-5 bg-paper/92 px-3.5 py-2 text-[0.6rem] font-medium tracking-[0.18em] text-ink uppercase backdrop-blur-sm">
          {tour.days} días · {tour.nights} noches
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-7">
        <span className="font-sans text-[0.6rem] tracking-[0.24em] text-gold-deep tabular-nums uppercase">
          {String(index + 1).padStart(2, '0')} — Ruta de {tour.days} días
        </span>

        <h3 className="mt-4 text-title leading-tight text-ink transition-colors duration-500 group-hover:text-ink-2">
          {tour.name}
        </h3>

        <p className="mt-3 text-[0.88rem] text-ink/60 italic">{tour.bestFor}</p>

        <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-ink/68">{tour.claim}</p>

        <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[0.8rem] text-ink/68">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 text-gold" strokeWidth={1.4} aria-hidden="true" />
            <dt className="sr-only">Duración</dt>
            <dd>{tour.days} días</dd>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="h-3.5 w-3.5 text-gold" strokeWidth={1.4} aria-hidden="true" />
            <dt className="sr-only">Noches en el desierto</dt>
            <dd>{tour.slug === 'marruecos-6-dias' ? '2 noches en el desierto' : '1 noche en el desierto'}</dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-gold" strokeWidth={1.4} aria-hidden="true" />
            <dt className="sr-only">Salida</dt>
            <dd>Desde Marrakech</dd>
          </div>
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2">
          {tour.route.map((stop) => (
            <li
              key={stop}
              className="border border-ink/12 px-3 py-1.5 text-[0.7rem] tracking-wide text-ink/68"
            >
              {stop}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-6 border-t border-ink/10 pt-7">
          <p className="font-display text-xl text-ink">
            {priceLabel(tour.price)}
            {tour.price.from === null && (
              <span className="mt-1 block font-sans text-[0.68rem] tracking-wide text-muted normal-case">
                Escríbenos y te lo damos cerrado
              </span>
            )}
          </p>
          <span className="inline-flex items-center gap-2.5 text-[0.68rem] font-medium tracking-[0.18em] text-ink uppercase">
            Ver itinerario
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </article>
  )
}

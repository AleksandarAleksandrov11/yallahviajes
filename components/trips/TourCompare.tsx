import Link from 'next/link'
import { Check, Minus } from 'lucide-react'
import { tours } from '@/data/tours'
import { priceLabel } from '@/data/tours'

/**
 * Tabla comparativa de los dos viajes. Solo compara conceptos que constan
 * en los dossieres: nada de inventar servicios para rellenar filas.
 */
const ROWS: { label: string; get: (slug: string) => string | boolean }[] = [
  { label: 'Duración', get: (s) => (s === 'marruecos-5-dias' ? '5 días · 4 noches' : '6 días · 5 noches') },
  { label: 'Noches en Marrakech', get: () => '2 con desayuno' },
  { label: 'Noche en el valle del Dades', get: () => 'Con cena y desayuno' },
  { label: 'Noches en el desierto', get: (s) => (s === 'marruecos-5-dias' ? '1 en campamento de lujo' : '2: campamento + hotel') },
  { label: 'Paseo en dromedario', get: () => '1 hora' },
  { label: 'Aït Ben Haddou', get: () => true },
  { label: 'Gargantas del Todra', get: () => true },
  { label: 'Palmeral de Skoura y kasbah de Amridil', get: (s) => s === 'marruecos-5-dias' },
  { label: 'Cooperativa de argán', get: (s) => s === 'marruecos-6-dias' },
  { label: 'Excursión en 4x4 por el desierto', get: (s) => s === 'marruecos-6-dias' },
  { label: 'Visita a familias nómadas', get: (s) => s === 'marruecos-6-dias' },
  { label: 'Música en vivo en Khamlia', get: (s) => s === 'marruecos-6-dias' },
  { label: 'Sandboard', get: (s) => s === 'marruecos-5-dias' },
  { label: 'Traje bereber y henna', get: () => true },
  { label: 'Transporte con A/C y traslados', get: () => true },
  { label: 'Conductor y guía de habla hispana', get: () => true },
]

export function TourCompare() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">
          Comparativa entre el viaje de 5 días y el viaje de 6 días por Marruecos
        </caption>
        <thead>
          <tr className="border-b border-ink/15">
            <th scope="col" className="w-2/5 py-5 pr-6 text-[0.64rem] font-medium tracking-[0.16em] text-muted uppercase">
              Qué incluye cada ruta
            </th>
            {tours.map((tour) => (
              <th key={tour.slug} scope="col" className="py-5 pr-6 align-bottom">
                <Link href={`/viajes/${tour.slug}`} className="group block">
                  <span className="block text-[0.6rem] tracking-[0.18em] text-gold-deep uppercase">
                    {tour.days} días · {tour.nights} noches
                  </span>
                  <span className="mt-2 block font-display text-2xl leading-tight text-ink transition-colors group-hover:text-gold-deep">
                    {tour.name}
                  </span>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-b border-ink/8">
              <th scope="row" className="py-4 pr-6 text-left text-[0.92rem] font-normal text-ink/78">
                {row.label}
              </th>
              {tours.map((tour) => {
                const value = row.get(tour.slug)
                return (
                  <td key={tour.slug} className="py-4 pr-6 text-[0.9rem] text-ink/68">
                    {typeof value === 'boolean' ? (
                      value ? (
                        <>
                          <Check className="h-4 w-4 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
                          <span className="sr-only">Incluido</span>
                        </>
                      ) : (
                        <>
                          <Minus className="h-4 w-4 text-ink/22" strokeWidth={1.6} aria-hidden="true" />
                          <span className="sr-only">No incluido</span>
                        </>
                      )
                    ) : (
                      value
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
          <tr>
            <th scope="row" className="py-5 pr-6 text-left text-[0.92rem] font-normal text-ink/78">
              Precio
            </th>
            {tours.map((tour) => (
              <td key={tour.slug} className="py-5 pr-6">
                <span className="font-display text-xl text-ink">{priceLabel(tour.price)}</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

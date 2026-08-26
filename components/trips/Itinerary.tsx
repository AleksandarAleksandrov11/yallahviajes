'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Moon, Plus, UtensilsCrossed } from 'lucide-react'
import { images } from '@/data/images'
import type { ItineraryDay } from '@/data/tours'

const MEAL_LABEL: Record<string, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  cena: 'Cena',
}

/**
 * Itinerario día a día como línea de tiempo vertical. Cada día se despliega
 * con su descripción completa, sus hitos, las comidas incluidas y dónde se
 * duerme. El primer día viene abierto para que se entienda el patrón.
 */
export function Itinerary({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState<number | null>(days[0]?.day ?? null)

  return (
    <ol className="relative">
      {/* Línea vertical de la ruta */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[0.9rem] w-px bg-ink/12 md:left-[1.4rem]"
      />

      {days.map((day) => {
        const isOpen = open === day.day
        const asset = images[day.image]

        return (
          <li key={day.day} className="relative pl-10 md:pl-16">
            <span
              aria-hidden="true"
              className={`absolute top-7 left-[0.55rem] h-2.5 w-2.5 rotate-45 transition-colors duration-500 md:left-[1.05rem] ${
                isOpen ? 'bg-gold' : 'bg-ink/25'
              }`}
            />

            <div className="border-b border-ink/10">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : day.day)}
                  aria-expanded={isOpen}
                  aria-controls={`dia-${day.day}`}
                  id={`dia-trigger-${day.day}`}
                  className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
                >
                  <span className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:gap-6">
                    <span className="shrink-0 font-sans text-[0.62rem] tracking-[0.22em] text-gold-deep tabular-nums uppercase">
                      Día {String(day.day).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block font-display text-2xl leading-snug text-ink transition-colors duration-300 group-hover:text-gold-deep md:text-[1.75rem]">
                        {day.title}
                      </span>
                      <span className="mt-1.5 block font-sans text-[0.82rem] font-normal text-muted">{day.route}</span>
                    </span>
                  </span>
                  <span className="mt-1.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors duration-300 group-hover:border-gold/50">
                    <Plus
                      className={`h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`dia-${day.day}`}
                    role="region"
                    aria-labelledby={`dia-trigger-${day.day}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-9 lg:grid-cols-12 lg:gap-10">
                      <div className="lg:col-span-7">
                        <p className="max-w-2xl text-[0.98rem] leading-relaxed text-ink/72">
                          {day.description}
                        </p>

                        {day.highlights.length > 0 && (
                          <ul className="mt-6 flex flex-wrap gap-2">
                            {day.highlights.map((h) => (
                              <li
                                key={h}
                                className="border border-ink/12 px-3 py-1.5 text-[0.72rem] tracking-wide text-ink/68"
                              >
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}

                        <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/10 pt-5 text-[0.84rem]">
                          <div className="flex items-center gap-2.5">
                            <UtensilsCrossed
                              className="h-3.5 w-3.5 text-gold"
                              strokeWidth={1.4}
                              aria-hidden="true"
                            />
                            <dt className="sr-only">Comidas incluidas</dt>
                            <dd className="text-ink/68">
                              {day.meals.length > 0
                                ? day.meals.map((m) => MEAL_LABEL[m]).join(' · ')
                                : 'Comidas no incluidas este día'}
                            </dd>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <Moon className="h-3.5 w-3.5 text-gold" strokeWidth={1.4} aria-hidden="true" />
                            <dt className="sr-only">Alojamiento</dt>
                            <dd className="text-ink/68">{day.stay ?? 'Vuelo de regreso'}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="lg:col-span-5">
                        <div className="relative aspect-4/3 overflow-hidden bg-sand-2">
                          <Image
                            src={asset.src}
                            alt={asset.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 34vw"
                            quality={80}
                            placeholder="blur"
                            blurDataURL={asset.blurDataURL}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

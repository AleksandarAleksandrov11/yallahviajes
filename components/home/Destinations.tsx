'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useState } from 'react'
import { destinations } from '@/data/destinations'
import { images } from '@/data/images'
import { Reveal } from '@/components/motion/Reveal'
import { Eyebrow } from '@/components/ui/Section'
import { SplitText } from '@/components/motion/SplitText'

/**
 * Índice de destinos. En escritorio funciona como una lista editorial:
 * al pasar el cursor por cada nombre se revela su fotografía.
 * En móvil se convierte en un carrusel con scroll horizontal.
 * Solo aparecen lugares que se visitan realmente en los itinerarios.
 */
export function Destinations() {
  const [active, setActive] = useState(0)

  return (
    <section className="grain relative bg-sand py-section">
      <div className="container-page">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow number="03">Dónde vamos</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text="Del zoco de Marrakech al último pueblo antes del Sahara."
            className="mt-6 text-display leading-[1.06] text-ink"
          />
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl prose-editorial">
              Estos son los lugares por los que pasan nuestras rutas. Ni uno más: preferimos contar
              solo lo que vais a ver de verdad.
            </p>
          </Reveal>
        </div>

        {/* Escritorio: lista + visor */}
        <div className="mt-16 hidden gap-16 lg:grid lg:grid-cols-12">
          <ul className="lg:col-span-6" onMouseLeave={() => setActive(0)}>
            {destinations.map((dest, i) => (
              <li key={dest.name} className="border-b border-ink/10 first:border-t">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-describedby={`dest-${i}`}
                  className="group flex w-full items-baseline gap-6 py-6 text-left"
                >
                  <span className="w-6 shrink-0 font-sans text-[0.6rem] tracking-[0.2em] text-gold-deep/70 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block font-display text-3xl leading-none transition-colors duration-500 xl:text-4xl ${
                        active === i ? 'text-ink' : 'text-ink/50'
                      }`}
                    >
                      {dest.name}
                    </span>
                    <span
                      id={`dest-${i}`}
                      className={`mt-2.5 block max-w-md text-[0.9rem] leading-relaxed transition-opacity duration-500 ${
                        active === i ? 'text-ink/68 opacity-100' : 'text-ink/60 opacity-70'
                      }`}
                    >
                      {dest.description}
                    </span>
                  </span>
                  <span className="shrink-0 text-[0.6rem] tracking-[0.16em] text-gold-deep uppercase">
                    {dest.kicker}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-6">
            <div className="sticky top-32 aspect-4/5 overflow-hidden bg-sand-2">
              {destinations.map((dest, i) => {
                const asset = images[dest.image]
                return (
                  <motion.div
                    key={dest.name}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden={active !== i}
                  >
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      sizes="46vw"
                      quality={82}
                      placeholder="blur"
                      blurDataURL={asset.blurDataURL}
                      className="object-cover"
                    />
                  </motion.div>
                )
              })}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent"
              />
              <p className="absolute bottom-6 left-6 font-display text-2xl text-sand">
                {destinations[active].name}
              </p>
            </div>
          </div>
        </div>

        {/* Móvil y tablet: carrusel */}
        <ul className="no-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 lg:hidden">
          {destinations.map((dest, i) => {
            const asset = images[dest.image]
            return (
              <li key={dest.name} className="w-[76vw] shrink-0 snap-start sm:w-[46vw]">
                <div className="relative aspect-4/5 overflow-hidden bg-sand-2">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    sizes="(max-width: 640px) 76vw, 46vw"
                    quality={80}
                    placeholder="blur"
                    blurDataURL={asset.blurDataURL}
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/82 via-ink/35 to-transparent"
                  />
                  <div className="absolute inset-x-5 bottom-5">
                    <span className="text-[0.55rem] tracking-[0.2em] text-gold-soft uppercase">
                      {String(i + 1).padStart(2, '0')} · {dest.kicker}
                    </span>
                    <h3 className="mt-1.5 font-display text-2xl text-sand">{dest.name}</h3>
                  </div>
                </div>
                <p className="mt-3.5 text-[0.9rem] leading-relaxed text-ink/68">{dest.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

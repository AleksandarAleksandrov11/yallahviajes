'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { images } from '@/data/images'
import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { Eyebrow } from '@/components/ui/Section'

const STEPS = [
  {
    n: '01',
    title: 'Nos escribes desde España',
    text: 'Por WhatsApp, por teléfono o desde el formulario. Nos cuentas cuántos vais a viajar, qué fechas manejas y qué te apetece ver.',
    image: 'marrakech-koutoubia-pastel' as const,
  },
  {
    n: '02',
    title: 'Elegimos la ruta que te encaja',
    text: 'Cinco días o seis, una noche en el desierto o dos. Te decimos con claridad qué entra en cada opción y qué no.',
    image: 'dunas-minimal' as const,
  },
  {
    n: '03',
    title: 'Organizamos la experiencia',
    text: 'Alojamientos, comidas, transporte, guía y actividades. Cerramos los horarios en función de tus vuelos.',
    image: 'riad-desayuno' as const,
  },
  {
    n: '04',
    title: 'Llegas a Marrakech',
    text: 'Te esperamos en el aeropuerto a la hora de llegada del vuelo y te llevamos al alojamiento en la Medina.',
    image: 'marrakech-zoco' as const,
  },
  {
    n: '05',
    title: 'Nuestros guías te acompañan',
    text: 'El mismo conductor y guía durante todo el recorrido: conduce, traduce y te cuenta lo que estás viendo.',
    image: 'valle-pueblo' as const,
  },
  {
    n: '06',
    title: 'Disfrutas del viaje',
    text: 'Tú solo tienes que mirar por la ventanilla, subir a la duna y quedarte a ver el amanecer.',
    image: 'amanecer-viajera' as const,
  },
]

/**
 * Cómo funciona, contado como un recorrido. La fotografía queda fija a la
 * derecha y cambia según el paso que el usuario tiene delante: es la parte
 * de «sticky storytelling» de la home, y solo se usa aquí.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })

  return (
    <section className="grain relative overflow-hidden bg-ink-deep py-section text-sand">
      <div className="container-page relative">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow number="05" tone="light">
              Cómo funciona
            </Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text="De un mensaje a un amanecer en el Sahara."
            className="mt-6 text-display leading-[1.06] text-sand"
          />
        </div>

        <div ref={ref} className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-20">
          <ol className="lg:col-span-6">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-18% 0px -18% 0px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative border-l border-sand/14 pb-12 pl-8 last:pb-0 md:pl-10"
              >
                <span className="absolute top-1.5 -left-px h-8 w-px bg-gold" aria-hidden="true" />
                <span className="block font-sans text-[0.6rem] tracking-[0.26em] text-gold-soft tabular-nums">
                  {step.n}
                </span>
                <h3 className="mt-3 text-2xl leading-snug text-sand md:text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-sand/58">{step.text}</p>

                {/* En móvil cada paso lleva su propia imagen */}
                <div className="relative mt-6 aspect-3/2 overflow-hidden lg:hidden">
                  <Image
                    src={images[step.image].src}
                    alt={images[step.image].alt}
                    fill
                    sizes="100vw"
                    quality={78}
                    placeholder="blur"
                    blurDataURL={images[step.image].blurDataURL}
                    className="object-cover"
                  />
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-4/5 overflow-hidden bg-ink-2">
                {STEPS.map((step, i) => (
                  <StickyFrame
                    key={step.n}
                    progress={scrollYProgress}
                    index={i}
                    total={STEPS.length}
                    image={step.image}
                  />
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-sand/14" />
                <span className="text-[0.6rem] tracking-[0.24em] text-sand/55 uppercase">
                  Seis pasos, cero sorpresas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StickyFrame({
  progress,
  index,
  total,
  image,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  index: number
  total: number
  image: keyof typeof images
}) {
  const band = 1 / total
  const start = index * band
  const opacity = useTransform(
    progress,
    [start - band * 0.5, start + band * 0.15, start + band * 0.85, start + band * 1.5],
    [0, 1, 1, 0],
  )
  const asset = images[image]

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes="42vw"
        quality={80}
        placeholder="blur"
        blurDataURL={asset.blurDataURL}
        className="object-cover"
      />
    </motion.div>
  )
}

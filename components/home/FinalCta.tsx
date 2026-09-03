'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Mark } from '@/components/brand/Logo'
import { images } from '@/data/images'
import { contact, site, whatsappUrl } from '@/data/site'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

const BG = images['amanecer-viajera']

/** Cierre emocional. Una sola idea, una sola acción principal. */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y, scale: 1.14 }}>
        <Image
          src={BG.src}
          alt={BG.alt}
          fill
          sizes="100vw"
          quality={82}
          placeholder="blur"
          blurDataURL={BG.blurDataURL}
          className="object-cover object-center"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-ink/68" />

      <div className="container-page relative py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-fit text-sand"
        >
          <Mark className="h-10 w-10" diamond="#e2c88f" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-4xl text-display leading-[1.05] font-light text-sand"
        >
          Marruecos está más cerca de lo que imaginas.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-xl text-[1.02rem] leading-relaxed text-sand/72"
        >
          Tres horas de vuelo desde España y un equipo esperándote al otro lado. Cuéntanos cuándo
          quieres ir y empezamos a prepararlo hoy mismo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="/contacto"
            className="group inline-flex items-center justify-center gap-2.5 bg-sand px-9 py-4.5 text-[0.72rem] font-medium tracking-[0.18em] text-ink uppercase transition-colors duration-500 hover:bg-white"
          >
            Empieza a preparar tu viaje
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-gold/55 px-9 py-4.5 text-[0.72rem] font-medium tracking-[0.18em] text-gold-soft uppercase transition-colors duration-500 hover:border-gold hover:bg-gold/10"
          >
            Hablar por WhatsApp
          </a>
        </motion.div>

        <p className="mt-8 text-[0.75rem] tracking-[0.14em] text-sand/58">
          <a href={`tel:${contact.phoneRaw}`} className="link-underline">
            {contact.phoneDisplay}
          </a>
          <span className="mx-3 text-gold/70" aria-hidden="true">
            ◆
          </span>
          {site.tagline}
        </p>
      </div>
    </section>
  )
}

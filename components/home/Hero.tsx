'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { images } from '@/data/images'
import { site } from '@/data/site'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

const HERO = images['desierto-caravana-dunas']

const FACTS = [
  { value: '5 y 6', label: 'días de ruta' },
  { value: 'Sahara', label: 'noche en el Erg Chebbi' },
  { value: 'Español', label: 'conductor y guía' },
]

/**
 * Hero de la home. La fotografía se desplaza y se oscurece a medida que
 * el usuario baja, de manera que el paso a la sección editorial se siente
 * como un solo movimiento y no como dos bloques pegados.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const veil = useTransform(scrollYProgress, [0, 1], [1, 1.4])

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[36rem] flex-col justify-end overflow-hidden bg-ink"
      aria-label="Yallah Viajes, viajes organizados a Marruecos"
    >
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: imageY, scale: 1.08 }}>
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={HERO.blurDataURL}
          className="object-cover object-[58%_center] sm:object-center"
        />
      </motion.div>

      {/*
        Velos. La foto tiene que seguir siendo la protagonista, así que en vez
        de una capa plana usamos dos degradados direccionales: uno inferior
        para el bloque de texto y otro lateral para el titular. La opacidad
        sube al hacer scroll para enlazar con la sección siguiente.
      */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(6,26,51,0.86) 0%, rgba(6,26,51,0.52) 24%, rgba(6,26,51,0.14) 52%, rgba(6,26,51,0) 82%)',
          ...(reduced ? {} : { opacity: veil }),
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(6,26,51,0.52) 0%, rgba(6,26,51,0.18) 38%, rgba(6,26,51,0) 66%)',
        }}
      />
      {/* Calidez: devuelve a la foto el tono del desierto que el azul se come */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(176,96,58,0.22) 0%, rgba(193,148,58,0.08) 34%, rgba(193,148,58,0) 66%)',
          mixBlendMode: 'soft-light',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/38 to-transparent"
      />

      <motion.div
        className="container-page relative z-10 pb-16 md:pb-20"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* En móvil y tablet queda demasiado cerca del logotipo de la cabecera:
            se muestra solo a partir de escritorio (mismo corte que la navbar). */}
        <div className="hidden lg:block">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow text-gold-soft"
          >
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
            {site.descriptor} · {site.tagline}
          </motion.p>
        </div>

        <h1 className="mt-6 max-w-[15ch] text-hero leading-[0.92] font-light text-sand">
          {['Marruecos,', 'como', 'debe', 'vivirse.'].map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.15, delay: 0.22 + i * 0.075, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
                {i < 3 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-lg text-[1.02rem] leading-relaxed text-sand/78 md:text-[1.12rem]"
        >
          Viajes organizados desde España al desierto del Sahara, Marrakech y las kasbahs del sur.
          Nosotros lo preparamos todo; allí, nuestro conductor y guía de habla hispana te acompaña
          durante todo el recorrido.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.76, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <Link
            href="/viajes"
            className="group inline-flex items-center justify-center gap-2.5 bg-sand px-8 py-4.5 text-[0.72rem] font-medium tracking-[0.18em] text-ink uppercase transition-colors duration-500 hover:bg-white"
          >
            Ver los viajes
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center border border-sand/40 px-8 py-4.5 text-[0.72rem] font-medium tracking-[0.18em] text-sand uppercase transition-colors duration-500 hover:border-sand hover:bg-sand/10"
          >
            Quiero viajar a Marruecos
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden border-t border-sand/18 pt-6"
        >
          {FACTS.map((fact) => (
            <div key={fact.label} className="pr-4">
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="block font-display text-2xl leading-none text-sand md:text-3xl">
                  {fact.value}
                </span>
                <span className="mt-2 block text-[0.62rem] tracking-[0.16em] text-sand/58 uppercase">
                  {fact.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <ScrollCue />
    </section>
  )
}

function ScrollCue() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.25 }}
      className="pointer-events-none absolute right-6 bottom-8 z-10 hidden items-center gap-3 lg:flex lg:right-12"
    >
      <span className="text-[0.6rem] tracking-[0.24em] text-sand/58 uppercase">Desliza</span>
      <span className="relative block h-14 w-px overflow-hidden bg-sand/22">
        <motion.span
          className="absolute inset-x-0 top-0 block h-5 bg-gold-soft"
          animate={{ y: ['-100%', '340%'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
    </motion.div>
  )
}

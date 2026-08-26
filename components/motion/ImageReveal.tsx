'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { images, type ImageKey } from '@/data/images'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

type ImageRevealProps = {
  image: ImageKey
  className?: string
  imgClassName?: string
  sizes: string
  priority?: boolean
  /** Recorrido vertical de la foto respecto al scroll (0 = sin parallax). */
  parallax?: number
  /** Máscara que descubre la foto de abajo a arriba al entrar en pantalla. */
  mask?: boolean
  /** Texto alternativo distinto al de data/images.ts */
  alt?: string
}

/**
 * Fotografía con revelado por máscara y parallax interno.
 * Es el componente que usa toda la web: garantiza `sizes`, blur y proporción.
 *
 * Con «reducir movimiento» se pinta la foto tal cual, sin máscara ni
 * desplazamiento: nunca debe quedarse un hueco vacío esperando una animación.
 */
export function ImageReveal({
  image,
  className = '',
  imgClassName = '',
  sizes,
  priority = false,
  parallax = 0,
  mask = true,
  alt,
}: ImageRevealProps) {
  const reduced = useReducedMotionSafe()
  const asset = images[image]

  const picture = (
    <Image
      src={asset.src}
      alt={alt ?? asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={82}
      placeholder="blur"
      blurDataURL={asset.blurDataURL}
      className={`h-full w-full object-cover ${imgClassName}`}
    />
  )

  if (reduced) {
    return <div className={`relative overflow-hidden bg-sand-2 ${className}`}>{picture}</div>
  }

  return <AnimatedFrame className={className} parallax={parallax} mask={mask} picture={picture} />
}

function AnimatedFrame({
  className,
  parallax,
  mask,
  picture,
}: {
  className: string
  parallax: number
  mask: boolean
  picture: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-parallax}%`, `${parallax}%`])

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-sand-2 ${className}`}
      initial={mask ? { clipPath: 'inset(0 0 100% 0)' } : false}
      whileInView={mask ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
      viewport={{ once: true, margin: '0px 0px 6% 0px' }}
      transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={parallax > 0 ? { y, scale: 1 + parallax / 50 } : undefined}
      >
        {picture}
      </motion.div>
    </motion.div>
  )
}

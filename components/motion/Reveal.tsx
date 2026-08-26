'use client'

import { motion, type Variants } from 'motion/react'
import type { ElementType, ReactNode } from 'react'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Retardo en segundos. */
  delay?: number
  /** Distancia del desplazamiento inicial, en píxeles. */
  y?: number
  as?: ElementType
  once?: boolean
}

/**
 * Aparición al entrar en viewport. Es el gesto base de toda la web:
 * un desplazamiento corto y una curva larga, nunca un rebote.
 *
 * Con «reducir movimiento» activo el contenido se pinta directamente
 * visible: nunca se queda un bloque en blanco esperando una animación.
 */
export function Reveal({ children, className, delay = 0, y = 26, as = 'div', once = true }: RevealProps) {
  const reduced = useReducedMotionSafe()
  const MotionTag = motion[as as 'div'] ?? motion.div

  if (reduced) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px 8% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

/** Contenedor que escalona la entrada de sus hijos <RevealItem />. */
export function RevealGroup({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  const reduced = useReducedMotionSafe()
  const MotionTag = motion[as as 'div'] ?? motion.div

  if (reduced) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px 8% 0px' }}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  const reduced = useReducedMotionSafe()
  const MotionTag = motion[as as 'div'] ?? motion.div

  if (reduced) {
    const Tag = as as ElementType
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag className={className} variants={staggerChild}>
      {children}
    </MotionTag>
  )
}

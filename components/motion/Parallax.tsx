'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

/**
 * Desplazamiento suave del contenido respecto al scroll.
 * `strength` es el recorrido total en porcentaje de la altura del elemento.
 */
export function Parallax({
  children,
  className,
  strength = 12,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-strength}%`, `${strength}%`])

  if (reduced) return <div className={className}>{children}</div>

  return (
    <div ref={ref} className={className}>
      <motion.div className="h-full w-full" style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

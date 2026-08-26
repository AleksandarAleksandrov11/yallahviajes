'use client'

import { motion } from 'motion/react'
import { Fragment, type ElementType } from 'react'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

type SplitTextProps = {
  text: string
  className?: string
  as?: ElementType
  delay?: number
  /** Palabra a palabra (por defecto) o línea a línea. */
  by?: 'word' | 'line'
  once?: boolean
}

/**
 * Revelado de titulares tras una máscara, palabra a palabra o línea a línea.
 * Se reserva para los titulares principales: si se abusa, cansa.
 *
 * El marcado es siempre el mismo (importa para la hidratación y para los
 * lectores de pantalla); lo único que cambia con «reducir movimiento» es que
 * el texto aparece ya colocado.
 */
export function SplitText({
  text,
  className,
  as = 'span',
  delay = 0,
  by = 'word',
  once = true,
}: SplitTextProps) {
  const reduced = useReducedMotionSafe()
  const Tag = as as ElementType
  const parts = by === 'word' ? text.split(' ') : text.split('\n')

  // Sin animación el titular se pinta como texto normal: ni máscaras ni
  // marcado extra que pueda dejarlo invisible.
  if (reduced) {
    return (
      <Tag className={className}>
        {by === 'line'
          ? parts.map((line, i) => (
              <span key={`${line}-${i}`} className="block">
                {line}
              </span>
            ))
          : text}
      </Tag>
    )
  }

  return (
    <Tag className={className}>
      {/* Sin copia oculta para lectores de pantalla: las palabras se separan con
          espacios reales, así que el titular se lee (y se indexa) una sola vez. */}
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: '0px 0px 6% 0px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: by === 'word' ? 0.055 : 0.11, delayChildren: delay } },
        }}
        className={by === 'line' ? 'flex flex-col' : ''}
      >
        {parts.map((part, i) => (
          <Fragment key={`${part}-${i}`}>
            <span
              className="inline-block overflow-hidden align-bottom"
              style={by === 'word' ? { paddingBottom: '0.12em', marginBottom: '-0.12em' } : undefined}
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: '110%', opacity: 0 },
                  show: { y: '0%', opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {part}
              </motion.span>
            </span>
            {/* El espacio va FUERA del inline-block: dentro lo colapsaría el
                navegador y las palabras aparecerían pegadas. */}
            {by === 'word' && i < parts.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  )
}

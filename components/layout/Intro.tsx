'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { LogoLockup } from '@/components/brand/Logo'
import { site } from '@/data/site'

const STORAGE_KEY = 'yv-intro-seen'

/**
 * Animación de entrada.
 *
 * Un solo gesto, de menos de dos segundos: la arena se mueve sobre un fondo
 * crema, se dibuja la línea de una duna, aparece el logotipo y la pantalla
 * se retira hacia arriba dejando ver el hero. Solo se reproduce en la primera
 * visita de cada sesión y se omite por completo si el usuario ha pedido
 * reducir el movimiento.
 */
export function Intro() {
  const [playing, setPlaying] = useState(false)

  // Deps vacías a propósito: la decisión se toma una sola vez, al montar.
  // Si dependiera de la preferencia de movimiento, un cambio posterior
  // cancelaría el temporizador y la cortinilla se quedaría fija en pantalla.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = (() => {
      try {
        return sessionStorage.getItem(STORAGE_KEY)
      } catch {
        return '1'
      }
    })()

    if (seen || reduced) {
      document.documentElement.removeAttribute('data-intro')
      return
    }

    setPlaying(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* almacenamiento bloqueado: la animación simplemente se repetirá */
    }

    const done = window.setTimeout(() => {
      setPlaying(false)
      document.documentElement.removeAttribute('data-intro')
    }, 1850)

    // Red de seguridad: pase lo que pase, la cortinilla nunca bloquea la web.
    const failsafe = window.setTimeout(() => {
      setPlaying(false)
      document.documentElement.removeAttribute('data-intro')
    }, 4000)

    return () => {
      window.clearTimeout(done)
      window.clearTimeout(failsafe)
    }
  }, [])

  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          key="intro"
          className="grain fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-sand"
          role="status"
          aria-label={`Cargando ${site.name}`}
          initial={{ clipPath: 'inset(0% 0 0% 0)' }}
          exit={{ clipPath: 'inset(0% 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Arena en movimiento: dos velos cálidos que cruzan la pantalla */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 42% at 20% 62%, rgba(193,148,58,0.16), transparent 70%), radial-gradient(48% 38% at 82% 40%, rgba(176,96,58,0.12), transparent 72%)',
            }}
            initial={{ x: '-8%', opacity: 0 }}
            animate={{ x: '6%', opacity: 1 }}
            transition={{ duration: 1.85, ease: 'linear' }}
          />

          {/* La línea de la duna se dibuja bajo el logotipo */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 120"
            className="pointer-events-none absolute bottom-[26%] left-1/2 w-[min(78vw,640px)] -translate-x-1/2 sm:bottom-[30%]"
            fill="none"
          >
            <motion.path
              d="M0 96 C 120 96, 168 34, 300 34 C 432 34, 484 96, 600 96"
              stroke="#c1943a"
              strokeWidth="1"
              strokeOpacity="0.55"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            />
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="relative z-10 text-ink"
          >
            <LogoLockup
              layout="stack"
              showDescriptor
              markClassName="h-14 w-14 sm:h-16 sm:w-16"
              wordClassName="mt-5 h-8 sm:h-10"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Se inyecta en <head> para evitar el parpadeo antes de hidratar. */
export const introBootScript = `try{if(!sessionStorage.getItem('${STORAGE_KEY}')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-intro','running')}}catch(e){}`

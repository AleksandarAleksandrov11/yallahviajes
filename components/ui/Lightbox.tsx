'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { images, type ImageKey } from '@/data/images'

export type LightboxItem = { key: ImageKey; caption: string; place: string }

/**
 * Visor a pantalla completa con navegación por teclado y por gestos.
 * Se pasa como render prop para que cada galería mantenga su propia
 * composición y solo comparta el visor.
 */
export function Lightbox({
  items,
  children,
}: {
  items: LightboxItem[]
  children: (api: { open: (index: number) => void }) => ReactNode
}) {
  const [index, setIndex] = useState<number | null>(null)

  const close = useCallback(() => setIndex(null), [])
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  )
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (index === null) {
      document.body.dataset.lock = 'false'
      return
    }
    document.body.dataset.lock = 'true'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.dataset.lock = 'false'
    }
  }, [index, close, next, prev])

  const current = index === null ? null : items[index]
  const asset = current ? images[current.key] : null

  return (
    <>
      {children({ open: setIndex })}

      <AnimatePresence>
        {current && asset && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink-deep/97"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Fotografía ${index! + 1} de ${items.length}`}
          >
            <div className="flex shrink-0 items-center justify-between px-5 py-5 text-sand md:px-8">
              <span className="text-[0.68rem] tracking-[0.2em] text-sand/58 tabular-nums uppercase">
                {String(index! + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar galería"
                className="flex h-10 w-10 items-center justify-center text-sand/70 transition-colors hover:text-sand"
              >
                <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-16">
              <button
                type="button"
                onClick={prev}
                aria-label="Fotografía anterior"
                className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center text-sand/60 transition-colors hover:text-sand md:left-4"
              >
                <ChevronLeft className="h-7 w-7" strokeWidth={1.2} aria-hidden="true" />
              </button>

              <AnimatePresence mode="wait">
                <motion.figure
                  key={current.key}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex max-h-full flex-col items-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    className="max-h-[70svh] w-auto max-w-full object-contain"
                  />
                  <figcaption className="mt-5 max-w-xl text-center">
                    <span className="block font-display text-xl text-sand">{current.caption}</span>
                    {current.place && (
                      <span className="mt-1.5 block text-[0.68rem] tracking-[0.18em] text-gold-soft/80 uppercase">
                        {current.place}
                      </span>
                    )}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>

              <button
                type="button"
                onClick={next}
                aria-label="Fotografía siguiente"
                className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center text-sand/60 transition-colors hover:text-sand md:right-4"
              >
                <ChevronRight className="h-7 w-7" strokeWidth={1.2} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

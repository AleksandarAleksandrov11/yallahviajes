'use client'

import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Lightbox } from '@/components/ui/Lightbox'
import { gallery, galleryCategories, type GalleryCategory } from '@/data/gallery'
import { images } from '@/data/images'

const SPAN_CLASS: Record<string, string> = {
  wide: 'sm:col-span-2',
  tall: 'row-span-2',
  big: 'sm:col-span-2 row-span-2',
}

/**
 * Galería editorial: cuadrícula de altura variable con filtros por categoría.
 * Se apoya en `grid-auto-rows` en lugar de en una librería de masonry para
 * no cargar JavaScript extra ni provocar saltos de maquetación.
 */
export function MasonryGallery() {
  const [filter, setFilter] = useState<GalleryCategory | 'todo'>('todo')

  const items = useMemo(
    () => (filter === 'todo' ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  )

  return (
    <Lightbox items={items}>
      {({ open }) => (
        <>
          <div
            role="group"
            aria-label="Filtrar la galería por categoría"
            className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:px-0"
          >
            {galleryCategories.map((cat) => {
              const active = filter === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilter(cat.id)}
                  aria-pressed={active}
                  className={`shrink-0 border px-5 py-2.5 text-[0.68rem] font-medium tracking-[0.16em] uppercase transition-colors duration-500 ${
                    active
                      ? 'border-ink bg-ink text-sand'
                      : 'border-ink/15 text-ink/68 hover:border-ink/35 hover:text-ink'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          <p className="mt-6 text-[0.78rem] tracking-wide text-muted" aria-live="polite">
            {items.length} {items.length === 1 ? 'fotografía' : 'fotografías'}
          </p>

          <div className="mt-6 grid auto-rows-[minmax(0,11rem)] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[minmax(0,13rem)] sm:grid-cols-3 md:gap-4 lg:auto-rows-[minmax(0,15rem)] lg:grid-cols-4">
            {items.map((item, i) => {
              const asset = images[item.key]
              return (
                <motion.button
                  key={item.key}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: Math.min(i, 12) * 0.035, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => open(i)}
                  className={`group relative overflow-hidden bg-sand-2 ${
                    item.span ? SPAN_CLASS[item.span] : ''
                  }`}
                  aria-label={`Ampliar: ${item.caption}, ${item.place}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    loading={i < 6 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.055]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 bottom-4 translate-y-2 text-left opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <span className="block font-display text-lg leading-tight text-sand">
                      {item.caption}
                    </span>
                    <span className="mt-1 block text-[0.58rem] tracking-[0.18em] text-gold-soft uppercase">
                      {item.place}
                    </span>
                  </span>
                </motion.button>
              )
            })}
          </div>
        </>
      )}
    </Lightbox>
  )
}

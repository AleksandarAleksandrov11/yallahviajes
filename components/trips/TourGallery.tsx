'use client'

import { Lightbox } from '@/components/ui/Lightbox'
import { images, type ImageKey } from '@/data/images'

/** Galería del viaje: mosaico irregular con lightbox. */
export function TourGallery({ keys }: { keys: readonly ImageKey[] }) {
  const items = keys.map((key) => ({ key, caption: images[key].alt, place: '' }))

  return (
    <Lightbox items={items}>
      {({ open }) => (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {keys.map((key, i) => {
            const asset = images[key]
            const wide = i === 0 || i === 5
            return (
              <button
                key={key}
                type="button"
                onClick={() => open(i)}
                className={`group relative overflow-hidden bg-sand-2 ${
                  wide ? 'col-span-2 aspect-3/2' : 'aspect-square'
                }`}
                aria-label={`Ampliar: ${asset.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.src}
                  alt={asset.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/18"
                />
              </button>
            )
          })}
        </div>
      )}
    </Lightbox>
  )
}

import type { MetadataRoute } from 'next'
import { site } from '@/data/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · Circuitos organizados a Marruecos`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fcfaf7',
    theme_color: '#0b2545',
    lang: site.lang,
    categories: ['travel', 'lifestyle'],
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '512x512', purpose: 'maskable' },
    ],
  }
}

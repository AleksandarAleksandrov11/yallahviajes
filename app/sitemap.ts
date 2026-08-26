import type { MetadataRoute } from 'next'
import { site } from '@/data/site'
import { tours } from '@/data/tours'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/viajes', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/galeria', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/nosotros', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/testimonios', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contacto', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/legal/aviso-legal', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/legal/privacidad', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/legal/cookies', priority: 0.2, changeFrequency: 'yearly' },
  ]

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...tours.map((tour) => ({
      url: `${site.url}/viajes/${tour.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}

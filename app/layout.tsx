import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

import { BrandSprite } from '@/components/brand/BrandSprite'
import { ConsentedAnalytics } from '@/components/consent/Analytics'
import { CookieBanner } from '@/components/consent/CookieBanner'
import { ConsentProvider } from '@/components/consent/ConsentProvider'
import { Footer } from '@/components/layout/Footer'
import { Intro, introBootScript } from '@/components/layout/Intro'
import { Navbar } from '@/components/layout/Navbar'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { site } from '@/data/site'
import { JsonLd } from '@/components/ui/JsonLd'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Yalah Viajes · Circuitos organizados a Marruecos desde España',
    template: '%s | Yalah Viajes',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'viajes a Marruecos desde España',
    'viajes organizados a Marruecos',
    'viaje al desierto de Marruecos',
    'tours Marruecos con guía español',
    'viaje a Marrakech',
    'desierto de Merzouga',
    'circuito Sahara Marruecos',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: true, address: false, email: false },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#0b2545' },
  ],
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      <body>
        <ConsentProvider>
          <BrandSprite />
          <Intro />
          <Navbar />
          <main id="contenido">{children}</main>
          <Footer />
          <WhatsAppFab />
          <CookieBanner />
          <ConsentedAnalytics />
        </ConsentProvider>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  )
}

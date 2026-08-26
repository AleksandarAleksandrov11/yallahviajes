import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { HomeIntro } from '@/components/home/Intro'
import { Why } from '@/components/home/Why'
import { Destinations } from '@/components/home/Destinations'
import { Trips } from '@/components/home/Trips'
import { Process } from '@/components/home/Process'
import { GalleryTeaser } from '@/components/home/GalleryTeaser'
import { TestimonialsTeaser } from '@/components/home/TestimonialsTeaser'
import { FaqTeaser } from '@/components/home/FaqTeaser'
import { FinalCta } from '@/components/home/FinalCta'
import { answeredFaq } from '@/data/faq'
import { JsonLd } from '@/components/ui/JsonLd'
import { faqJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Yalah Viajes — Viajes organizados a Marruecos desde España',
  description:
    'Viajes y circuitos organizados a Marruecos desde España: Marrakech, Aït Ben Haddou, gargantas del Dades y del Todra y noche en el desierto de Merzouga. Alojamiento, comidas, transporte y conductor y guía de habla hispana incluidos.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <Why />
      <Destinations />
      <Trips />
      <Process />
      <GalleryTeaser />
      <TestimonialsTeaser />
      <FaqTeaser />
      <FinalCta />
      <JsonLd data={faqJsonLd(answeredFaq.filter((f) => f.featured).map((f) => ({ q: f.q, answer: f.answer })))} />
    </>
  )
}

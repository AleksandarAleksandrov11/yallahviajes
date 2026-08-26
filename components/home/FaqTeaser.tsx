import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { ButtonLink } from '@/components/ui/Button'
import { FaqList } from '@/components/ui/FaqList'
import { Eyebrow } from '@/components/ui/Section'
import { featuredFaq } from '@/data/faq'

export function FaqTeaser() {
  return (
    <section className="grain relative bg-sand py-section">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow number="08">Preguntas frecuentes</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Lo que todo el mundo nos pregunta."
              className="mt-6 text-title leading-[1.1] text-ink"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-ink/65">
                Y si algo no está aquí, se pregunta y ya está. Contestamos nosotros, no un bot.
              </p>
            </Reveal>
            <Reveal delay={0.16} className="mt-8">
              <ButtonLink href="/faq" variant="outline" withArrow>
                Todas las preguntas
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <FaqList items={featuredFaq.slice(0, 7)} defaultOpenFirst />
        </div>
      </div>
    </section>
  )
}

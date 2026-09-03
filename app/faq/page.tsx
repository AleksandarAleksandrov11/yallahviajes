import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { FaqList } from '@/components/ui/FaqList'
import { JsonLd } from '@/components/ui/JsonLd'
import { Divider } from '@/components/ui/Section'
import { answeredFaq, faqByCategory, faqCategories } from '@/data/faq'
import { contact, whatsappUrl } from '@/data/site'
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Preguntas frecuentes',
  description:
    'Qué incluye el precio, alojamiento, comidas, transporte y guía en español: todo lo que hay que saber antes de viajar a Marruecos.',
  path: '/faq',
  image: {
    url: '/img/amanecer-dunas.jpg',
    width: 1600,
    height: 1200,
    alt: 'Amanecer sobre las dunas del Erg Chebbi',
  },
})

export default function FaqPage() {
  return (
    <>
      <PageHero
        image="amanecer-dunas"
        eyebrow="Preguntas frecuentes"
        title="Preguntas frecuentes sobre los viajes a Marruecos."
        lead="Contestamos con lo que sabemos con certeza. Cuando un dato aún no está cerrado, lo decimos y te lo damos por teléfono."
        crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'FAQ' },
        ]}
      />

      <section className="grain relative bg-paper py-section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Categorías de preguntas" className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-[0.62rem] font-medium tracking-[0.24em] text-muted uppercase">
                Categorías
              </h2>
              <ul className="mt-5 space-y-3">
                {faqCategories.map((cat) => (
                  <li key={cat.id}>
                    <a href={`#${cat.id}`} className="link-underline text-[0.92rem] text-ink/65">
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>

              <Divider className="mt-8 max-w-40" />

              <p className="mt-8 max-w-xs text-[0.86rem] leading-relaxed text-ink/68">
                ¿No encuentras tu pregunta? Escríbenos y te contestamos en persona.
              </p>
              <ButtonLink href={whatsappUrl()} variant="outline" className="mt-5">
                Preguntar por WhatsApp
              </ButtonLink>
            </div>
          </nav>

          <div className="lg:col-span-9">
            {faqCategories.map((cat, i) => {
              const items = faqByCategory(cat.id)
              if (items.length === 0) return null
              return (
                <section key={cat.id} id={cat.id} className="mb-16 last:mb-0">
                  <Reveal>
                    <span className="eyebrow">
                      <span className="tabular-nums opacity-70">{String(i + 1).padStart(2, '0')}</span>
                      <span aria-hidden="true" className="h-px w-8 bg-current opacity-45" />
                      {cat.label}
                    </span>
                    <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                      {cat.intro}
                    </h2>
                  </Reveal>
                  <div className="mt-8">
                    <FaqList items={items} />
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-ink py-20 text-sand md:py-24">
        <div
          aria-hidden="true"
          className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.05]"
        />
        <div className="container-page relative text-center">
          <Divider className="mx-auto max-w-24" tone="light" />
          <h2 className="mx-auto mt-8 max-w-2xl text-title leading-tight text-sand">
            Lo que no está aquí, te lo contamos por teléfono.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[1rem] leading-relaxed text-sand/62">
            Preferimos no publicar un dato hasta tenerlo cerrado. Si necesitas saberlo ya, llámanos
            al {contact.phoneDisplay} y te lo decimos sin rodeos.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/contacto" variant="light" size="lg" withArrow>
              Escribirnos
            </ButtonLink>
            <ButtonLink href="/viajes" variant="outline" size="lg" className="!text-gold-soft">
              Ver los viajes
            </ButtonLink>
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd(answeredFaq.map((f) => ({ q: f.q, answer: f.answer })))} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Preguntas frecuentes', path: '/faq' },
        ])}
      />
    </>
  )
}

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Clock, Instagram, MessageCircle, Phone } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { PageHero } from '@/components/layout/PageHero'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'
import { JsonLd } from '@/components/ui/JsonLd'
import { Divider, Eyebrow } from '@/components/ui/Section'
import { contact, social, whatsappUrl } from '@/data/site'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Contacto',
  description:
    'Cuéntanos cuándo quieres viajar a Marruecos y te preparamos la ruta. Respondemos por WhatsApp, teléfono o correo en menos de 24 horas.',
  path: '/contacto',
})

export default function ContactoPage() {
  return (
    <>
      <PageHero
        image="jemaa-el-fna-atardecer"
        eyebrow="Contacto"
        title="Cuéntanos cómo quieres que sea tu viaje."
        lead="Sin compromiso y sin formularios eternos. Respondemos personalmente en menos de 24 horas."
        crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Contacto' },
        ]}
      />

      <section className="grain relative bg-paper py-section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow number="01">Formulario</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Empecemos por lo básico."
              className="mt-6 text-title leading-[1.1] text-ink"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-ink/68">
                Con estos datos ya podemos prepararte una propuesta concreta: ruta, alojamientos y
                precio cerrado.
              </p>
            </Reveal>

            <div className="mt-12">
              <Suspense fallback={<FormSkeleton />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="border border-ink/12 bg-sand/50 p-8 md:p-9">
                <h2 className="text-[0.62rem] font-medium tracking-[0.24em] text-muted uppercase">
                  Vías directas
                </h2>

                <ul className="mt-7 space-y-6">
                  <li>
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4"
                    >
                      <MessageCircle
                        className="mt-1 h-4.5 w-4.5 shrink-0 text-gold"
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block font-display text-xl text-ink transition-colors group-hover:text-gold-deep">
                          WhatsApp
                        </span>
                        <span className="mt-1 block text-[0.86rem] text-ink/68">
                          La forma más rápida. {contact.phoneDisplay}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a href={`tel:${contact.phoneRaw}`} className="group flex items-start gap-4">
                      <Phone
                        className="mt-1 h-4.5 w-4.5 shrink-0 text-gold"
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block font-display text-xl text-ink transition-colors group-hover:text-gold-deep">
                          Teléfono
                        </span>
                        <span className="mt-1 block text-[0.86rem] text-ink/68">
                          {contact.phoneDisplay}
                        </span>
                      </span>
                    </a>
                  </li>

                  {social.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-4"
                      >
                        <Instagram
                          className="mt-1 h-4.5 w-4.5 shrink-0 text-gold"
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block font-display text-xl text-ink transition-colors group-hover:text-gold-deep">
                            Instagram
                          </span>
                          <span className="mt-1 block text-[0.86rem] text-ink/68">
                            {s.handle}, el día a día de las rutas
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}

                  <li className="flex items-start gap-4">
                    <Clock
                      className="mt-1 h-4.5 w-4.5 shrink-0 text-gold"
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-display text-xl text-ink">Horario</span>
                      <span className="mt-1 block text-[0.86rem] text-ink/68">
                        {/* PENDIENTE: horario de atención facilitado por la agencia */}
                        {contact.hours ?? 'Escríbenos a cualquier hora: respondemos en menos de 24 h.'}
                      </span>
                    </span>
                  </li>
                </ul>

                <Divider className="my-8" />

                <p className="text-[0.84rem] leading-relaxed text-ink/68">
                  Organizamos el viaje desde España y te acompañamos en Marruecos. Si prefieres que
                  te llamemos nosotros, déjanos tu teléfono en el formulario y una franja horaria.
                </p>
              </div>

              <ImageReveal
                image="camellos-silueta"
                className="mt-6 aspect-3/2"
                sizes="(max-width: 1024px) 100vw, 34vw"
              />
            </div>
          </aside>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Contacto', path: '/contacto' },
        ])}
      />
    </>
  )
}

/** Esqueleto mientras se hidrata el formulario (usa searchParams). */
function FormSkeleton() {
  return (
    <div className="space-y-7" aria-hidden="true">
      <div className="grid gap-7 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse border-b border-ink/12 bg-sand/60" />
        ))}
      </div>
      <div className="h-36 animate-pulse border border-ink/12 bg-sand/60" />
      <div className="h-12 w-52 animate-pulse bg-sand/60" />
    </div>
  )
}

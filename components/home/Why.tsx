import {
  BedDouble,
  CarFront,
  Compass,
  Headset,
  MessagesSquare,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { Eyebrow } from '@/components/ui/Section'
import { SplitText } from '@/components/motion/SplitText'

/** Las tres primeras se muestran como bloques grandes; el resto, como lista. */
const PILLARS = [
  {
    icon: MessagesSquare,
    title: 'Se organiza desde España',
    text: 'Hablas con nosotros en tu idioma, en tu horario y antes de reservar nada. Cerramos la ruta contigo y tú solo tienes que comprar el vuelo.',
  },
  {
    icon: Compass,
    title: 'Conductor y guía de habla hispana',
    text: 'La misma persona te acompaña desde el aeropuerto hasta el último día. Nada de cambiar de guía en cada ciudad ni de entenderse por señas.',
  },
  {
    icon: Sparkles,
    title: 'Experiencias, no paradas de bus',
    text: 'Té con una familia nómada, música en vivo en Khamlia, el amanecer desde lo alto de una duna. Lo que recuerdas al volver.',
  },
]

const SUPPORT = [
  { icon: BedDouble, title: 'Alojamiento incluido', text: 'Riad en la Medina, hotel en el Dades y campamento de lujo en el desierto.' },
  { icon: UtensilsCrossed, title: 'Comidas incluidas', text: 'Todos los desayunos y las cenas de las noches fuera de Marrakech.' },
  { icon: CarFront, title: 'Transporte con A/C', text: 'Vehículo cómodo durante toda la ruta, con traslados de aeropuerto.' },
  { icon: Headset, title: 'Alguien al otro lado', text: 'Antes, durante y después del viaje. Un número de teléfono, no un formulario.' },
]

export function Why() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-section text-sand">
      <div
        aria-hidden="true"
        className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.045]"
      />

      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow number="02" tone="light">
                Por qué viajar con Yalah
              </Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Un viaje a Marruecos sale bien cuando alguien de allí lo ha pensado antes."
              className="mt-6 max-w-3xl text-display leading-[1.06] text-sand"
            />
          </div>
          <Reveal delay={0.12} className="lg:col-span-5">
            <p className="max-w-md text-[1.02rem] leading-relaxed text-sand/62 lg:pb-3">
              No vendemos un paquete cerrado que nadie ha pisado. Estas rutas las hemos hecho decenas
              de veces: sabemos a qué hora hay que salir para no perder el atardecer y en qué curva
              del Atlas conviene parar.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-px border-t border-sand/12 md:grid-cols-3">
          {PILLARS.map((item, i) => (
            <RevealItem
              key={item.title}
              className="relative border-b border-sand/12 py-9 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <span className="font-sans text-[0.6rem] tracking-[0.24em] text-gold-soft/70 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <item.icon className="mt-6 h-6 w-6 text-gold" strokeWidth={1.15} aria-hidden="true" />
              <h3 className="mt-5 text-2xl leading-snug text-sand">{item.title}</h3>
              <p className="mt-3.5 text-[0.95rem] leading-relaxed text-sand/58">{item.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ImageReveal
              image="dades-carretera-roja"
              className="aspect-3/2 lg:aspect-4/5"
              sizes="(max-width: 1024px) 100vw, 38vw"
              parallax={6}
            />
          </div>

          <RevealGroup
            as="dl"
            className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7 lg:content-center"
          >
            {SUPPORT.map((item) => (
              <RevealItem key={item.title}>
                <dt className="flex items-center gap-3 text-lg text-sand">
                  <item.icon className="h-4.5 w-4.5 shrink-0 text-gold" strokeWidth={1.25} aria-hidden="true" />
                  <span className="font-display text-xl">{item.title}</span>
                </dt>
                <dd className="mt-2.5 pl-7.5 text-[0.92rem] leading-relaxed text-sand/55">
                  {item.text}
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

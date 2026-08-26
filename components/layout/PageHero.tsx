import Link from 'next/link'
import Image from 'next/image'
import { images, type ImageKey } from '@/data/images'
import { SplitText } from '@/components/motion/SplitText'
import { Reveal } from '@/components/motion/Reveal'

type Crumb = { label: string; href?: string }

/**
 * Cabecera de las páginas interiores: fotografía a media altura, migas de pan
 * y titular. Mantiene el ritmo de la home sin competir con su hero.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs = [],
  align = 'left',
  children,
}: {
  eyebrow?: string
  title: string
  lead?: string
  image: ImageKey
  crumbs?: Crumb[]
  align?: 'left' | 'center'
  children?: React.ReactNode
}) {
  const asset = images[image]

  return (
    <header className="relative flex min-h-[62svh] items-end overflow-hidden bg-ink pt-28 md:min-h-[68svh]">
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority
        quality={82}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={asset.blurDataURL}
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(6,26,51,0.9) 0%, rgba(6,26,51,0.6) 34%, rgba(6,26,51,0.2) 70%, rgba(6,26,51,0.34) 100%)',
        }}
      />

      <div
        className={`container-page relative z-10 pb-14 md:pb-20 ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        {crumbs.length > 0 && (
          <Reveal y={12}>
            <nav
              aria-label="Migas de pan"
              className={`flex flex-wrap items-center gap-2.5 text-[0.66rem] tracking-[0.16em] text-sand/58 uppercase ${
                align === 'center' ? 'justify-center' : ''
              }`}
            >
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex items-center gap-2.5">
                  {c.href ? (
                    <Link href={c.href} className="link-underline transition-colors hover:text-sand">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-sand/80">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <span className="text-gold/70" aria-hidden="true">
                      ◆
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        {eyebrow && (
          <Reveal y={12} delay={0.06}>
            <p className="eyebrow mt-6 text-gold-soft">
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
              {eyebrow}
            </p>
          </Reveal>
        )}

        <SplitText
          as="h1"
          text={title}
          className={`mt-5 text-display leading-[1.04] font-light text-sand ${
            align === 'center' ? 'mx-auto max-w-4xl' : 'max-w-4xl'
          }`}
        />

        {lead && (
          <Reveal delay={0.14}>
            <p
              className={`mt-6 max-w-xl text-[1rem] leading-relaxed text-sand/72 md:text-[1.08rem] ${
                align === 'center' ? 'mx-auto' : ''
              }`}
            >
              {lead}
            </p>
          </Reveal>
        )}

        {children}
      </div>
    </header>
  )
}

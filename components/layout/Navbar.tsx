'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { LogoLink } from '@/components/brand/Logo'
import { MobileMenu } from './MobileMenu'
import { nav } from '@/data/site'

/**
 * Cabecera fija. Sobre el hero es transparente y clara; al hacer scroll
 * reduce altura, adopta fondo papel con desenfoque y filete inferior.
 * Las páginas con hero oscuro la piden en modo `overlay`.
 */
export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const overlay = !scrolled

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:text-sand focus:uppercase"
      >
        Saltar al contenido
      </a>

      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled
            ? 'bg-paper/88 shadow-[0_1px_0_rgba(11,37,69,0.08)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        initial={false}
        animate={{ height: scrolled ? 68 : 92 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-page flex h-full items-center justify-between">
          <LogoLink
            className={`transition-colors duration-500 ${overlay ? 'text-sand' : 'text-ink'}`}
            markClassName={scrolled ? 'h-7 w-7 shrink-0' : 'h-8 w-8 shrink-0'}
            wordClassName={scrolled ? 'h-[1rem]' : 'h-[1.15rem]'}
          />

          <nav
            aria-label="Navegación principal"
            className={`hidden items-center gap-8 lg:flex ${overlay ? 'text-sand' : 'text-ink'}`}
          >
            {nav.slice(1).map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  aria-current={active ? 'page' : undefined}
                  className="link-underline text-[0.78rem] tracking-[0.06em] transition-opacity duration-300 hover:opacity-100 data-[active=false]:opacity-85"
                >
                  {item.label}
                </Link>
              )
            })}

            <Link
              href="/contacto"
              className={`ml-2 border px-5 py-2.5 text-[0.66rem] font-medium tracking-[0.18em] uppercase transition-colors duration-500 ${
                overlay
                  ? 'border-sand/45 text-sand hover:border-sand hover:bg-sand/10'
                  : 'border-ink bg-ink text-sand hover:bg-ink-2'
              }`}
            >
              Planifica tu viaje
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="menu-movil"
            className={`-mr-2 flex h-11 w-11 items-center justify-center lg:hidden ${
              overlay ? 'text-sand' : 'text-ink'
            }`}
          >
            <span className="relative block h-3 w-6">
              <span className="absolute top-0 left-0 h-px w-full bg-current" />
              <span className="absolute bottom-0 left-0 h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  )
}

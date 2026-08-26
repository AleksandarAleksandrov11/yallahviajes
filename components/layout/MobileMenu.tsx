'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { LogoLockup, Mark } from '@/components/brand/Logo'
import { contact, nav, site, social, whatsappUrl } from '@/data/site'

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean
  onClose: () => void
  pathname: string
}) {
  useEffect(() => {
    document.body.dataset.lock = open ? 'true' : 'false'
    return () => {
      document.body.dataset.lock = 'false'
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-movil"
          className="fixed inset-0 z-50 flex flex-col bg-ink text-sand lg:hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.68, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            aria-hidden="true"
            className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.055]"
          />

          <div className="container-page relative flex h-20 shrink-0 items-center justify-between">
            <LogoLockup markClassName="h-7 w-7" wordClassName="h-4" />
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-sand"
              aria-label="Cerrar menú"
            >
              <span className="relative block h-4 w-5">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="container-page relative flex flex-1 flex-col justify-center" aria-label="Menú principal">
            <ul className="flex flex-col">
              {nav.map((item, i) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.16 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-sand/12"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-baseline gap-4 py-4 font-display text-[2rem] leading-tight sm:text-4xl"
                    >
                      <span className="w-7 font-sans text-[0.6rem] tracking-[0.2em] text-gold-soft/70 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={active ? 'text-gold-soft' : ''}>{item.label}</span>
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="container-page relative shrink-0 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-6"
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-gold/45 px-5 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-gold-soft uppercase"
            >
              Planifica tu viaje
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <div className="mt-5 flex items-center justify-between text-[0.78rem] text-sand/60">
              <a href={`tel:${contact.phoneRaw}`} className="tracking-wide">
                {contact.phoneDisplay}
              </a>
              <div className="flex items-center gap-4">
                {social.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.handle}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3 text-sand/55">
              <Mark className="h-4 w-4" diamond="#e2c88f" />
              <span className="text-[0.62rem] tracking-[0.2em] uppercase">{site.tagline}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

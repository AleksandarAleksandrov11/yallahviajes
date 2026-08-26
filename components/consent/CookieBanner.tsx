'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Cookie, Lock, X } from 'lucide-react'
import { Mark } from '@/components/brand/Logo'
import { useConsent } from './ConsentProvider'

/**
 * Aviso de cookies.
 *
 * · Aparece en la primera visita, antes de cargar ninguna analítica.
 * · Rechazar cuesta lo mismo que aceptar (un clic, mismo peso visual):
 *   es lo que exige la guía de cookies de la AEPD.
 * · La decisión se puede cambiar en cualquier momento desde el pie de página
 *   o desde /legal/cookies.
 */
export function CookieBanner() {
  const { needsDecision, panelOpen, acceptAll, rejectAll, save, openPanel, closePanel, consent } =
    useConsent()
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    if (panelOpen) setAnalytics(consent?.analytics ?? false)
  }, [panelOpen, consent])

  const showBanner = needsDecision && !panelOpen

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="cookie-title"
            aria-describedby="cookie-desc"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 z-[70] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md"
          >
            <div className="grain relative overflow-hidden bg-ink p-6 text-sand shadow-[0_24px_60px_-20px_rgba(6,26,51,0.7)] md:p-7">
              <div
                aria-hidden="true"
                className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.05]"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <Mark className="h-5 w-5" diamond="#e2c88f" />
                  <h2
                    id="cookie-title"
                    className="font-display text-xl leading-none text-sand"
                  >
                    Cookies
                  </h2>
                </div>

                <p id="cookie-desc" className="mt-4 text-[0.88rem] leading-relaxed text-sand/70">
                  Usamos cookies técnicas necesarias para que la web funcione y, solo si nos das
                  permiso, medimos de forma anónima y agregada qué páginas se visitan para
                  mejorarla. Puedes cambiar de opinión cuando quieras desde el pie de página.
                </p>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="flex-1 bg-sand px-5 py-3.5 text-[0.68rem] font-medium tracking-[0.16em] text-ink uppercase transition-colors duration-300 hover:bg-white"
                  >
                    Aceptar todas
                  </button>
                  <button
                    type="button"
                    onClick={rejectAll}
                    className="flex-1 border border-sand/40 px-5 py-3.5 text-[0.68rem] font-medium tracking-[0.16em] text-sand uppercase transition-colors duration-300 hover:border-sand hover:bg-sand/10"
                  >
                    Rechazar todas
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.75rem] text-sand/55">
                  <button type="button" onClick={openPanel} className="link-underline">
                    Configurar
                  </button>
                  <Link href="/legal/cookies" className="link-underline">
                    Política de cookies
                  </Link>
                  <Link href="/legal/privacidad" className="link-underline">
                    Privacidad
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              aria-label="Cerrar preferencias de cookies"
              onClick={closePanel}
              className="absolute inset-0 bg-ink-deep/70 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-panel-title"
              initial={{ opacity: 0, y: 26, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 26, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-paper p-7 shadow-2xl md:p-9"
            >
              <button
                type="button"
                onClick={closePanel}
                aria-label="Cerrar"
                className="absolute top-5 right-5 text-ink/50 transition-colors hover:text-ink"
              >
                <X className="h-4.5 w-4.5" strokeWidth={1.5} aria-hidden="true" />
              </button>

              <span className="eyebrow">
                <Cookie className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                Preferencias
              </span>
              <h2 id="cookie-panel-title" className="mt-4 font-display text-3xl leading-tight text-ink">
                Tú decides qué se mide
              </h2>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/65">
                Puedes cambiar esta configuración en cualquier momento desde el enlace
                «Configurar cookies» del pie de página.
              </p>

              <div className="mt-7 space-y-4">
                <CategoryRow
                  title="Cookies necesarias"
                  description="Permiten que la web funcione: recordar esta misma decisión y servir las páginas de forma segura. No se pueden desactivar."
                  locked
                />
                <CategoryRow
                  title="Analítica anónima"
                  description="Vercel Web Analytics y Speed Insights. Miden visitas y velocidad de carga de forma agregada, sin identificarte ni crear perfiles."
                  checked={analytics}
                  onChange={setAnalytics}
                />
              </div>

              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => save({ analytics })}
                  className="flex-1 bg-ink px-6 py-3.5 text-[0.68rem] font-medium tracking-[0.16em] text-sand uppercase transition-colors duration-300 hover:bg-ink-2"
                >
                  Guardar preferencias
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="flex-1 border border-gold/60 px-6 py-3.5 text-[0.68rem] font-medium tracking-[0.16em] text-gold-deep uppercase transition-colors duration-300 hover:bg-gold/10"
                >
                  Aceptar todas
                </button>
              </div>

              <Link
                href="/legal/cookies"
                onClick={closePanel}
                className="link-underline mt-5 inline-block text-[0.78rem] text-ink/68"
              >
                Ver el detalle de cada cookie
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function CategoryRow({
  title,
  description,
  checked = false,
  locked,
  onChange,
}: {
  title: string
  description: string
  checked?: boolean
  /** Categoría obligatoria: se muestra como etiqueta, no como interruptor falso. */
  locked?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-5 border-t border-ink/10 pt-4">
      <div>
        <h3 className="font-display text-lg text-ink">{title}</h3>
        <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink/68">{description}</p>
      </div>

      {locked ? (
        <span className="mt-1 flex shrink-0 items-center gap-1.5 border border-ink/15 bg-sand px-3 py-1.5 text-[0.6rem] font-medium tracking-[0.14em] text-ink/68 uppercase">
          <Lock className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
          Siempre activas
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={title}
          onClick={() => onChange?.(!checked)}
          className={`relative mt-1 h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
            checked ? 'bg-ink' : 'bg-ink/18'
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-paper transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              checked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      )}
    </div>
  )
}

/** Botón reutilizable para reabrir el panel (pie de página y política de cookies). */
export function CookieSettingsButton({ className = '' }: { className?: string }) {
  const { openPanel } = useConsent()
  return (
    <button type="button" onClick={openPanel} className={className}>
      Configurar cookies
    </button>
  )
}

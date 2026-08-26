'use client'

import { Cookie } from 'lucide-react'
import { useConsent } from './ConsentProvider'

/**
 * Estado actual del consentimiento + acceso directo al panel.
 * Va arriba de la política de cookies para que cambiar de opinión
 * sea lo primero que se ve, no algo escondido al final.
 */
export function CookieStatus() {
  const { consent, ready, openPanel, reset } = useConsent()

  const label = !ready
    ? 'Comprobando…'
    : consent === null
      ? 'Todavía no has elegido'
      : consent.analytics
        ? 'Has aceptado la analítica anónima'
        : 'Solo cookies necesarias'

  return (
    <div className="mb-12 flex flex-col gap-5 border border-ink/12 bg-sand/60 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
      <div className="flex items-start gap-4">
        <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.3} aria-hidden="true" />
        <div>
          <p className="text-[0.62rem] font-medium tracking-[0.2em] text-muted uppercase">
            Tu configuración actual
          </p>
          <p className="mt-1.5 font-display text-xl text-ink">{label}</p>
          {consent && (
            <p className="mt-1 text-[0.8rem] text-ink/68">
              Decisión guardada el{' '}
              {new Date(consent.decidedAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              .
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-3">
        <button
          type="button"
          onClick={openPanel}
          className="bg-ink px-6 py-3 text-[0.66rem] font-medium tracking-[0.16em] text-sand uppercase transition-colors duration-300 hover:bg-ink-2"
        >
          Configurar cookies
        </button>
        {consent && (
          <button
            type="button"
            onClick={reset}
            className="border border-ink/20 px-6 py-3 text-[0.66rem] font-medium tracking-[0.16em] text-ink/70 uppercase transition-colors duration-300 hover:border-ink/40 hover:text-ink"
          >
            Retirar consentimiento
          </button>
        )}
      </div>
    </div>
  )
}

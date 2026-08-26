'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type ConsentState = {
  /** Siempre `true`: sin ellas la web no funciona y no requieren consentimiento. */
  necessary: true
  /** Analítica agregada (Vercel Web Analytics y Speed Insights). */
  analytics: boolean
}

export type StoredConsent = ConsentState & {
  /** Fecha ISO en la que se tomó la decisión, para poder acreditarla. */
  decidedAt: string
  /** Versión de la política aceptada: si cambia, se vuelve a preguntar. */
  version: number
}

/** Súbela cuando cambie la política de cookies para volver a pedir consentimiento. */
export const CONSENT_VERSION = 1
const STORAGE_KEY = 'yv-consent'

type ConsentContextValue = {
  /** `null` mientras no se ha leído el almacenamiento o no hay decisión previa. */
  consent: StoredConsent | null
  /** `true` cuando hay que mostrar el aviso. */
  needsDecision: boolean
  /** Panel de preferencias abierto. */
  panelOpen: boolean
  openPanel: () => void
  closePanel: () => void
  acceptAll: () => void
  rejectAll: () => void
  save: (choice: { analytics: boolean }) => void
  /** Borra la decisión y vuelve a mostrar el aviso. */
  reset: () => void
  ready: boolean
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

function read(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (parsed.version !== CONSENT_VERSION) return null
    return { ...parsed, necessary: true }
  } catch {
    return null
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(null)
  const [ready, setReady] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    setConsent(read())
    setReady(true)
  }, [])

  const persist = useCallback((analytics: boolean) => {
    const value: StoredConsent = {
      necessary: true,
      analytics,
      decidedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      /* Modo privado o almacenamiento bloqueado: la decisión vale solo para esta visita. */
    }
    setConsent(value)
    setPanelOpen(false)
  }, [])

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      ready,
      needsDecision: ready && consent === null,
      panelOpen,
      openPanel: () => setPanelOpen(true),
      closePanel: () => setPanelOpen(false),
      acceptAll: () => persist(true),
      rejectAll: () => persist(false),
      save: ({ analytics }) => persist(analytics),
      reset: () => {
        try {
          localStorage.removeItem(STORAGE_KEY)
        } catch {
          /* nada que hacer */
        }
        setConsent(null)
        setPanelOpen(false)
      },
    }),
    [consent, ready, panelOpen, persist],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent debe usarse dentro de <ConsentProvider>')
  return ctx
}

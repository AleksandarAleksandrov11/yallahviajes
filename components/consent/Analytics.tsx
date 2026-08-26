'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { useConsent } from './ConsentProvider'

/**
 * Analítica de Vercel. No se carga ni un byte hasta que la persona acepta
 * explícitamente la categoría «analítica»: es lo que exige el art. 22.2 de la
 * LSSI y lo que recomienda la guía de cookies de la AEPD.
 */
export function ConsentedAnalytics() {
  const { consent } = useConsent()

  if (!consent?.analytics) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

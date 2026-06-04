'use client'

import { useEffect } from 'react'
import { useMotionStore } from '@/store'
import { useAdaptiveMotion } from '@/hooks/useAdaptiveMotion'
import { useWebSocket }      from '@/hooks/useWebSocket'

export function RootProviders({ children }: { children: React.ReactNode }) {
  const detectCapabilities = useMotionStore((s) => s.detectCapabilities)

  // Detect GPU/motion capabilities on mount
  useEffect(() => { detectCapabilities() }, [detectCapabilities])

  // Adaptive motion quality monitoring
  useAdaptiveMotion()

  // WebSocket analytics connection
  useWebSocket()

  return <>{children}</>
}

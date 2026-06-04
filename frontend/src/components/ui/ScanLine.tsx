'use client'

import { useMotionStore } from '@/store'

export function ScanLine() {
  const reducedMotion = useMotionStore((s) => s.config.reducedMotion)
  if (reducedMotion) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[9997] h-px opacity-10 animate-scan"
      style={{
        background: 'linear-gradient(to right, transparent, rgba(199,255,63,0.6), transparent)',
        animationDuration: '12s',
      }}
    />
  )
}

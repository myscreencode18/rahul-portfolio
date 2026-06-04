'use client'

import { useEffect, useRef } from 'react'
import { useMotionStore } from '@/store'

/**
 * useAdaptiveMotion
 * Monitors real FPS over a 3-second window.
 * Drops motion quality automatically if GPU can't sustain 40fps:
 *   - Disables particles
 *   - Disables shaders
 *   - Disables blur effects
 * Re-enables if performance recovers.
 */
export function useAdaptiveMotion() {
  const { config, setConfig } = useMotionStore()
  const frames     = useRef<number[]>([])
  const animId     = useRef<number>()
  const downgraded = useRef(false)
  const upgraded   = useRef(false)

  useEffect(() => {
    if (config.reducedMotion) return   // respect user preference, never override

    const tick = (now: number) => {
      frames.current.push(now)
      // Keep only last 3 seconds
      frames.current = frames.current.filter((t) => now - t < 3000)
      const fps = frames.current.length / 3

      // Downgrade: sustained low FPS
      if (fps < 35 && !downgraded.current) {
        downgraded.current = true
        upgraded.current   = false
        setConfig({
          gpuTier:        'low',
          enableShaders:  false,
          enableParticles:false,
          enableBlur:     false,
        })
        console.warn('[AdaptiveMotion] Downgraded to low quality (fps=', fps.toFixed(0), ')')
      }

      // Upgrade: recovered FPS
      if (fps > 55 && downgraded.current && !upgraded.current) {
        upgraded.current   = true
        downgraded.current = false
        setConfig({
          gpuTier:        'medium',
          enableShaders:  false,      // keep shaders off after first downgrade
          enableParticles:true,
          enableBlur:     true,
        })
        console.info('[AdaptiveMotion] Upgraded to medium quality (fps=', fps.toFixed(0), ')')
      }

      animId.current = requestAnimationFrame(tick)
    }

    animId.current = requestAnimationFrame(tick)
    return () => {
      if (animId.current) cancelAnimationFrame(animId.current)
    }
  }, [config.reducedMotion, setConfig])
}

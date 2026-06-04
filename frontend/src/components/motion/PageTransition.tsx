'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useNavStore } from '@/store'

/**
 * PageTransition
 * Renders a full-screen mask panel that wipes in/out between route changes.
 * Uses GSAP clip-path transitions for a cinematic "signal wipe" feel.
 */
export function PageTransition() {
  const maskRef = useRef<HTMLDivElement>(null)
  const { nav } = useNavStore()

  useEffect(() => {
    if (!nav.isTransitioning || !maskRef.current) return

    const tl = gsap.timeline()

    // Wipe in
    tl.fromTo(maskRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
      { clipPath: 'inset(0 0% 0 0)',   duration: 0.45, ease: 'expo.inOut' }
    )
    // Wipe out
    .to(maskRef.current,
      { clipPath: 'inset(0 0% 0 100%)', duration: 0.45, ease: 'expo.inOut', delay: 0.1 }
    )
    .set(maskRef.current, { opacity: 0 })

    return () => { tl.kill() }
  }, [nav.isTransitioning])

  return (
    <div
      ref={maskRef}
      aria-hidden="true"
      className="fixed inset-0 z-[250] pointer-events-none"
      style={{
        opacity: 0,
        clipPath: 'inset(0 100% 0 0)',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #181818 100%)',
      }}
    >
      {/* Signal line across wipe */}
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[--accent-lime]/60 to-transparent" />
    </div>
  )
}

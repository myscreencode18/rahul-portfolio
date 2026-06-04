'use client'

import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useMagneticEffect(strength = 0.15) {
  const ref = useRef<HTMLElement>(null)

  const x  = useMotionValue(0)
  const y  = useMotionValue(0)
  const sx = useSpring(x, { damping: 12, stiffness: 180 })
  const sy = useSpring(y, { damping: 12, stiffness: 180 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      x.set((e.clientX - (rect.left + rect.width  / 2)) * strength)
      y.set((e.clientY - (rect.top  + rect.height / 2)) * strength)
    },
    [x, y, strength]
  )

  const onMouseLeave = useCallback(() => {
    x.set(0); y.set(0)
  }, [x, y])

  return { ref, sx, sy, onMouseMove, onMouseLeave }
}

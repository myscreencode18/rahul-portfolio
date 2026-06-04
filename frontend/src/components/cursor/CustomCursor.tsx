'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCursorStore } from '@/store'
import { cn } from '@/utils/cn'

export function CustomCursor() {
  const { cursor, setCursor, setCursorMode } = useCursorStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const dotX  = useMotionValue(0)
  const dotY  = useMotionValue(0)

  // Outer ring - lagged
  const springX = useSpring(mouseX, { damping: 20, stiffness: 200, mass: 0.5 })
  const springY = useSpring(mouseY, { damping: 20, stiffness: 200, mass: 0.5 })

  // Inner dot - instant
  const dotSpringX = useSpring(dotX, { damping: 40, stiffness: 600 })
  const dotSpringY = useSpring(dotY, { damping: 40, stiffness: 600 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      setCursor({ x: e.clientX, y: e.clientY })

      // Update CSS variables for lighting effects
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`)
    }

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor')
      if (cursorType) setCursorMode(cursorType as any)
      if (target.closest('a, button, [role="button"]')) {
        setCursor({ isHovering: true })
      }
    }

    const handleLeave = () => {
      setCursor({ isHovering: false })
      setCursorMode('default')
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleEnter)
    window.addEventListener('mouseout', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleEnter)
      window.removeEventListener('mouseout', handleLeave)
    }
  }, [mouseX, mouseY, dotX, dotY, setCursor, setCursorMode])

  const isArchitecture = cursor.mode === 'architecture'
  const isCinematic    = cursor.mode === 'cinematic'
  const isMagnetic     = cursor.mode === 'magnetic'

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-cursor hidden md:block">
      {/* Outer ring */}
      <motion.div
        style={{ x: springX, y: springY }}
        className={cn(
          'absolute -translate-x-1/2 -translate-y-1/2',
          'rounded-full border transition-all duration-200',
          cursor.isHovering
            ? 'w-12 h-12 border-[--accent-lime]'
            : isArchitecture
            ? 'w-10 h-10 border-[--accent-cyan]'
            : 'w-8 h-8 border-[--border-hover]'
        )}
      >
        {/* Architecture scan lines */}
        {isArchitecture && (
          <>
            <span className="absolute inset-x-0 top-1/2 h-px bg-[--accent-cyan]/30" />
            <span className="absolute inset-y-0 left-1/2 w-px bg-[--accent-cyan]/30" />
          </>
        )}

        {/* Magnetic pulse */}
        {isMagnetic && (
          <motion.span
            className="absolute inset-[-4px] rounded-full border border-[--accent-lime]/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{ x: dotSpringX, y: dotSpringY }}
        className={cn(
          'absolute -translate-x-1/2 -translate-y-1/2 rounded-full',
          'transition-all duration-150',
          cursor.isHovering
            ? 'w-1.5 h-1.5 bg-[--accent-lime]'
            : 'w-1 h-1 bg-[--text-secondary]'
        )}
      />

      {/* Mode label */}
      {cursor.mode !== 'default' && (
        <motion.div
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute ml-6 mt-4 -translate-y-1/2"
        >
          <span className="text-system text-[--accent-lime] whitespace-nowrap">
            {cursor.mode.toUpperCase()}
          </span>
        </motion.div>
      )}
    </div>
  )
}

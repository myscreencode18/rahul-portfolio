'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/utils/cn'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'ghost' | 'outline'
  'data-cursor'?: string
}

export function MagneticButton({
  children,
  className,
  strength = 0.15,
  onClick,
  href,
  variant = 'outline',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const x  = useMotionValue(0)
  const y  = useMotionValue(0)
  const sx = useSpring(x, { damping: 12, stiffness: 180 })
  const sy = useSpring(y, { damping: 12, stiffness: 180 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width  / 2)) * strength)
    y.set((e.clientY - (rect.top  + rect.height / 2)) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0); y.set(0); setHovered(false)
  }

  const baseClass = cn(
    'relative inline-flex items-center justify-center gap-2',
    'px-7 py-3.5 text-label',
    'transition-colors duration-300 select-none',
    variant === 'primary' && 'bg-[--accent-lime] text-[--bg-primary] hover:bg-white',
    variant === 'outline' && 'border border-[--border] text-[--text-secondary] hover:border-[--border-accent] hover:text-[--accent-lime]',
    variant === 'ghost'   && 'text-[--text-secondary] hover:text-[--text-primary]',
    className
  )

  const inner = (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="magnetic-btn"
      data-cursor="magnetic"
    >
      <span className={baseClass} onClick={onClick}>
        {children}
        {/* Hover line */}
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-[--accent-lime]"
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
    </motion.div>
  )

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  }
  return inner
}

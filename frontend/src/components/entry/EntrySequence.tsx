'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { AnimatePresence, motion } from 'framer-motion'
import { useBootStore } from '@/store'
import { cn } from '@/utils/cn'

const BOOT_SEQUENCE = [
  { id: 'init',       message: 'SYSTEM INITIALIZATION...',        delay: 200  },
  { id: 'interface',  message: 'LOADING INTERFACE LAYER...',      delay: 600  },
  { id: 'react',      message: 'REACT RUNTIME READY',             delay: 1000 },
  { id: 'motion',     message: 'SYNCING MOTION ENGINE...',        delay: 1400 },
  { id: 'gsap',       message: 'GSAP TIMELINE CALIBRATED',        delay: 1800 },
  { id: 'three',      message: 'THREE.JS RENDERER ONLINE',        delay: 2200 },
  { id: 'ai',         message: 'AI ORCHESTRATION ACTIVE',         delay: 2700 },
  { id: 'complete',   message: 'INTERFACE READY — ENTERING...',   delay: 3100 },
]

export function EntrySequence() {
  const { state, addLog, setComplete, setProgress } = useBootStore()
  const [visible, setVisible] = useState(true)
  const [logs, setLogs] = useState<string[]>([])
  const [showIdentity, setShowIdentity] = useState(false)
  const overlayRef  = useRef<HTMLDivElement>(null)
  const meshRef     = useRef<HTMLDivElement>(null)
  const nameRef     = useRef<HTMLDivElement>(null)
 const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (state.complete) return

    tl.current = gsap.timeline()

    // Phase 1 — boot logs
    BOOT_SEQUENCE.forEach(({ id, message, delay }, index) => {
      tl.current!.call(
        () => setLogs((prev) => [...prev, message]),
        [],
        delay / 1000
      )
      tl.current!.call(
        () => setProgress(Math.round(((index + 1) / BOOT_SEQUENCE.length) * 70)),
        [],
        delay / 1000
      )
    })

    // Phase 2 — show spatial mesh + name
    tl.current!
      .call(() => setShowIdentity(true), [], 3.4)
      .call(() => setProgress(100), [], 4.0)

    // Phase 3 — exit animation
    tl.current!
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 1.2,
        onComplete: () => {
          setVisible(false)
          setComplete()
        },
      }, 4.2)

    return () => { tl.current?.kill() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="entry-overlay flex-col"
      aria-live="polite"
      aria-label="System initializing"
    >
      {/* Scan line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[--accent-lime]/20 to-transparent animate-scan pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 system-grid opacity-30" />

      {/* Corner coords */}
      <span className="absolute top-6 left-8 text-system text-[--text-muted]">
        28.6448° N, 77.2167° E
      </span>
      <span className="absolute top-6 right-8 text-system text-[--text-muted]">
        v2.0.0 / 2025
      </span>

      <div className="relative w-full max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-start md:items-end gap-16 md:gap-24">

        {/* Left — terminal logs */}
        <div className="w-full md:w-72 flex-shrink-0">
          <p className="text-system text-[--text-muted] mb-4">BOOT SEQUENCE</p>
          <div className="space-y-1.5">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'font-mono text-[0.65rem] tracking-wider',
                  i === logs.length - 1 ? 'text-[--accent-lime]' : 'text-[--text-muted]'
                )}
              >
                <span className="text-[--text-muted] mr-2">{'>'}</span>
                {log}
                {i === logs.length - 1 && (
                  <span className="terminal-cursor" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-px bg-[--border] relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[--accent-lime]"
              style={{ width: `${state.progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-system text-[--text-muted]">LOADING</span>
            <span className="text-system text-[--accent-lime]">{state.progress}%</span>
          </div>
        </div>

        {/* Right — identity reveal */}
        <AnimatePresence>
          {showIdentity && (
            <div ref={nameRef} className="flex-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Name — massive compressed */}
                <div className="overflow-hidden mb-2">
                  <motion.h1
                    className="text-hero text-[--text-primary] leading-none font-display font-bold"
                    initial={{ y: '110%', skewY: 8 }}
                    animate={{ y: '0%', skewY: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    RAHUL
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    className="text-hero text-[--accent-lime] leading-none font-display font-bold"
                    initial={{ y: '110%', skewY: 8 }}
                    animate={{ y: '0%', skewY: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  >
                    GUPTA
                  </motion.h1>
                </div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-6 flex flex-col gap-1"
                >
                  <span className="text-label text-[--text-secondary]">
                    EXPERIENCE ENGINEER
                  </span>
                  <span className="text-system text-[--text-muted]">
                    FULL STACK · AI · MOTION · SYSTEMS
                  </span>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="mt-10 flex items-center gap-3"
                >
                  <div className="relative w-12 h-px bg-[--border] overflow-hidden">
                    <span className="absolute inset-0 bg-[--accent-lime] animate-signal" />
                  </div>
                  <span className="text-system text-[--text-muted]">SCROLL TO EXPLORE</span>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-6 left-8 right-8 flex justify-between items-center">
        <span className="text-system text-[--text-muted]">
          STATUS: {state.complete ? 'READY' : 'INITIALIZING'}
        </span>
        <span className="text-system text-[--text-muted]">
          NEXT.JS · GSAP · THREE.JS · AI
        </span>
      </div>
    </div>
  )
}

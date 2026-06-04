'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionStore } from '@/store'
import { cn } from '@/utils/cn'

interface Stats {
  fps:     number
  fpsMin:  number
  fpsMax:  number
  heap:    number | null
  heapMax: number | null
  gpu:     string
}

export function PerformanceMonitor() {
  const [stats, setStats]   = useState<Stats>({ fps: 60, fpsMin: 60, fpsMax: 60, heap: null, heapMax: null, gpu: '—' })
  const [visible, setVisible] = useState(false)
  const fpsHistory = useRef<number[]>([])
  const frames     = useRef<number[]>([])
  const gpuTier    = useMotionStore((s) => s.config.gpuTier)

  /* FPS counter */
  useEffect(() => {
    let animId: number
    const tick = (now: number) => {
      frames.current.push(now)
      frames.current = frames.current.filter((t) => now - t < 1000)
      const current = frames.current.length

      fpsHistory.current.push(current)
      if (fpsHistory.current.length > 60) fpsHistory.current.shift()

      const min = Math.min(...fpsHistory.current)
      const max = Math.max(...fpsHistory.current)

      // Memory (Chrome only)
      const perf = performance as any
      const heap    = perf?.memory ? perf.memory.usedJSHeapSize  / 1024 / 1024 : null
      const heapMax = perf?.memory ? perf.memory.jsHeapSizeLimit / 1024 / 1024 : null

      setStats({ fps: current, fpsMin: min, fpsMax: max, heap, heapMax, gpu: gpuTier })
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [gpuTier])

  /* Keyboard: P toggles */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'p' && !e.ctrlKey && !e.metaKey) {
        const el = document.activeElement
        if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return
        setVisible((v) => !v)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const fpsColor = stats.fps >= 55 ? '#C7FF3F' : stats.fps >= 30 ? '#FFD700' : '#FF6B6B'
  const heapPct  = stats.heap && stats.heapMax ? (stats.heap / stats.heapMax) * 100 : 0

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setVisible((v) => !v)}
        className={cn(
          'fixed bottom-6 left-6 z-overlay',
          'text-system px-2.5 py-1.5 border transition-all duration-300',
          visible
            ? 'border-[--border-accent] text-[--accent-lime]'
            : 'border-[--border] text-[--text-muted] hover:text-[--text-secondary]'
        )}
        aria-label="Toggle performance monitor"
        title="Toggle performance monitor (P)"
      >
        {stats.fps}fps
      </button>

      {/* HUD panel */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 left-6 z-overlay panel-dark p-4 border border-[--border]"
            style={{ width: 200 }}
          >
            <p className="text-system text-[--text-muted] mb-3">PERFORMANCE MONITOR</p>

            {/* FPS bar */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-system text-[--text-muted]">FPS</span>
                <span className="font-mono text-xs font-bold" style={{ color: fpsColor }}>{stats.fps}</span>
              </div>
              <div className="h-1 bg-[--border] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: fpsColor }}
                  animate={{ width: `${Math.min((stats.fps / 60) * 100, 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-system text-[--text-muted]">MIN {stats.fpsMin}</span>
                <span className="text-system text-[--text-muted]">MAX {stats.fpsMax}</span>
              </div>
            </div>

            {/* Memory */}
            {stats.heap !== null && (
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-system text-[--text-muted]">JS HEAP</span>
                  <span className="font-mono text-xs text-[--accent-cyan]">{stats.heap.toFixed(1)}MB</span>
                </div>
                <div className="h-1 bg-[--border] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[--accent-cyan]"
                    animate={{ width: `${Math.min(heapPct, 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* GPU tier */}
            <div className="flex justify-between pt-2 border-t border-[--border]">
              <span className="text-system text-[--text-muted]">GPU TIER</span>
              <span className={cn(
                'text-system uppercase',
                stats.gpu === 'high'   && 'text-[--accent-lime]',
                stats.gpu === 'medium' && 'text-[#FFD700]',
                stats.gpu === 'low'    && 'text-[#FF6B6B]',
              )}>
                {stats.gpu}
              </span>
            </div>

            <p className="text-system text-[--text-muted] mt-3">PRESS P TO CLOSE</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

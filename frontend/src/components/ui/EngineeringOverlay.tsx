// 'use client'

// import { useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useSiteModeStore } from '@/store'

// /**
//  * EngineeringOverlay
//  * When Engineering Mode is active:
//  *  - attaches data-mode="engineering" to <html>
//  *  - shows a floating HUD with live architectural metadata
//  *  - reveals .eng-label elements site-wide (CSS-driven)
//  */
// export function EngineeringOverlay() {
//   const { mode, setMode } = useSiteModeStore()
//   const isEngineering = mode === 'engineering'

//   /* Sync data-mode attribute to <html> so CSS eng-label rules fire */
//   useEffect(() => {
//     document.documentElement.setAttribute('data-mode', mode)
//   }, [mode])

//   /* Keyboard shortcut: E toggles */
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === 'e' && !e.ctrlKey && !e.metaKey && !e.altKey) {
//         const active = document.activeElement
//         if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return
//         setMode(mode === 'engineering' ? 'experience' : 'engineering')
//       }
//     }
//     window.addEventListener('keydown', handler)
//     return () => window.removeEventListener('keydown', handler)
//   }, [mode, setMode])

//   return (
//     <AnimatePresence>
//       {isEngineering && (
//         <motion.div
//           key="eng-hud"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 20 }}
//           transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//           className="fixed right-6 top-20 z-overlay pointer-events-none"
//           style={{ width: 220 }}
//         >
//           <div className="panel-dark p-4 border border-[--border-accent]">
//             {/* Header */}
//             <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[--border]">
//               <div className="w-1.5 h-1.5 rounded-full bg-[--accent-lime] animate-pulse" />
//               <span className="text-system text-[--accent-lime]">ENGINEERING MODE</span>
//             </div>

//             {/* Stack metadata */}
//             <div className="space-y-2">
//               {[
//                 { label: 'FRAMEWORK',   value: 'Next.js 14 · App Router' },
//                 { label: 'MOTION',      value: 'GSAP · Framer Motion · Lenis' },
//                 { label: '3D',          value: 'Three.js · React Three Fiber' },
//                 { label: 'STATE',       value: 'Zustand 4' },
//                 { label: 'STYLING',     value: 'Tailwind · SCSS Modules' },
//                 { label: 'SHADERS',     value: 'GLSL · WebGL' },
//                 { label: 'BACKEND',     value: 'Hono · PostgreSQL · Redis' },
//                 { label: 'AI',          value: 'OpenAI · LangChain' },
//               ].map(({ label, value }) => (
//                 <div key={label} className="flex justify-between gap-2">
//                   <span className="text-system text-[--text-muted] flex-shrink-0">{label}</span>
//                   <span className="text-system text-[--text-secondary] text-right">{value}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Performance */}
//             <div className="mt-4 pt-3 border-t border-[--border]">
//               <LivePerfStats />
//             </div>

//             <p className="text-system text-[--text-muted] mt-3">PRESS E TO EXIT</p>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// /** Tiny FPS + memory stats widget */
// function LivePerfStats() {
//   return (
//     <div className="space-y-1.5">
//       <FpsCounter />
//       <MemCounter />
//     </div>
//   )
// }

// function FpsCounter() {
//   const [fps, setFps] = React.useState(60)
//   const frames = React.useRef<number[]>([])

//   React.useEffect(() => {
//     let animId: number
//     const tick = (now: number) => {
//       frames.current.push(now)
//       frames.current = frames.current.filter((t) => now - t < 1000)
//       setFps(frames.current.length)
//       animId = requestAnimationFrame(tick)
//     }
//     animId = requestAnimationFrame(tick)
//     return () => cancelAnimationFrame(animId)
//   }, [])

//   const color = fps >= 55 ? '#C7FF3F' : fps >= 30 ? '#FFD700' : '#FF6B6B'

//   return (
//     <div className="flex justify-between">
//       <span className="text-system text-[--text-muted]">FPS</span>
//       <span className="text-system font-mono" style={{ color }}>{fps}</span>
//     </div>
//   )
// }

// function MemCounter() {
//   const [mem, setMem] = React.useState<string>('—')

//   React.useEffect(() => {
//     const read = () => {
//       const perf = performance as any
//       if (perf?.memory) {
//         const mb = (perf.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)
//         setMem(`${mb} MB`)
//       }
//     }
//     read()
//     const id = setInterval(read, 2000)
//     return () => clearInterval(id)
//   }, [])

//   return (
//     <div className="flex justify-between">
//       <span className="text-system text-[--text-muted]">JS HEAP</span>
//       <span className="text-system font-mono text-[--accent-cyan]">{mem}</span>
//     </div>
//   )
// }

// /* Need React import for the inner components */
// import React from 'react'
// 'use client'

// import React, { useEffect, useRef, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useSiteModeStore } from '@/store'

// // ── FPS Counter ───────────────────────────────────────────────────────────────

// function FpsCounter() {
//   const [fps, setFps]    = useState(60)
//   const frames           = useRef<number[]>([])

//   useEffect(() => {
//     let animId: number
//     const tick = (now: number) => {
//       frames.current.push(now)
//       frames.current = frames.current.filter((t) => now - t < 1000)
//       setFps(frames.current.length)
//       animId = requestAnimationFrame(tick)
//     }
//     animId = requestAnimationFrame(tick)
//     return () => cancelAnimationFrame(animId)
//   }, [])

//   const color = fps >= 55 ? '#C7FF3F' : fps >= 30 ? '#FFD700' : '#FF6B6B'

//   return (
//     <div className="flex justify-between">
//       <span className="text-system text-[--text-muted]">FPS</span>
//       <span className="text-system font-mono" style={{ color }}>{fps}</span>
//     </div>
//   )
// }

// // ── Memory Counter ────────────────────────────────────────────────────────────

// function MemCounter() {
//   const [mem, setMem] = useState<string>('—')

//   useEffect(() => {
//     const read = () => {
//       const perf = performance as any
//       if (perf?.memory) {
//         const mb = (perf.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)
//         setMem(`${mb} MB`)
//       }
//     }
//     read()
//     const id = setInterval(read, 2000)
//     return () => clearInterval(id)
//   }, [])

//   return (
//     <div className="flex justify-between">
//       <span className="text-system text-[--text-muted]">JS HEAP</span>
//       <span className="text-system font-mono text-[--accent-cyan]">{mem}</span>
//     </div>
//   )
// }

// // ── Stack metadata ────────────────────────────────────────────────────────────

// const STACK_META = [
//   { label: 'FRAMEWORK', value: 'Next.js  · App Router'      },
//   { label: 'MOTION',    value: 'GSAP · Framer Motion · Lenis' },
//   { label: '3D',        value: 'Three.js · React Three Fiber' },
//   { label: 'STATE',     value: 'Zustand 5'                    },
//   { label: 'STYLING',   value: 'Tailwind · SCSS Modules'      },
//   { label: 'SHADERS',   value: 'GLSL · WebGL'                 },
//   { label: 'MOBILE',    value: 'React Native · Flutter'       },
//   { label: 'BACKEND',   value: 'Hono · PostgreSQL · Redis'    },
//   { label: 'AI',        value: 'OpenAI · LangChain'           },
// ]

// // ── Main overlay ──────────────────────────────────────────────────────────────

// export function EngineeringOverlay() {
//   const { mode, setMode } = useSiteModeStore()
//   const isEngineering     = mode === 'engineering'

//   // Sync data-mode to <html> so CSS .eng-label rules fire
//   useEffect(() => {
//     document.documentElement.setAttribute('data-mode', mode)
//   }, [mode])

//   // Keyboard shortcut: E toggles engineering mode
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if (e.key !== 'e' || e.ctrlKey || e.metaKey || e.altKey) return
//       const active = document.activeElement
//       if (active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA') return
//       setMode(mode === 'engineering' ? 'experience' : 'engineering')
//     }
//     window.addEventListener('keydown', handler)
//     return () => window.removeEventListener('keydown', handler)
//   }, [mode, setMode])

//   return (
//     <AnimatePresence>
//       {isEngineering && (
//         <motion.div
//           key="eng-hud"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: 20 }}
//           transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//           className="fixed right-6 top-20 z-[60]"
//           style={{ width: 240 }}
//         >
//           <div
//             className="border border-[--border-accent] bg-[--bg-secondary]"
//             style={{ backdropFilter: 'blur(8px)' }}
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between px-4 py-3 border-b border-[--border]">
//               <div className="flex items-center gap-2">
//                 <motion.div
//                   className="w-1.5 h-1.5 rounded-full bg-[--accent-lime]"
//                   animate={{ opacity: [1, 0.3, 1] }}
//                   transition={{ duration: 1.6, repeat: Infinity }}
//                 />
//                 <span className="text-system text-[--accent-lime]">ENGINEERING MODE</span>
//               </div>

//               {/* Close button */}
//               <button
//                 onClick={() => setMode('experience')}
//                 className="text-system text-[--text-muted] hover:text-[--accent-lime] transition-colors duration-200 leading-none"
//                 aria-label="Exit engineering mode"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Stack metadata */}
//             <div className="px-4 py-3 space-y-2 border-b border-[--border]">
//               {STACK_META.map(({ label, value }) => (
//                 <div key={label} className="flex justify-between gap-3">
//                   <span className="text-system text-[--text-muted] flex-shrink-0">{label}</span>
//                   <span className="text-system text-[--text-secondary] text-right">{value}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Live performance */}
//             <div className="px-4 py-3 space-y-2 border-b border-[--border]">
//               <span className="text-system text-[--text-muted] block mb-2">PERFORMANCE</span>
//               <FpsCounter />
//               <MemCounter />
//             </div>

//             {/* Footer hint */}
//             <div className="px-4 py-2.5">
//               <p className="text-system text-[--text-muted]">
//                 PRESS <kbd className="border border-[--border] px-1 py-0.5 text-[--text-secondary]">E</kbd> TO TOGGLE
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteModeStore } from '@/store'

// ── FPS Counter ───────────────────────────────────────────────────────────────

function FpsCounter() {
  const [fps, setFps] = useState(60)
  const frames = useRef<number[]>([])

  useEffect(() => {
    let animId: number

    const tick = (now: number) => {
      frames.current.push(now)
      frames.current = frames.current.filter((t) => now - t < 1000)
      setFps(frames.current.length)
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  const color =
    fps >= 55 ? '#C7FF3F' : fps >= 30 ? '#FFD700' : '#FF6B6B'

  return (
    <div className="flex justify-between">
      <span className="text-system text-[--text-muted]">FPS</span>
      <span className="text-system font-mono" style={{ color }}>
        {fps}
      </span>
    </div>
  )
}

// ── Memory Counter ────────────────────────────────────────────────────────────

function MemCounter() {
  const [mem, setMem] = useState<string>('—')

  useEffect(() => {
    const read = () => {
      const perf = performance as any
      if (perf?.memory) {
        const mb = (perf.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)
        setMem(`${mb} MB`)
      }
    }

    read()
    const id = setInterval(read, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex justify-between">
      <span className="text-system text-[--text-muted]">JS HEAP</span>
      <span className="text-system font-mono text-[--accent-cyan]">
        {mem}
      </span>
    </div>
  )
}

// ── Stack metadata ────────────────────────────────────────────────────────────

const STACK_META = [
  { label: 'FRAMEWORK', value: 'Next.js  · App Router' },
  { label: 'MOTION', value: 'GSAP · Framer Motion · Lenis' },
  { label: '3D', value: 'Three.js · React Three Fiber' },
  { label: 'STATE', value: 'Zustand 5' },
  { label: 'STYLING', value: 'Tailwind · SCSS Modules' },
  { label: 'SHADERS', value: 'GLSL · WebGL' },
  { label: 'MOBILE', value: 'React Native · Flutter' },
  { label: 'BACKEND', value: 'Hono · PostgreSQL · Redis' },
  { label: 'AI', value: 'OpenAI · LangChain' },
]

// ── Main overlay ──────────────────────────────────────────────────────────────

export function EngineeringOverlay() {
  const { mode, setMode } = useSiteModeStore()
  const isEngineering = mode === 'engineering'

  // Sync mode to html
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  // Toggle with E key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'e' || e.ctrlKey || e.metaKey || e.altKey) return

      const active = document.activeElement
      if (
        active?.tagName === 'INPUT' ||
        active?.tagName === 'TEXTAREA'
      )
        return

      setMode(mode === 'engineering' ? 'experience' : 'engineering')
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [mode, setMode])

  return (
    <AnimatePresence>
      {isEngineering && (
        <motion.div
          key="eng-hud"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-6 top-20 z-[60] w-[240px]"
        >
          <div className="border border-[--border-accent] bg-[--bg-secondary]/80 backdrop-blur-md">

            {/* ── Header ───────────────────── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[--border]">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[--accent-lime]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                <span className="text-system text-[--accent-lime] tracking-wider">
                  ENGINEERING MODE
                </span>
              </div>

              <button
                onClick={() => setMode('experience')}
                className="w-6 h-6 flex items-center justify-center text-[--text-muted] hover:text-[--accent-lime] transition"
                aria-label="Exit engineering mode"
              >
                ✕
              </button>
            </div>

            {/* ── Stack ─────────────────────── */}
            <div className="px-4 py-3 border-b border-[--border] space-y-2">
              {STACK_META.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-[90px_1fr] gap-3 items-start"
                >
                  <span className="text-system text-[--text-muted]">
                    {label}
                  </span>
                  <span className="text-system text-[--text-secondary] text-right leading-snug">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Performance ───────────────── */}
            <div className="px-4 py-3 border-b border-[--border] space-y-3">
              <span className="text-system text-[--text-muted] block">
                PERFORMANCE
              </span>

              <div className="space-y-2">
                <FpsCounter />
                <MemCounter />
              </div>
            </div>

            {/* ── Footer hint ──────────────── */}
            <div className="px-4 py-3 text-center">
              <p className="text-system text-[--text-muted]">
                PRESS{' '}
                <kbd className="border border-[--border] px-1 py-0.5 text-[--text-secondary]">
                  E
                </kbd>{' '}
                TO TOGGLE
              </p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
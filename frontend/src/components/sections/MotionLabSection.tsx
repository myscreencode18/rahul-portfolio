// 'use client'

// import { useRef, useState } from 'react'
// import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
// import { useSectionReveal } from '@/hooks/useSectionReveal'
// import { cn } from '@/utils/cn'

// const EXPERIMENTS = [
//   {
//     id: 'magnetic',
//     label: 'MAGNETIC BUTTONS',
//     description: 'Physics-based tension and resistance',
//     tag: 'INTERACTION',
//     color: '#C7FF3F',
//   },
//   {
//     id: 'typography',
//     label: 'KINETIC TYPE',
//     description: 'Velocity-reactive character splitting',
//     tag: 'TYPOGRAPHY',
//     color: '#7AE7FF',
//   },
//   {
//     id: 'grid',
//     label: 'SIGNAL GRID',
//     description: 'Cursor-reactive node network',
//     tag: 'CANVAS',
//     color: '#D6C7B2',
//   },
//   {
//     id: 'reveal',
//     label: 'CLIP REVEALS',
//     description: 'Scroll-driven cinematic reveals',
//     tag: 'SCROLL',
//     color: '#C7FF3F',
//   },
//   {
//     id: 'depth',
//     label: 'DEPTH LAYERS',
//     description: 'Parallax spatial depth system',
//     tag: 'PARALLAX',
//     color: '#7AE7FF',
//   },
//   {
//     id: 'morph',
//     label: 'LAYOUT MORPH',
//     description: 'GSAP Flip intelligent transitions',
//     tag: 'GSAP FLIP',
//     color: '#D6C7B2',
//   },
// ]

// function MagneticCard({ experiment }: { experiment: typeof EXPERIMENTS[0] }) {
//   const cardRef = useRef<HTMLDivElement>(null)
//   const [hovered, setHovered] = useState(false)

//   const x = useMotionValue(0)
//   const y = useMotionValue(0)
//   const sx = useSpring(x, { damping: 15, stiffness: 200 })
//   const sy = useSpring(y, { damping: 15, stiffness: 200 })

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!cardRef.current) return
//     const rect = cardRef.current.getBoundingClientRect()
//     const cx = rect.left + rect.width / 2
//     const cy = rect.top + rect.height / 2
//     x.set((e.clientX - cx) * 0.12)
//     y.set((e.clientY - cy) * 0.12)
//   }

//   const handleMouseLeave = () => {
//     x.set(0)
//     y.set(0)
//     setHovered(false)
//   }

//   return (
//     <motion.div
//       ref={cardRef}
//       style={{ x: sx, y: sy }}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={handleMouseLeave}
//       className={cn(
//         'panel p-6 cursor-pointer transition-all duration-300 group',
//         hovered && 'border-[--border-hover]'
//       )}
//       data-cursor="interaction"
//     >
//       {/* Tag */}
//       <div className="flex items-center justify-between mb-6">
//         <span className="text-system px-2 py-1 border border-[--border]"
//           style={{ color: experiment.color, borderColor: experiment.color + '40' }}>
//           {experiment.tag}
//         </span>
//         <motion.span
//           animate={{ rotate: hovered ? 45 : 0 }}
//           transition={{ duration: 0.3 }}
//           className="text-[--text-muted] text-lg"
//         >
//           +
//         </motion.span>
//       </div>

//       {/* Preview area */}
//       <div className="h-24 mb-4 relative overflow-hidden border border-[--border] flex items-center justify-center">
//         <motion.div
//           animate={hovered ? { scale: 1.05, opacity: 1 } : { scale: 1, opacity: 0.4 }}
//           transition={{ duration: 0.3 }}
//           className="text-system"
//           style={{ color: experiment.color }}
//         >
//           {experiment.id === 'magnetic' && (
//             <div className="flex gap-3">
//               {['◈', '◉', '◫'].map((s, i) => (
//                 <motion.span
//                   key={i}
//                   animate={hovered ? { y: [0, -4, 0] } : { y: 0 }}
//                   transition={{ duration: 0.5, delay: i * 0.08, repeat: hovered ? Infinity : 0 }}
//                   className="text-xl"
//                 >
//                   {s}
//                 </motion.span>
//               ))}
//             </div>
//           )}
//           {experiment.id === 'typography' && (
//             <div className="font-display font-bold text-2xl tracking-tight">
//               {'KINETIC'.split('').map((c, i) => (
//                 <motion.span
//                   key={i}
//                   animate={hovered ? { y: [0, -6, 0] } : { y: 0 }}
//                   transition={{ duration: 0.4, delay: i * 0.05, repeat: hovered ? Infinity : 0 }}
//                   className="inline-block"
//                 >
//                   {c}
//                 </motion.span>
//               ))}
//             </div>
//           )}
//           {experiment.id === 'grid' && (
//             <div className="grid grid-cols-5 gap-2">
//               {Array.from({ length: 10 }).map((_, i) => (
//                 <motion.div
//                   key={i}
//                   animate={hovered ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.2 }}
//                   transition={{ duration: 1, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}
//                   className="w-1.5 h-1.5 rounded-full"
//                   style={{ background: experiment.color }}
//                 />
//               ))}
//             </div>
//           )}
//           {(experiment.id === 'reveal' || experiment.id === 'depth' || experiment.id === 'morph') && (
//             <span className="text-2xl">{['▭', '⊞', '⊟'][['reveal','depth','morph'].indexOf(experiment.id)]}</span>
//           )}
//         </motion.div>
//       </div>

//       {/* Label */}
//       <p className="text-label text-[--text-secondary] group-hover:text-[--text-primary] transition-colors duration-300 mb-1">
//         {experiment.label}
//       </p>
//       <p className="text-system text-[--text-muted]">{experiment.description}</p>
//     </motion.div>
//   )
// }

// export function MotionLabSection() {
//   const sectionRef = useRef<HTMLElement>(null)
//   const isInView   = useInView(sectionRef, { once: true, margin: '-15%' })
//   useSectionReveal(sectionRef)

//   return (
//     <section
//       id="lab"
//       ref={sectionRef}
//       className="relative section-padding overflow-hidden"
//       data-section="lab"
//     >
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[--bg-secondary]/40 to-transparent" />
//       <div className="container-system relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="mb-16"
//         >
//           <div className="section-number"><span className="accent-line" />05 / MOTION LABORATORY</div>
//           <h2 className="text-display font-display font-bold text-[--text-primary] mb-4">
//             Motion Lab
//           </h2>
//           <p className="text-body max-w-xl">
//             Interactive motion experiments. Each one a different frontier of web animation — built to push what's possible.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {EXPERIMENTS.map((exp, i) => (
//             <motion.div
//               key={exp.id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: i * 0.08 }}
//             >
//               <MagneticCard experiment={exp} />
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : {}}
//           transition={{ delay: 0.8 }}
//           className="mt-10 text-center"
//         >
//           <p className="text-system text-[--text-muted]">
//             HOVER EACH CARD — MOTION RESPONDS TO YOUR INTENT
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useInView, animate } from 'framer-motion'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { cn } from '@/utils/cn'

// ── 1. MAGNETIC BUTTONS — real physics pull ───────────────────────────────────

function MagneticPreview() {
  const buttons = ['PULL', 'PUSH', 'SNAP']
  return (
    <div className="flex gap-3 items-center justify-center w-full h-full">
      {buttons.map((label, i) => {
        const x = useMotionValue(0)
        const y = useMotionValue(0)
        const sx = useSpring(x, { damping: 8, stiffness: 150 })
        const sy = useSpring(y, { damping: 8, stiffness: 150 })

        const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
          const r = e.currentTarget.getBoundingClientRect()
          x.set((e.clientX - (r.left + r.width / 2)) * 0.4)
          y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
        }

        return (
          <motion.div
            key={label}
            style={{ x: sx, y: sy }}
            onMouseMove={handleMove}
            onMouseLeave={() => { x.set(0); y.set(0) }}
            className="px-3 py-1.5 border border-[#C7FF3F]/40 text-[#C7FF3F] cursor-pointer"
            style={{ x: sx, y: sy, fontSize: '0.6rem', letterSpacing: '0.1em' }}
            whileHover={{ borderColor: '#C7FF3F', backgroundColor: 'rgba(199,255,63,0.08)' }}
          >
            {label}
          </motion.div>
        )
      })}
    </div>
  )
}

// ── 2. KINETIC TYPE — real velocity-based character distortion ────────────────

function KineticTypePreview() {
  const [mouseX, setMouseX] = useState(0.5)
  const text = 'KINETIC'

  return (
    <div
      className="flex items-center justify-center w-full h-full cursor-crosshair"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setMouseX((e.clientX - r.left) / r.width)
      }}
      onMouseLeave={() => setMouseX(0.5)}
    >
      <div className="flex overflow-hidden">
        {text.split('').map((char, i) => {
          const dist  = Math.abs(i / (text.length - 1) - mouseX)
          const pull  = Math.max(0, 1 - dist * 2.5)
          return (
            <motion.span
              key={i}
              animate={{
                y:       -pull * 14,
                scaleY:  1 + pull * 0.5,
                scaleX:  1 - pull * 0.15,
                color:   pull > 0.3 ? '#C7FF3F' : '#8A8A8A',
              }}
              transition={{ type: 'spring', damping: 10, stiffness: 200 }}
              className="font-display font-bold text-xl inline-block origin-bottom"
              style={{ letterSpacing: '-0.02em' }}
            >
              {char}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}

// ── 3. SIGNAL GRID — real cursor-reactive node network ────────────────────────

function SignalGridPreview() {
  const [mouse, setMouse] = useState({ x: -1, y: -1 })
  const COLS = 6, ROWS = 4

  return (
    <div
      className="flex items-center justify-center w-full h-full"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setMouse({
          x: (e.clientX - r.left) / r.width,
          y: (e.clientY - r.top)  / r.height,
        })
      }}
      onMouseLeave={() => setMouse({ x: -1, y: -1 })}
    >
      <div
        className="grid gap-2.5"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, idx) => {
          const col  = idx % COLS
          const row  = Math.floor(idx / COLS)
          const nx   = col / (COLS - 1)
          const ny   = row / (ROWS - 1)
          const dist = mouse.x < 0 ? 1 : Math.hypot(nx - mouse.x, ny - mouse.y)
          const glow = Math.max(0, 1 - dist * 3)

          return (
            <motion.div
              key={idx}
              animate={{
                scale:   1 + glow * 1.4,
                opacity: 0.15 + glow * 0.85,
              }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: glow > 0.3 ? '#C7FF3F' : '#D6C7B2' }}
            />
          )
        })}
      </div>
    </div>
  )
}

// ── 4. CLIP REVEALS — real scroll-like cinematic wipe ────────────────────────

function ClipRevealPreview({ active }: { active: boolean }) {
  const words = ['REVEAL', 'LAYER', 'SYSTEM']
  return (
    <div className="flex flex-col gap-1.5 items-start justify-center w-full h-full px-4">
      {words.map((word, i) => (
        <div key={word} className="overflow-hidden">
          <motion.div
            animate={active
              ? { y: 0, opacity: 1, skewY: 0 }
              : { y: '110%', opacity: 0, skewY: 6 }
            }
            transition={{
              duration: 0.55,
              delay: active ? i * 0.1 : (words.length - 1 - i) * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display font-bold text-base"
            style={{ color: i === 0 ? '#C7FF3F' : '#8A8A8A', letterSpacing: '-0.02em' }}
          >
            {word}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

// ── 5. DEPTH LAYERS — real parallax spatial depth ────────────────────────────

function DepthLayersPreview() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const layers = [
    { depth: 0.05, size: 56, opacity: 0.12, border: true  },
    { depth: 0.12, size: 36, opacity: 0.25, border: true  },
    { depth: 0.22, size: 18, opacity: 0.6,  border: false },
    { depth: 0.35, size: 6,  opacity: 1.0,  border: false },
  ]

  return (
    <div
      className="relative flex items-center justify-center w-full h-full cursor-move"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setMouse({
          x: ((e.clientX - r.left) / r.width  - 0.5) * 2,
          y: ((e.clientY - r.top)  / r.height - 0.5) * 2,
        })
      }}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
    >
      {layers.map((l, i) => (
        <motion.div
          key={i}
          animate={{
            x: mouse.x * l.depth * 40,
            y: mouse.y * l.depth * 40,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 180 }}
          className="absolute rounded-full"
          style={{
            width:   l.size,
            height:  l.size,
            opacity: l.opacity,
            border:  l.border ? '1px solid #C7FF3F' : 'none',
            background: l.border ? 'transparent' : '#C7FF3F',
          }}
        />
      ))}
    </div>
  )
}

// ── 6. LAYOUT MORPH — real GSAP Flip-style layout transition ─────────────────

function LayoutMorphPreview({ active }: { active: boolean }) {
  const [layout, setLayout] = useState<'grid' | 'list' | 'stack'>('grid')
  const items = ['A', 'B', 'C', 'D']

  useEffect(() => {
    if (!active) { setLayout('grid'); return }
    const seq: Array<'grid' | 'list' | 'stack'> = ['list', 'stack', 'grid']
    let i = 0
    const id = setInterval(() => {
      setLayout(seq[i % seq.length])
      i++
    }, 900)
    return () => clearInterval(id)
  }, [active])

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        layout
        className={cn(
          'flex gap-1.5',
          layout === 'grid'  && 'flex-wrap w-14',
          layout === 'list'  && 'flex-col',
          layout === 'stack' && 'flex-row',
        )}
      >
        {items.map((item, i) => (
          <motion.div
            key={item}
            layout
            animate={{
              width:  layout === 'list'  ? 48 : layout === 'stack' ? 16 : 20,
              height: layout === 'stack' ? 28 : 20,
              backgroundColor: layout === 'grid' ? 'rgba(199,255,63,0.6)'
                             : layout === 'list' ? 'rgba(122,231,255,0.6)'
                             : 'rgba(214,199,178,0.6)',
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-sm flex items-center justify-center"
            style={{ fontSize: '0.5rem', color: '#0A0A0A', fontWeight: 700 }}
          >
            {layout === 'list' ? item : ''}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ── Experiment registry ───────────────────────────────────────────────────────

const EXPERIMENTS = [
  { id: 'magnetic', label: 'MAGNETIC BUTTONS', description: 'Physics-based tension and resistance', tag: 'INTERACTION', color: '#C7FF3F' },
  { id: 'typography', label: 'KINETIC TYPE',   description: 'Mouse-proximity character distortion', tag: 'TYPOGRAPHY',  color: '#7AE7FF' },
  { id: 'grid',      label: 'SIGNAL GRID',     description: 'Cursor-reactive node network',        tag: 'CANVAS',      color: '#D6C7B2' },
  { id: 'reveal',    label: 'CLIP REVEALS',    description: 'Scroll-driven cinematic wipes',       tag: 'SCROLL',      color: '#C7FF3F' },
  { id: 'depth',     label: 'DEPTH LAYERS',    description: 'Mouse-parallax spatial depth',        tag: 'PARALLAX',    color: '#7AE7FF' },
  { id: 'morph',     label: 'LAYOUT MORPH',    description: 'Fluid layout state transitions',      tag: 'GSAP FLIP',   color: '#D6C7B2' },
]

// ── Card wrapper ─────────────────────────────────────────────────────────────

function ExperimentCard({ experiment }: { experiment: typeof EXPERIMENTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const x  = useMotionValue(0)
  const y  = useMotionValue(0)
  const sx = useSpring(x, { damping: 15, stiffness: 200 })
  const sy = useSpring(y, { damping: 15, stiffness: 200 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width  / 2)) * 0.1)
    y.set((e.clientY - (rect.top  + rect.height / 2)) * 0.1)
  }

  const handleMouseLeave = () => {
    x.set(0); y.set(0); setHovered(false)
  }

  const renderPreview = () => {
    switch (experiment.id) {
      case 'magnetic':   return <MagneticPreview />
      case 'typography': return <KineticTypePreview />
      case 'grid':       return <SignalGridPreview />
      case 'reveal':     return <ClipRevealPreview active={hovered} />
      case 'depth':      return <DepthLayersPreview />
      case 'morph':      return <LayoutMorphPreview active={hovered} />
      default:           return null
    }
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'panel p-5 cursor-pointer group transition-colors duration-300',
        hovered ? 'border-[--border-hover]' : ''
      )}
      data-cursor="interaction"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-system px-2 py-1 border"
          style={{ color: experiment.color, borderColor: experiment.color + '40' }}
        >
          {experiment.tag}
        </span>
        <motion.span
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[--text-muted] text-lg leading-none"
        >
          +
        </motion.span>
      </div>

      {/* Live preview area */}
      <div className="h-28 mb-4 border border-[--border] relative overflow-hidden"
        style={{ background: hovered ? 'rgba(255,255,255,0.02)' : 'transparent' }}
      >
        {renderPreview()}
      </div>

      {/* Label */}
      <p className="text-label text-[--text-secondary] group-hover:text-[--text-primary] transition-colors duration-300 mb-1">
        {experiment.label}
      </p>
      <p className="text-system text-[--text-muted]">{experiment.description}</p>
    </motion.div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────

export function MotionLabSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-15%' })
  useSectionReveal(sectionRef)

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      data-section="lab"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[--bg-secondary]/40 to-transparent" />
      <div className="container-system relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number"><span className="accent-line" />05 / MOTION LABORATORY</div>
          <h2 className="text-display font-display font-bold text-[--text-primary] mb-4">
            Motion Lab
          </h2>
          <p className="text-body max-w-xl">
            Six motion systems — each card is a live demo. Hover to activate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPERIMENTS.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <ExperimentCard experiment={exp} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-system text-[--text-muted]">
            HOVER EACH CARD — EVERY PREVIEW IS LIVE, NOT DECORATIVE
          </p>
        </motion.div>
      </div>
    </section>
  )
}
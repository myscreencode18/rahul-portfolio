'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { cn } from '@/utils/cn'

// ── Individual experiment components ────────────────────────────────────────

function ShaderExperiment() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
 const animRef = useRef<number | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    let t = 0
    let mx = canvas.width / 2, my = canvas.height / 2

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
    }
    canvas.addEventListener('mousemove', onMove)

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      t += 0.018

      // Plasma-style noise field
      for (let x = 0; x < w; x += 6) {
        for (let y = 0; y < h; y += 6) {
          const dx  = (x - mx) / w
          const dy  = (y - my) / h
          const val = Math.sin(x * 0.04 + t) * Math.cos(y * 0.04 - t * 0.7)
                    + Math.sin(Math.sqrt(dx * dx + dy * dy) * 18 - t * 2) * 0.5
          const norm  = (val + 1.5) / 3
          const alpha = norm * 0.4
          ctx.fillStyle = `rgba(199,255,63,${alpha})`
          ctx.fillRect(x, y, 5, 5)
        }
      }
      animRef.current = requestAnimationFrame(draw)
    }

    if (active) draw()
    else if (animRef.current) cancelAnimationFrame(animRef.current)

    return () => {
      canvas.removeEventListener('mousemove', onMove)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [active])

  return (
    <div className="relative h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      />
      {!active && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-system text-[--text-muted]">HOVER TO ACTIVATE</span>
        </div>
      )}
    </div>
  )
}

function TypeDistortExperiment() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 })
  const text = 'DISTORT'

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
  }

  return (
    <div
      className="h-full flex items-center justify-center overflow-hidden cursor-crosshair"
      onMouseMove={handleMove}
    >
      <div className="flex">
        {text.split('').map((char, i) => {
          const dist  = Math.abs(i / text.length - pos.x)
          const skewX = (pos.x - 0.5) * 30 * (1 - dist)
          const skewY = (pos.y - 0.5) * 20 * (1 - dist)
          const scale = 1 + (1 - dist) * 0.4
          return (
            <motion.span
              key={i}
              animate={{ skewX, skewY, scaleY: scale }}
              transition={{ type: 'spring', damping: 8, stiffness: 120 }}
              className="font-display font-bold text-4xl inline-block origin-bottom"
              style={{ color: `rgba(199,255,63,${0.3 + (1 - dist) * 0.7})`, letterSpacing: '-0.02em' }}
            >
              {char}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}

function ParticleFieldExperiment() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number | null>(null)
  const mouse     = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const PARTICLE_COUNT = 60
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r:  1 + Math.random() * 2,
    }))

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', () => { mouse.current = { x: -999, y: -999 } })

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.fillStyle = 'rgba(10,10,10,0.2)'
      ctx.fillRect(0, 0, w, h)

      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80) {
          p.vx += (dx / dist) * 0.4
          p.vy += (dy / dist) * 0.4
        }
        // Damping
        p.vx *= 0.98; p.vy *= 0.98
        p.x += p.vx;  p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0

        // Draw
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(199,255,63,0.7)`
        ctx.fill()
      })

      // Connect nearby
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.hypot(b.x - a.x, b.y - a.y)
          if (d < 80) {
            ctx.strokeStyle = `rgba(199,255,63,${(1 - d / 80) * 0.2})`
            ctx.lineWidth = 0.5
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        })
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      canvas.removeEventListener('mousemove', onMove)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full cursor-none" />
}

function GenerativeGridExperiment() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    let t = 0

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      t += 0.006

      const COLS = 8, ROWS = 6
      const cw = w / COLS, ch = h / ROWS

      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const cx = c * cw + cw / 2
          const cy = r * ch + ch / 2
          const wave = Math.sin(c * 0.9 + t) * Math.cos(r * 0.9 - t * 0.8)
          const size = (cw * 0.28) * (0.5 + wave * 0.5)
          const alpha = 0.15 + (wave + 1) * 0.15
          const rot = t + (c + r) * 0.4

          ctx.save()
          ctx.translate(cx, cy)
          ctx.rotate(rot)
          ctx.strokeStyle = `rgba(199,255,63,${alpha})`
          ctx.lineWidth = 0.8
          ctx.strokeRect(-size / 2, -size / 2, size, size)
          ctx.restore()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

function AsciiExperiment() {
  const [frame, setFrame] = useState(0)
  const chars = ['█', '▓', '▒', '░', '·', '░', '▒', '▓']
  const COLS = 18, ROWS = 6

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => f + 1), 120)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-full flex items-center justify-center font-mono text-[10px] leading-[1.4] select-none">
      <div>
        {Array.from({ length: ROWS }, (_, r) => (
          <div key={r} className="flex">
            {Array.from({ length: COLS }, (_, c) => {
              const t    = frame * 0.15
              const wave = Math.sin(c * 0.5 + t) * Math.cos(r * 0.8 - t * 0.7)
              const idx  = Math.abs(Math.floor((wave + 1) * 3.5)) % chars.length
              const alpha = 0.2 + (wave + 1) * 0.4
              return (
                <span key={c} style={{ color: `rgba(199,255,63,${alpha})` }}>
                  {chars[idx]}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function WaveformExperiment() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number | null>(null)
  const mouse     = useRef({ x: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    let t = 0

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current.x = (e.clientX - r.left) / r.width
    }
    canvas.addEventListener('mousemove', onMove)

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      t += 0.04

      const freq = 1 + mouse.current.x * 4

      for (let layer = 0; layer < 4; layer++) {
        const alpha = 0.12 + layer * 0.1
        const amp   = h * (0.08 + layer * 0.04)
        ctx.beginPath()
        ctx.strokeStyle = `rgba(199,255,63,${alpha})`
        ctx.lineWidth = 1

        for (let x = 0; x <= w; x += 2) {
          const y = h / 2
            + Math.sin((x / w) * Math.PI * 2 * freq + t + layer * 0.5) * amp
            + Math.sin((x / w) * Math.PI * 4 * freq - t * 0.7 + layer) * amp * 0.4
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      canvas.removeEventListener('mousemove', onMove)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div className="relative h-full">
      <canvas ref={canvasRef} className="w-full h-full cursor-ew-resize" />
      <div className="absolute bottom-2 right-3 text-system text-[--text-muted]">MOVE MOUSE → FREQ</div>
    </div>
  )
}

// ── Experiment registry ──────────────────────────────────────────────────────

const EXPERIMENTS = [
  { id: 'shader',    label: 'PLASMA FIELD',    tag: 'SHADER',      desc: 'Cursor-reactive noise field', component: ShaderExperiment },
  { id: 'typo',      label: 'TYPE DISTORT',    tag: 'TYPOGRAPHY',  desc: 'Mouse-warped character mesh',  component: TypeDistortExperiment },
  { id: 'particles', label: 'PARTICLE FIELD',  tag: 'CANVAS',      desc: 'Repulsion + connection network', component: ParticleFieldExperiment },
  { id: 'grid',      label: 'GENERATIVE GRID', tag: 'GENERATIVE',  desc: 'Wave-driven rotating geometry', component: GenerativeGridExperiment },
  { id: 'ascii',     label: 'ASCII WAVE',       tag: 'ASCII',       desc: 'Character-based noise animation', component: AsciiExperiment },
  { id: 'waveform',  label: 'WAVEFORM',         tag: 'AUDIO-LIKE',  desc: 'Frequency-controlled sine layers', component: WaveformExperiment },
]

// ── Main section ─────────────────────────────────────────────────────────────

export function PlaygroundSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-10%' })
  const [expanded, setExpanded] = useState<string | null>(null)
  useSectionReveal(sectionRef)

  return (
    <section
      id="playground"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      data-section="playground"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[--bg-secondary]/30 to-transparent" />

      <div className="container-system relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number"><span className="accent-line" />— / EXPERIMENTAL PLAYGROUND</div>
          <h2 className="text-display font-display font-bold text-[--text-primary] mb-4">
            The Lab
          </h2>
          <p className="text-body max-w-xl">
            Raw experiments. Not polished features — raw exploration of what the browser can do. Shaders, generative systems, kinetic type.
          </p>
        </motion.div>

        {/* Experiment grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPERIMENTS.map((exp, i) => {
            const Comp      = exp.component
            const isExpanded = expanded === exp.id

            return (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className={cn(
                  'panel overflow-hidden cursor-pointer group',
                  'transition-all duration-300',
                  isExpanded ? 'border-[--border-accent]' : 'hover:border-[--border-hover]'
                )}
                onClick={() => setExpanded(isExpanded ? null : exp.id)}
              >
                {/* Canvas area */}
                <div
                  className="relative overflow-hidden transition-all duration-500"
                  style={{ height: isExpanded ? 260 : 160 }}
                >
                  <Comp />

                  {/* Expand hint */}
                  {!isExpanded && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[--bg-primary]/60 to-transparent flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-system text-[--accent-lime]">EXPAND ↗</span>
                    </div>
                  )}
                </div>

                {/* Label row */}
                <div className="p-4 border-t border-[--border] flex items-center justify-between">
                  <div>
                    <span className="text-label text-[--text-secondary] block mb-0.5">{exp.label}</span>
                    <span className="text-system text-[--text-muted]">{exp.desc}</span>
                  </div>
                  <span
                    className="text-system px-2 py-1 border flex-shrink-0"
                    style={{ borderColor: 'rgba(199,255,63,0.3)', color: '#C7FF3F' }}
                  >
                    {exp.tag}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-system text-[--text-muted] text-center mt-10"
        >
          ALL EXPERIMENTS BUILT WITH VANILLA CANVAS API + REACT — NO LIBRARIES
        </motion.p>
      </div>
    </section>
  )
}

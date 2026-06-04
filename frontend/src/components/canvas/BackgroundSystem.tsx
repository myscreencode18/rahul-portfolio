'use client'

import { useEffect, useRef, memo } from 'react'
import { useMotionStore } from '@/store'

export const BackgroundSystem = memo(function BackgroundSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>()
  const config    = useMotionStore((s) => s.config)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || config.reducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width  = 0
    let height = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let time   = 0

    const resize = () => {
      width  = canvas.width  = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Grid nodes for signal lines
    const COLS = 10
    const ROWS = 7
    interface GridNode {
      x: number; y: number
      active: boolean; pulse: number; pulseSpeed: number
    }
    const nodes: GridNode[] = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        nodes.push({
          x: (c / (COLS - 1)) * width,
          y: (r / (ROWS - 1)) * height,
          active: Math.random() > 0.7,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.005 + Math.random() * 0.01,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.005

      // Dynamic cursor light
      const grd = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400)
      grd.addColorStop(0, 'rgba(199,255,63,0.025)')
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, width, height)

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.025)'
      ctx.lineWidth = 0.5
      const GRID = 60
      for (let x = 0; x < width; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
      }
      for (let y = 0; y < height; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
      }

      // Signal paths between nodes
      if (config.gpuTier !== 'low') {
        nodes.forEach((n) => { n.pulse += n.pulseSpeed })
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j]
            const dist = Math.hypot(b.x - a.x, b.y - a.y)
            if (dist > width * 0.22) continue
            const alpha = (1 - dist / (width * 0.22)) * 0.06
            ctx.strokeStyle = `rgba(199,255,63,${alpha})`
            ctx.lineWidth = 0.4
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()

            // Moving signal dot
            if (a.active && Math.random() > 0.998) {
              const t  = ((time * 0.3) % 1)
              const sx = a.x + (b.x - a.x) * t
              const sy = a.y + (b.y - a.y) * t
              ctx.fillStyle = 'rgba(199,255,63,0.6)'
              ctx.beginPath()
              ctx.arc(sx, sy, 1.5, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        }

        // Node dots
        nodes.forEach((n) => {
          const brightness = 0.5 + 0.5 * Math.sin(n.pulse)
          ctx.fillStyle = `rgba(199,255,63,${brightness * 0.12})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, 2, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [config])

  if (config.reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="webgl-canvas"
      aria-hidden="true"
    />
  )
})

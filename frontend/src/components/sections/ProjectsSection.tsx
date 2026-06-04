'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { PROJECTS } from '@/data/projects'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { cn } from '@/utils/cn'
import type { Project } from '@/types'

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-10%' })
  const [active, setActive] = useState<Project>(PROJECTS[0])
  useSectionReveal(sectionRef)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen section-padding overflow-hidden"
      data-section="projects"
    >
      <div className="container-system relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number"><span className="accent-line" />03 / SELECTED SYSTEMS</div>
          <h2 className="text-display font-display font-bold text-[--text-primary] mb-4">
            Case Studies
          </h2>
          <p className="text-body max-w-xl">
            Not portfolio pieces — engineered systems with architecture decisions, tradeoffs, and outcomes.
          </p>
        </motion.div>

        {/* Project selector tabs */}
        <div className="flex gap-0 mb-12 border border-[--border] w-fit">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className={cn(
                'px-6 py-3 text-system transition-all duration-300',
                'border-r border-[--border] last:border-r-0',
                active.id === p.id
                  ? 'bg-[rgba(199,255,63,0.06)] text-[--accent-lime]'
                  : 'text-[--text-muted] hover:text-[--text-secondary]'
              )}
            >
              {p.id} — {p.title.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Active project display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left — project narrative */}
              <div>
                {/* Problem statement */}
                <div className="mb-8">
                  <span className="text-system text-[--text-muted] block mb-3">THE PROBLEM</span>
                  <h3
                    className="font-display font-bold leading-tight mb-4"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
                  >
                    <span className="text-[--text-secondary]">{active.problem.split('.')[0]}.</span>
                  </h3>
                  <p className="text-body">{active.tagline}</p>
                </div>

                {/* Meta row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: 'YEAR',   value: String(active.year) },
                    { label: 'ROLE',   value: active.role.split('+')[0].trim() },
                    { label: 'STATUS', value: active.status.toUpperCase() },
                  ].map(({ label, value }) => (
                    <div key={label} className="panel p-4">
                      <span className="text-system text-[--text-muted] block mb-1">{label}</span>
                      <span className="text-body text-[--text-primary]">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics */}
                <div className="mb-8">
                  <span className="text-system text-[--text-muted] block mb-3">OUTCOMES</span>
                  <div className="space-y-2">
                    {active.metrics.map((m) => (
                      <div key={m.label} className="flex items-center justify-between py-3 border-b border-[--border]">
                        <span className="text-body text-[--text-secondary]">{m.label}</span>
                        <div className="text-right">
                          <span className="font-display font-bold text-xl"
                            style={{ color: active.accentColor }}>
                            {m.value}
                          </span>
                          {m.note && <span className="text-system text-[--text-muted] block">{m.note}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack */}
                <div className="mb-8">
                  <span className="text-system text-[--text-muted] block mb-3">STACK</span>
                  <div className="flex flex-wrap gap-2">
                    {active.stack.map((s) => (
                      <span key={s} className="text-system px-3 py-1.5 border border-[--border] text-[--text-secondary]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {/* <div className="flex gap-4">
                  {active.links.demo && (
                    <a
                      href={active.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-label text-[--text-secondary] hover:text-[--accent-lime] transition-colors duration-300 group"
                    >
                      <span className="w-8 h-px bg-[--border] group-hover:w-12 group-hover:bg-[--accent-lime] transition-all duration-300" />
                      LIVE DEMO
                    </a>
                  )}
                  {active.links.github && (
                    <a
                      href={active.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-label text-[--text-secondary] hover:text-[--accent-cyan] transition-colors duration-300 group"
                    >
                      <span className="w-8 h-px bg-[--border] group-hover:w-12 group-hover:bg-[--accent-cyan] transition-all duration-300" />
                      GITHUB
                    </a>
                  )}
                </div> */}

                <div className="flex gap-4 flex-wrap">
  {/* Case study deep dive */}
  <Link
    href={`/routes/projects/${active.slug}`}
    className="flex items-center gap-3 text-label text-[--accent-lime] hover:text-white transition-colors duration-300 group"
  >
    <span className="w-8 h-px bg-[--accent-lime] group-hover:w-12 transition-all duration-300" />
    FULL CASE STUDY
  </Link>

  {active.links.demo && (
    <a href={active.links.demo} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-3 text-label text-[--text-secondary] hover:text-[--accent-lime] transition-colors duration-300 group">
      <span className="w-8 h-px bg-[--border] group-hover:w-12 group-hover:bg-[--accent-lime] transition-all duration-300" />
      LIVE DEMO
    </a>
  )}
  {active.links.github && (
    <a href={active.links.github} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-3 text-label text-[--text-secondary] hover:text-[--accent-cyan] transition-colors duration-300 group">
      <span className="w-8 h-px bg-[--border] group-hover:w-12 group-hover:bg-[--accent-cyan] transition-all duration-300" />
      GITHUB
    </a>
  )}
</div>
              </div>

              {/* Right — architecture + decisions */}
              <div>
                {/* Architecture diagram */}
                <div className="panel p-6 mb-6">
                  <span className="text-system text-[--text-muted] block mb-4">SYSTEM ARCHITECTURE</span>
                  <div className="space-y-3">
                    {active.architecture.map((node) => (
                      <div
                        key={node.id}
                        className="flex items-start gap-4 p-3 border border-[--border] hover:border-[--border-hover] transition-colors duration-200 group"
                      >
                        <span
                          className="text-system mt-0.5 px-2 py-0.5 border whitespace-nowrap transition-colors duration-200"
                          style={{
                            borderColor: active.accentColor + '40',
                            color: active.accentColor,
                          }}
                        >
                          {node.layer.toUpperCase()}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-body text-[--text-primary] font-medium block">{node.label}</span>
                          <span className="text-system text-[--text-muted]">{node.description}</span>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {node.tech.map((t) => (
                              <span key={t} className="text-system text-[--text-muted] px-2 py-0.5 border border-[--border]">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engineering decisions */}
                <div className="panel p-6">
                  <span className="text-system text-[--text-muted] block mb-4">ENGINEERING DECISIONS</span>
                  <div className="space-y-4">
                    {active.decisions.map((d, i) => (
                      <div key={i} className="border-l-2 pl-4 transition-colors duration-200 hover:border-l-[--accent-lime]"
                        style={{ borderColor: active.accentColor + '60' }}>
                        <p className="text-body text-[--text-primary] font-medium mb-1">{d.title}</p>
                        <p className="text-body mb-2">{d.decision}</p>
                        <p className="text-system text-[--text-muted]">TRADEOFF: {d.tradeoffs}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

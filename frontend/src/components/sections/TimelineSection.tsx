'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { cn } from '@/utils/cn'
import type { TimelineEntry } from '@/types'

const TIMELINE: TimelineEntry[] = [
  {
    id: 't1', year: 2023, phase: 'FOUNDATION',
    title: 'First Systems Thinking',
    description: 'Started with HTML/CSS/JS. Quickly realized I wasn\'t interested in making pages — I wanted to build systems.',
    breakthrough: 'Discovered React. Component thinking changed everything.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    type: 'learning',
  },
  {
    id: 't2', year: 2024, phase: 'DEPTH',
    title: 'Full-Stack Architecture',
    description: 'Went deep on Node.js, databases, and API design. Started thinking about data flow as a design constraint.',
    breakthrough: 'Built first full-stack projects with authentication, database integration, and deployment.',
    tech: ['Node.js', 'PostgreSQL', 'Next.js', 'TypeScript'],
    type: 'milestone',
  },
  {
    id: 't3', year: 2025, phase: 'SHIFT',
    title: 'Motion as Engineering',
    description: 'Discovered GSAP and Three.js. Realized motion design wasn\'t decoration — it was communication infrastructure.',
    breakthrough: 'First cinematic web experience. Understood that animation and architecture are the same discipline.',
    tech: ['GSAP', 'Three.js', 'Framer Motion', 'WebGL'],
    type: 'shift',
  },
  {
  id: 't3b', year: 2023, phase: 'EXPANSION',
  title: 'DevOps & Infrastructure',
  description: 'Completed a structured DevOps curriculum covering the full deployment and infrastructure stack. Shifted from "just deploying" to understanding the entire system lifecycle.',
  breakthrough: 'Understood that writing code is only half the job. Infrastructure, automation, and observability are what make systems production-grade.',
  tech: ['Docker', 'Kubernetes', 'Jenkins', 'Ansible', 'Linux', 'Maven', 'Chef', 'GitHub Actions'],
  type: 'learning' as const,
},
  {
    id: 't4', year: 2026, phase: 'SYNTHESIS',
    title: 'AI-Integrated Systems',
    description: 'Built complex full-stack applications involving real-time communication, background jobs, and scalable backend architecture.',
    breakthrough:
      'Developed QueueLess (real-time queue system) and AutoPilot (workflow automation platform).',
    tech: [
      'Socket.IO',
      'Redis',
      'MongoDB',
      'BullMQ',
      'Role-Based Auth',
      'Analytics Dashboards',
    ],
    type: 'milestone',
  },
  {
    id: 't5', year: 2026, phase: 'NOW',
    title: 'Experience Engineering',
    description: 'Full synthesis: architecture + motion + AI + product thinking. Building systems that feel like none that came before.',
    breakthrough: 'This portfolio. The operating system I always wanted to build.',
    tech: ['Everything above', '+', 'Shaders', 'Edge Computing'],
    type: 'project',
  },
]

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-15%' })
  useSectionReveal(sectionRef)

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      data-section="timeline"
    >
      <div className="container-system relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number"><span className="accent-line" />07 / EXPERIENCE TIMELINE</div>
          <h2 className="text-display font-display font-bold text-[--text-primary] mb-4">
            Evolution
          </h2>
          <p className="text-body max-w-xl">
            Not a résumé — a systems thinking evolution log.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] md:left-[calc(50%-1px)] top-0 bottom-0 w-px bg-[--border]" />

          <div className="space-y-0">
            {TIMELINE.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className={cn(
                  'relative grid grid-cols-[24px_1fr] md:grid-cols-2 gap-6 md:gap-16 pb-12',
                  i % 2 === 0 ? 'md:pr-[calc(50%+32px)]' : 'md:pl-[calc(50%+32px)] md:col-start-2'
                )}
              >
                {/* Timeline dot */}
                <div className={cn(
                  'absolute left-0 md:left-1/2 top-1 w-[22px] h-[22px]',
                  'md:-translate-x-1/2',
                  'border border-[--border] bg-[--bg-primary]',
                  'flex items-center justify-center',
                  entry.type === 'milestone' && 'border-[--accent-lime]/60'
                )}>
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    entry.type === 'milestone' ? 'bg-[--accent-lime]' :
                    entry.type === 'shift'     ? 'bg-[--accent-cyan]' :
                    'bg-[--text-muted]'
                  )} />
                </div>

                {/* Content (offset correctly per side) */}
                <div className={cn(
                  'col-start-2 md:col-start-auto',
                  i % 2 !== 0 && 'md:col-start-2'
                )}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-display font-bold text-2xl text-[--text-primary]">
                      {entry.year}
                    </span>
                    <span className="text-system text-[--text-muted]">{entry.phase}</span>
                  </div>

                  <h3 className="text-section font-display font-bold text-[--text-secondary] mb-3" style={{ fontSize: '1.25rem' }}>
                    {entry.title}
                  </h3>

                  <p className="text-body mb-4">{entry.description}</p>

                  <div className="border-l-2 border-[--accent-lime]/30 pl-4 mb-4">
                    <p className="text-system text-[--text-muted] mb-1">BREAKTHROUGH</p>
                    <p className="text-body text-[--text-secondary]">{entry.breakthrough}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {entry.tech.map((t) => (
                      <span key={t} className="text-system text-[--text-muted] px-2 py-0.5 border border-[--border]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

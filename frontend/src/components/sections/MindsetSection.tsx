'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSectionReveal } from '@/hooks/useSectionReveal'

const PRINCIPLES = [
  {
    number: '01',
    title: 'Motion communicates state.',
    body: 'Animation is not decoration — it\'s information architecture. Every transition tells the user what happened and what to expect next.',
    visual: '◈',
  },
  {
    number: '02',
    title: 'Interfaces should feel alive, not decorated.',
    body: 'Reactivity is a quality, not a feature. When a system responds to intent before you\'ve finished thinking it, you\'ve crossed into something else entirely.',
    visual: '◉',
  },
  {
    number: '03',
    title: 'Performance is part of design.',
    body: '60fps isn\'t a nice-to-have — it\'s the baseline of respect. Every millisecond of jank is a betrayal of the experience you promised.',
    visual: '◫',
  },
  {
    number: '04',
    title: 'Architecture decisions are design decisions.',
    body: 'How data flows through a system determines how fast the UI can feel. Backend performance is frontend UX — there\'s no separation.',
    visual: '◱',
  },
  {
    number: '05',
    title: 'Complexity should be absorbed, not exposed.',
    body: 'The hardest engineering makes the user feel like nothing happened. The best systems are invisible — you only notice them when they\'re gone.',
    visual: '◲',
  },
]

export function MindsetSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-15%' })
  useSectionReveal(sectionRef)

  return (
    <section
      id="mindset"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      data-section="mindset"
    >
      <div className="container-system relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number"><span className="accent-line" />04 / ENGINEERING MINDSET</div>
          <h2 className="text-display font-display font-bold text-[--text-primary] mb-4">
            How I Think
          </h2>
          <p className="text-body max-w-xl">
            Not a process — a set of convictions that shape every system I build.
          </p>
        </motion.div>

        {/* Principles — editorial layout */}
        <div className="space-y-0">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-[auto_1fr] md:grid-cols-[60px_1fr_1fr] gap-6 md:gap-12 py-8 border-b border-[--border] hover:border-[--border-accent] transition-colors duration-500"
            >
              {/* Number */}
              <div className="pt-1">
                <span className="font-mono text-xs text-[--text-muted] group-hover:text-[--accent-lime] transition-colors duration-300">
                  {p.number}
                </span>
              </div>

              {/* Title */}
              <div>
                <span
                  className="block font-display font-bold text-[--text-secondary] group-hover:text-[--text-primary] transition-colors duration-300 leading-tight"
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}
                >
                  {p.title}
                </span>
              </div>

              {/* Body - hidden on mobile, shown on desktop */}
              <div className="hidden md:block">
                <p className="text-body max-w-md">{p.body}</p>
              </div>

              {/* Body - shown on mobile below title */}
              <div className="col-start-2 md:hidden">
                <p className="text-body">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

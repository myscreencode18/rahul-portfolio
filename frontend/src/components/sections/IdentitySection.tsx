'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSectionReveal } from '@/hooks/useSectionReveal'


const STATS = [
  { value: '15+',  label: 'Systems Built',        note: 'production' },
  { value: '2+',   label: 'Years Engineering',     note: 'full-stack' },
  { value: '12+',  label: 'Stacks Explored',       note: 'deep' },
  { value: '∞',    label: 'AI Workflows Tested',   note: 'ongoing' },
]

const SPECIALTIES = [
  'Full-Stack Architecture',
  'Motion Engineering',
  'AI Orchestration',
  'Performance Systems',
  'Mobile Development',
  'WebGL / Shaders',
  'DevOps & CI/CD',     
]

export function IdentitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-20% 0px' })
  useSectionReveal(sectionRef)

  return (
    <section
      id="identity"
      ref={sectionRef}
      className="relative min-h-screen section-padding overflow-hidden"
      data-section="identity"
    >
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 system-grid-dense opacity-50" />

      <div className="container-system relative z-10">
        {/* Section marker */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-number"
        >
          <span className="accent-line" />
          01 / IDENTITY LAYER
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — live profile data */}
          <div>
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="panel p-8 mb-8"
            >
              {/* Availability */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-[--border]">
                <div className="flex items-center gap-3">
                  <span className="status-dot" />
                  <span className="text-system text-[--accent-lime]">AVAILABLE FOR WORK</span>
                </div>
                <span className="text-system text-[--text-muted]">GMT+5:30</span>
              </div>

              {/* Identity block */}
              <div className="mb-6">
                <h2 className="text-section font-display font-bold text-[--text-primary] mb-1">
                  Rahul Gupta
                </h2>
                <p className="text-label text-[--text-secondary]">
                  Experience Engineer · Indore, India
                </p>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <p className="text-system text-[--text-muted] mb-3">ACTIVE SPECIALTIES</p>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map((s) => (
                    <span
                      key={s}
                      className="text-system px-3 py-1.5 border border-[--border] text-[--text-secondary] hover:border-[--border-accent] hover:text-[--accent-lime] transition-colors duration-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current focus */}
              <div className="border-t border-[--border] pt-4">
                <p className="text-system text-[--text-muted] mb-1">CURRENT FOCUS</p>
                <p className="text-body text-[--text-secondary]">
                  AI-integrated full-stack systems + cinematic web experiences
                </p>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                  className="panel p-5"
                >
                  <div className="text-3xl font-display font-bold text-[--text-primary] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-label text-[--text-secondary]">{stat.label}</div>
                  <div className="text-system text-[--text-muted] mt-1">{stat.note}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — philosophy narrative */}
          <div className="lg:pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Big statement */}
              <div className="mb-12">
                <p className="text-system text-[--text-muted] mb-6">SYSTEM PHILOSOPHY</p>
                <h3 className="font-display font-bold text-[--text-primary] leading-tight mb-4"
                    style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.025em' }}>
                  I engineer systems<br />
                  that merge{' '}
                  <span className="text-[--accent-lime]">motion</span>,<br />
                  <span className="text-[--accent-cyan]">intelligence</span>,<br />
                  and interaction.
                </h3>
              </div>

              {/* Philosophy blocks */}
              <div className="space-y-6">
                {[
                  {
                    label: 'APPROACH',
                    text: 'I don\'t separate design from engineering. Every performance decision is an aesthetic decision. Every animation is a communication.',
                  },
                  {
                    label: 'BELIEF',
                    text: 'The best interfaces feel inevitable. They don\'t show their complexity — they absorb it and hand you something that just works, beautifully.',
                  },
                  {
                    label: 'METHOD',
                    text: 'Architecture first. Motion second. Polish third. But all three from day one — not bolted on at the end.',
                  },
                  {
  label: 'INFRASTRUCTURE',
  text: 'Code that can\'t be deployed reliably isn\'t finished. I\'ve studied the full DevOps stack — Docker, Kubernetes, Jenkins, Ansible — to understand what happens after git push.',
},
                ].map(({ label, text }) => (
                  <div key={label} className="border-l-2 border-[--border] pl-5 hover:border-[--accent-lime] transition-colors duration-300 group">
                    <p className="text-system text-[--text-muted] mb-2 group-hover:text-[--accent-lime] transition-colors duration-300">
                      {label}
                    </p>
                    <p className="text-body">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section transition line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[--border-hover] to-transparent" />
    </section>
  )
}

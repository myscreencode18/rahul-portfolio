// 'use client'

// import { useRef } from 'react'
// import Link from 'next/link'
// import { motion, useInView } from 'framer-motion'
// import type { Project } from '@/types'
// import { cn } from '@/utils/cn'

// interface Props { project: Project }

// export function ProjectDeepDive({ project }: Props) {
//   const headerRef = useRef<HTMLDivElement>(null)

//   return (
//     <article className="relative min-h-screen">
//       {/* Back nav */}
//       <div className="fixed top-20 left-8 z-overlay">
//         <Link
//           href="/#projects"
//           className="flex items-center gap-3 text-system text-[--text-muted] hover:text-[--accent-lime] transition-colors duration-300 group"
//         >
//           <span className="w-8 h-px bg-[--border] group-hover:w-12 group-hover:bg-[--accent-lime] transition-all duration-300" />
//           BACK
//         </Link>
//       </div>

//       {/* Hero */}
//       <div
//         ref={headerRef}
//         className="relative min-h-[70vh] flex flex-col justify-end section-padding overflow-hidden"
//         style={{ borderBottom: `1px solid var(--border)` }}
//       >
//         <div className="absolute inset-0 system-grid opacity-20" />
//         <div className="container-system relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           >
//             <p className="text-system text-[--text-muted] mb-4">
//               {project.id} / {project.category.toUpperCase()} / {project.year}
//             </p>
//             <h1
//               className="font-display font-bold text-[--text-primary] mb-6"
//               style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.04em', lineHeight: 0.92 }}
//             >
//               {project.title}
//             </h1>
//             <p className="text-cinematic text-[--text-secondary] max-w-2xl"
//               style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}>
//               {project.problem}
//             </p>

//             <div className="flex flex-wrap gap-6 mt-10">
//               {project.links.demo && (
//                 <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
//                   className="flex items-center gap-3 text-label text-[--text-secondary] hover:text-[--accent-lime] transition-colors duration-300 group">
//                   <span className="w-8 h-px bg-[--border] group-hover:w-12 group-hover:bg-[--accent-lime] transition-all duration-300" />
//                   LIVE DEMO
//                 </a>
//               )}
//               {project.links.github && (
//                 <a href={project.links.github} target="_blank" rel="noopener noreferrer"
//                   className="flex items-center gap-3 text-label text-[--text-secondary] hover:text-[--accent-cyan] transition-colors duration-300 group">
//                   <span className="w-8 h-px bg-[--border] group-hover:w-12 group-hover:bg-[--accent-cyan] transition-all duration-300" />
//                   GITHUB
//                 </a>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Metrics bar */}
//       <div className="border-b border-[--border] bg-[--bg-secondary]">
//         <div className="container-system py-8">
//           <div className="grid grid-cols-3 gap-8">
//             {project.metrics.map((m) => (
//               <div key={m.label}>
//                 <span className="font-display font-bold text-3xl"
//                   style={{ color: project.accentColor }}>
//                   {m.value}
//                 </span>
//                 <p className="text-label text-[--text-secondary] mt-1">{m.label}</p>
//                 {m.note && <p className="text-system text-[--text-muted]">{m.note}</p>}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="container-system py-24">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
//           {/* Left — main content */}
//           <div className="lg:col-span-2 space-y-16">
//             {/* Architecture */}
//             <Section title="SYSTEM ARCHITECTURE" number="01">
//               <div className="space-y-3">
//                 {project.architecture.map((node) => (
//                   <ArchNode key={node.id} node={node} accent={project.accentColor} />
//                 ))}
//               </div>
//             </Section>

//             {/* Engineering Decisions */}
//             <Section title="ENGINEERING DECISIONS" number="02">
//               <div className="space-y-8">
//                 {project.decisions.map((d, i) => (
//                   <DecisionCard key={i} decision={d} accent={project.accentColor} />
//                 ))}
//               </div>
//             </Section>
//           </div>

//           {/* Right sidebar — meta */}
//           <div className="space-y-8">
//             <div className="panel p-6">
//               <p className="text-system text-[--text-muted] mb-4">PROJECT META</p>
//               <div className="space-y-3">
//                 {[
//                   { label: 'YEAR',     val: String(project.year) },
//                   { label: 'ROLE',     val: project.role },
//                   { label: 'CATEGORY', val: project.category },
//                   { label: 'STATUS',   val: project.status },
//                 ].map(({ label, val }) => (
//                   <div key={label} className="flex justify-between items-baseline py-2 border-b border-[--border]">
//                     <span className="text-system text-[--text-muted]">{label}</span>
//                     <span className="text-body text-[--text-primary]">{val}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="panel p-6">
//               <p className="text-system text-[--text-muted] mb-4">STACK</p>
//               <div className="flex flex-wrap gap-2">
//                 {project.stack.map((s) => (
//                   <span key={s} className="text-system px-3 py-1.5 border border-[--border] text-[--text-secondary]">
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </article>
//   )
// }

// function Section({ title, number, children }: { title: string; number: string; children: React.ReactNode }) {
//   const ref = useRef<HTMLDivElement>(null)
//   const isInView = useInView(ref, { once: true, margin: '-15%' })
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 24 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.7 }}
//     >
//       <div className="flex items-center gap-4 mb-6">
//         <span className="text-system text-[--text-muted]">{number}</span>
//         <span className="text-label text-[--text-secondary]">{title}</span>
//         <div className="flex-1 h-px bg-[--border]" />
//       </div>
//       {children}
//     </motion.div>
//   )
// }

// function ArchNode({ node, accent }: { node: any; accent: string }) {
//   return (
//     <div className="flex items-start gap-4 p-4 border border-[--border] hover:border-[--border-hover] transition-colors duration-200">
//       <span className="text-system px-2 py-0.5 border whitespace-nowrap flex-shrink-0"
//         style={{ borderColor: accent + '40', color: accent }}>
//         {node.layer.toUpperCase()}
//       </span>
//       <div>
//         <p className="text-body text-[--text-primary] font-medium mb-1">{node.label}</p>
//         <p className="text-body mb-2">{node.description}</p>
//         <div className="flex flex-wrap gap-1.5">
//           {node.tech.map((t: string) => (
//             <span key={t} className="text-system text-[--text-muted] px-2 py-0.5 border border-[--border]">{t}</span>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// function DecisionCard({ decision, accent }: { decision: any; accent: string }) {
//   return (
//     <div className="border-l-2 pl-6 space-y-3"
//       style={{ borderColor: accent + '50' }}>
//       <h4 className="text-section font-display font-bold text-[--text-primary]"
//         style={{ fontSize: '1.15rem' }}>
//         {decision.title}
//       </h4>
//       <div>
//         <p className="text-system text-[--text-muted] mb-1">CONTEXT</p>
//         <p className="text-body">{decision.context}</p>
//       </div>
//       <div>
//         <p className="text-system text-[--text-muted] mb-1">DECISION</p>
//         <p className="text-body text-[--text-primary]">{decision.decision}</p>
//       </div>
//       <div>
//         <p className="text-system text-[--text-muted] mb-1">TRADEOFFS</p>
//         <p className="text-body">{decision.tradeoffs}</p>
//       </div>
//     </div>
//   )
// }
'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import type { Project } from '@/types'

interface Props {
  project: Project
}

type ArchNodeType = {
  id: string
  label: string
  layer: string
  description: string
  tech: string[]
}

type DecisionType = {
  title: string
  context: string
  decision: string
  tradeoffs: string
}

export function ProjectDeepDive({ project }: Props) {
  const headerRef = useRef<HTMLDivElement>(null)

  return (
    <article className="relative min-h-screen bg-[--bg-primary] text-[--text-primary]">

      {/* BACK NAV (mobile friendly) */}
      <div className="fixed top-6 left-4 md:top-20 md:left-8 z-50">
        <Link
          href="/#projects"
          className="flex items-center gap-3 text-system text-[--text-muted] hover:text-[--accent-lime] transition-colors group"
        >
          <span className="w-6 md:w-8 h-px bg-[--border] group-hover:w-10 md:group-hover:w-12 group-hover:bg-[--accent-lime] transition-all" />
          <span className="text-xs md:text-sm tracking-wide">BACK</span>
        </Link>
      </div>

      {/* HERO */}
      <div
        ref={headerRef}
        className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end section-padding overflow-hidden"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="absolute inset-0 system-grid opacity-10 md:opacity-20" />

        <div className="container-system relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-system text-[--text-muted] mb-3 md:mb-4 text-xs md:text-sm">
              {project.id} / {project.category.toUpperCase()} / {project.year}
            </p>

            <h1
              className="font-display font-bold mb-4 md:mb-6 leading-[0.95]"
              style={{
                fontSize: 'clamp(2.2rem, 6vw, 6rem)',
                letterSpacing: '-0.04em',
              }}
            >
              {project.title}
            </h1>

            <p className="text-body text-[--text-secondary] max-w-2xl text-base md:text-xl">
              {project.problem}
            </p>

            {/* LINKS */}
            <div className="flex flex-wrap gap-6 mt-8 md:mt-10">
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  className="flex items-center gap-3 text-label text-[--text-secondary] hover:text-[--accent-lime] transition"
                >
                  <span className="w-6 md:w-8 h-px bg-[--border] group-hover:w-12 transition-all" />
                  LIVE DEMO
                </a>
              )}

              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  className="flex items-center gap-3 text-label text-[--text-secondary] hover:text-[--accent-cyan] transition"
                >
                  <span className="w-6 md:w-8 h-px bg-[--border] group-hover:w-12 transition-all" />
                  GITHUB
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* METRICS */}
      <div className="border-b border-[--border] bg-[--bg-secondary]">
        <div className="container-system py-8 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
            {(project.metrics ?? []).map((m) => (
              <div key={m.label}>
                <span
                  className="font-display font-bold text-2xl md:text-3xl"
                  style={{ color: project.accentColor }}
                >
                  {m.value}
                </span>
                <p className="text-label text-[--text-secondary] mt-1">
                  {m.label}
                </p>
                {m.note && (
                  <p className="text-system text-[--text-muted]">
                    {m.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="container-system py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-14 md:space-y-16">

            {/* ARCHITECTURE */}
            <Section title="SYSTEM ARCHITECTURE" number="01">
              <div className="space-y-3">
                {(project.architecture ?? []).map((node) => (
                  <ArchNode
                    key={node.id}
                    node={node}
                    accent={project.accentColor}
                  />
                ))}
              </div>
            </Section>

            {/* DECISIONS */}
            <Section title="ENGINEERING DECISIONS" number="02">
              <div className="space-y-8">
                {(project.decisions ?? []).map((d, i) => (
                  <DecisionCard
                    key={i}
                    decision={d}
                    accent={project.accentColor}
                  />
                ))}
              </div>
            </Section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6 md:space-y-8 lg:sticky lg:top-24 h-fit">

            {/* META */}
            <div className="panel p-5 md:p-6">
              <p className="text-system text-[--text-muted] mb-4">
                PROJECT META
              </p>

              <div className="space-y-3">
                {[
                  { label: 'YEAR', val: String(project.year) },
                  { label: 'ROLE', val: project.role },
                  { label: 'CATEGORY', val: project.category },
                  { label: 'STATUS', val: project.status },
                ].map(({ label, val }) => (
                  <div
                    key={label}
                    className="flex justify-between py-2 border-b border-[--border]"
                  >
                    <span className="text-system text-[--text-muted]">
                      {label}
                    </span>
                    <span className="text-body text-[--text-primary] text-right">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STACK */}
            <div className="panel p-5 md:p-6">
              <p className="text-system text-[--text-muted] mb-4">
                STACK
              </p>

              <div className="flex flex-wrap gap-2">
                {(project.stack ?? []).map((s) => (
                  <span
                    key={s}
                    className="text-system px-2 md:px-3 py-1 border border-[--border] text-[--text-secondary]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ---------------- SECTION ---------------- */

function Section({
  title,
  number,
  children,
}: {
  title: string
  number: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
        <span className="text-system text-[--text-muted] text-xs md:text-sm">
          {number}
        </span>
        <span className="text-label text-[--text-secondary] text-sm md:text-base">
          {title}
        </span>
        <div className="flex-1 h-px bg-[--border]" />
      </div>
      {children}
    </motion.div>
  )
}

/* ---------------- ARCH NODE ---------------- */

function ArchNode({
  node,
  accent,
}: {
  node: ArchNodeType
  accent: string
}) {
  return (
    <div className="flex gap-4 p-4 border border-[--border] hover:border-[--border-hover] transition">
      <span
        className="text-system px-2 py-1 border text-xs"
        style={{ borderColor: accent + '40', color: accent }}
      >
        {node.layer.toUpperCase()}
      </span>

      <div>
        <p className="text-body font-medium mb-1">{node.label}</p>
        <p className="text-body text-[--text-secondary] mb-2">
          {node.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {node.tech.map((t) => (
            <span
              key={t}
              className="text-system text-[--text-muted] px-2 py-0.5 border border-[--border]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------- DECISION ---------------- */

function DecisionCard({
  decision,
  accent,
}: {
  decision: DecisionType
  accent: string
}) {
  return (
    <div
      className="border-l-2 pl-5 md:pl-6 space-y-3"
      style={{ borderColor: accent + '50' }}
    >
      <h4 className="font-display font-bold text-lg md:text-xl">
        {decision.title}
      </h4>

      <div>
        <p className="text-system text-[--text-muted]">CONTEXT</p>
        <p className="text-body">{decision.context}</p>
      </div>

      <div>
        <p className="text-system text-[--text-muted]">DECISION</p>
        <p className="text-body">{decision.decision}</p>
      </div>

      <div>
        <p className="text-system text-[--text-muted]">TRADEOFFS</p>
        <p className="text-body">{decision.tradeoffs}</p>
      </div>
    </div>
  )
}
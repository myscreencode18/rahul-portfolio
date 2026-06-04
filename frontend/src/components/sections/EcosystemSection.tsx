'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import type { TechCluster, TechItem } from '@/types'
import { cn } from '@/utils/cn'

const CLUSTERS: TechCluster[] = [
  {
    id: 'frontend', label: 'FRONTEND SYSTEMS', icon: '◈', angle: 0, color: '#7AE7FF',
    items: [
      { name: 'Next.js', description: 'App Router, streaming, ISR', useCase: 'All production apps', pattern: 'Server-first, hydrate on demand', performance: 'Edge-optimized, 100 Lighthouse' },
      { name: 'React', description: 'Component orchestration', useCase: 'UI systems', pattern: 'Compound components, render optimization', performance: 'Memoized, concurrent safe' },
      { name: 'TypeScript', description: 'Type-safe architecture', useCase: 'Every project', pattern: 'Strict mode, branded types', performance: 'Zero runtime cost' },
      { name: 'Tailwind + SCSS', description: 'Utility + artistic control', useCase: 'All styling', pattern: 'Design tokens, SCSS for complex states', performance: 'PurgeCSS, zero unused bytes' },
    ],
  },
  {
    id: 'motion', label: 'MOTION STACK', icon: '◉', angle: 60, color: '#C7FF3F',
    items: [
      { name: 'GSAP', description: 'Cinematic timelines', useCase: 'All complex motion', pattern: 'Timeline orchestration, pin systems', performance: 'GPU transforms only, 60fps guaranteed' },
      { name: 'Framer Motion', description: 'Micro-interaction layer', useCase: 'Component animations', pattern: 'Gesture + layout animation', performance: 'Hardware accelerated' },
      { name: 'Three.js / R3F', description: '3D spatial systems', useCase: 'Atmosphere + data vis', pattern: 'Lazy-loaded, instanced geometry', performance: 'Offscreen canvas, LOD' },
      { name: 'Lenis', description: 'Premium scroll engine', useCase: 'All pages', pattern: 'Virtual scroll, raf sync', performance: 'Sub-16ms scroll events' },
    ],
  },
  {
    id: 'backend', label: 'BACKEND INFRA', icon: '◧', angle: 120, color: '#D6C7B2',
    items: [
      { name: 'Node.js', description: 'Edge-ready API layer', useCase: 'All APIs', pattern: 'Route handlers, middleware chains', performance: 'Hono: 3x faster than Express' },
      { name: 'PostgreSQL', description: 'Relational data store', useCase: 'Structured data', pattern: 'Normalized schema, index strategy', performance: 'Connection pooling, query optimization' },
      { name: 'Redis', description: 'In-memory cache', useCase: 'Session, rate limit, pub-sub', pattern: 'TTL caching, sorted sets', performance: '<1ms reads, pipeline batching' },
      { name: 'WebSockets', description: 'Real-time channel', useCase: 'Live features', pattern: 'Rooms, namespaces, ack pattern', performance: 'Binary frames, compression' },
    ],
  },
  {
    id: 'ai', label: 'AI SYSTEMS', icon: '◫', angle: 180, color: '#C7FF3F',
    items: [
      { name: 'OpenAI API', description: 'LLM backbone', useCase: 'AI features', pattern: 'Streaming responses, function calling', performance: 'Token budget optimization' },
      { name: 'LangChain', description: 'Workflow orchestration', useCase: 'Complex AI pipelines', pattern: 'Chain composition, memory', performance: 'Parallel chain execution' },
      { name: 'Vector DB', description: 'Semantic search', useCase: 'AI knowledge base', pattern: 'Embedding + retrieval', performance: 'ANN search, <50ms' },
      { name: 'Agents', description: 'Autonomous workflows', useCase: 'Task automation', pattern: 'Tool use, reflection loops', performance: 'Async parallel tool calls' },
    ],
  },

  {
  id: 'mobile', label: 'MOBILE SYSTEMS', icon: '◱', angle: 240, color: '#7AE7FF',
  items: [
    { name: 'React Native', description: 'Cross-platform native apps', useCase: 'iOS + Android from one codebase', pattern: 'Shared business logic, platform-specific UI layers', performance: 'JSI bridge, Hermes engine, <3s cold start' },
    { name: 'Expo', description: 'React Native toolchain', useCase: 'All React Native projects', pattern: 'EAS Build, EAS Submit, OTA updates via expo-updates', performance: 'Optimized bundle splits, selective preloading' },
    { name: 'Reanimated 3', description: 'Native thread animation', useCase: 'All mobile motion', pattern: 'Worklets run on UI thread, gesture handler integration', performance: '60fps even when JS thread is frozen' },
    { name: 'Flutter', description: 'Dart-powered native UI', useCase: 'High-fidelity custom UI projects', pattern: 'Widget tree composition, BLoC state management', performance: 'Skia-rendered, 120fps on supported devices' },
    { name: 'Dart', description: 'Flutter\'s language', useCase: 'Flutter projects', pattern: 'Null-safe, strongly typed, async/await streams', performance: 'AOT compiled to native ARM, near-native speed' },
    { name: 'React Navigation', description: 'RN routing system', useCase: 'All React Native apps', pattern: 'Stack, tab, drawer navigators with deep linking', performance: 'Native stack driver, gesture-based transitions' },
  ],
},
  {
  id: 'devops', label: 'DEVOPS & INFRA', icon: '◲', angle: 300, color: '#D6C7B2',
  items: [
    { 
      name: 'Docker', 
      description: 'Container runtime', 
      useCase: 'App containerization + local dev', 
      pattern: 'Multi-stage builds, compose for local stack', 
      performance: 'Isolated environments, reproducible builds' 
    },
    { 
      name: 'Kubernetes', 
      description: 'Container orchestration', 
      useCase: 'Studying cluster management + scaling', 
      pattern: 'Pods, services, deployments, ingress', 
      performance: 'Auto-scaling, self-healing workloads' 
    },
    { 
      name: 'Jenkins', 
      description: 'CI/CD automation server', 
      useCase: 'Pipeline design + automation', 
      pattern: 'Declarative pipelines, multi-stage builds', 
      performance: 'Parallel stage execution, artifact caching' 
    },
    { 
      name: 'GitHub Actions', 
      description: 'Cloud-native CI/CD', 
      useCase: 'All project pipelines', 
      pattern: 'Matrix builds, reusable workflows, secrets', 
      performance: 'Parallel jobs, dependency caching' 
    },
    { 
      name: 'Ansible', 
      description: 'Infrastructure automation', 
      useCase: 'Config management + server provisioning', 
      pattern: 'Playbooks, roles, inventory management', 
      performance: 'Agentless, idempotent execution' 
    },
    { 
      name: 'Linux', 
      description: 'Server OS fundamentals', 
      useCase: 'All server environments', 
      pattern: 'Bash scripting, process management, networking', 
      performance: 'Direct syscall access, minimal overhead' 
    },
    { 
      name: 'Maven', 
      description: 'Java build tool', 
      useCase: 'Java project build lifecycle', 
      pattern: 'POM configuration, dependency resolution', 
      performance: 'Incremental builds, local repository caching' 
    },
    { 
      name: 'Chef', 
      description: 'Config management', 
      useCase: 'Infrastructure as code study', 
      pattern: 'Cookbooks, recipes, node convergence', 
      performance: 'Declarative infra state management' 
    },
    { 
      name: 'Vercel + Cloudflare', 
      description: 'Edge deployment + CDN', 
      useCase: 'All frontend deployments', 
      pattern: 'Preview deploys, edge config, CDN rules', 
      performance: 'TTFB <100ms globally, automatic scaling' 
    },
  ],
},
]

export function EcosystemSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const isInView    = useInView(sectionRef, { once: true, margin: '-15%' })
  const [active, setActive] = useState<TechCluster | null>(null)
  const [activeItem, setActiveItem] = useState<TechItem | null>(null)
  useSectionReveal(sectionRef)

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      className="relative min-h-screen section-padding overflow-hidden"
      data-section="ecosystem"
    >
      <div className="absolute inset-0 system-grid opacity-20" />

      <div className="container-system relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number"><span className="accent-line" />02 / TECH ECOSYSTEM</div>
          <h2 className="text-display font-display font-bold text-[--text-primary] mb-4">
            Living Stack
          </h2>
          <p className="text-body max-w-xl">
            Not a list of tools — an ecosystem of interconnected systems. Each technology chosen for a precise reason.
          </p>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-16 items-start">

          {/* Cluster grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
            {CLUSTERS.map((cluster, i) => (
              <motion.button
                key={cluster.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                onClick={() => setActive(active?.id === cluster.id ? null : cluster)}
                className={cn(
                  'group text-left p-6 border transition-all duration-300',
                  active?.id === cluster.id
                    ? 'border-[--border-accent] bg-[rgba(199,255,63,0.04)]'
                    : 'border-[--border] hover:border-[--border-hover] bg-transparent'
                )}
              >
                <span
                  className="block text-2xl mb-4 transition-colors duration-300"
                  style={{ color: active?.id === cluster.id ? cluster.color : 'var(--text-muted)' }}
                >
                  {cluster.icon}
                </span>
                <span className="text-system block mb-2 transition-colors duration-300"
                  style={{ color: active?.id === cluster.id ? cluster.color : 'var(--text-muted)' }}>
                  {cluster.label}
                </span>
                <span className="text-system text-[--text-muted]">
                  {cluster.items.length} technologies
                </span>

                {/* Expand indicator */}
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-4 h-px bg-[--border-accent]" />
                  <span className="text-system" style={{ color: cluster.color }}>
                    EXPLORE
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full xl:w-96 flex-shrink-0"
              >
                <div className="panel p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[--border]">
                    <span className="text-2xl" style={{ color: active.color }}>{active.icon}</span>
                    <span className="text-label" style={{ color: active.color }}>{active.label}</span>
                  </div>

                  <div className="space-y-3">
                    {active.items.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveItem(activeItem?.name === item.name ? null : item)}
                        className={cn(
                          'w-full text-left p-4 border transition-all duration-200',
                          activeItem?.name === item.name
                            ? 'border-[--border-accent]'
                            : 'border-[--border] hover:border-[--border-hover]'
                        )}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-body text-[--text-primary] font-medium">{item.name}</span>
                          <span className="text-system text-[--text-muted]">
                            {activeItem?.name === item.name ? '−' : '+'}
                          </span>
                        </div>
                        <p className="text-system text-[--text-muted]">{item.description}</p>

                        <AnimatePresence>
                          {activeItem?.name === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-[--border] space-y-2">
                                <div>
                                  <span className="text-system text-[--text-muted]">USE CASE</span>
                                  <p className="text-body text-[--text-secondary] mt-0.5">{item.useCase}</p>
                                </div>
                                <div>
                                  <span className="text-system text-[--text-muted]">PATTERN</span>
                                  <p className="text-body text-[--text-secondary] mt-0.5">{item.pattern}</p>
                                </div>
                                <div>
                                  <span className="text-system text-[--text-muted]">PERFORMANCE</span>
                                  <p className="text-body" style={{ color: active.color }}>{item.performance}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

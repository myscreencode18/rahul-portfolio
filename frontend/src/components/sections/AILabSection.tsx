'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { cn } from '@/utils/cn'

const WORKFLOW_STEPS = [
  { id: 'input',    label: 'USER INTENT',       desc: 'Natural language query received',         color: '#7AE7FF' },
  { id: 'parse',    label: 'INTENT PARSING',     desc: 'LLM extracts structured intent',          color: '#C7FF3F' },
  { id: 'retrieve', label: 'RETRIEVAL',          desc: 'Vector search across knowledge base',     color: '#D6C7B2' },
  { id: 'reason',   label: 'REASONING',          desc: 'Chain-of-thought with retrieved context', color: '#7AE7FF' },
  { id: 'act',      label: 'ACTION / RESPONSE',  desc: 'Tool call or streaming response',         color: '#C7FF3F' },
]

const LIVE_LOGS = [
  'Initializing LLM orchestrator...',
  'Loading vector index [projects.idx]...',
  'Embedding user query...',
  'Searching knowledge base [k=5]...',
  'Constructing context window...',
  'Running chain-of-thought...',
  'Generating response stream...',
  'Response complete. Tokens used: 847',
]

const AI_SYSTEMS = [
  {
    title: 'Portfolio AI Assistant',
    desc: 'RAG-powered assistant trained on portfolio data. Answers recruiter questions about architecture, projects, and decisions using semantic retrieval over embedded project docs.',
    tags: ['OpenAI', 'LangChain', 'Pinecone'],
    status: 'BUILDING',
    statusColor: '#C7FF3F',
    note: 'Vector index ready — chat UI wired, RAG pipeline in progress',
  },
  {
    title: 'Semantic Project Search',
    desc: 'Natural language search across all projects. Finds relevant work based on intent, not keywords — "show me projects with real-time features" returns AutoPilot + Queueless.',
    tags: ['Embeddings', 'Vector DB', 'Cosine Sim'],
    status: 'BUILDING',
    statusColor: '#C7FF3F',
    note: 'Embedding pipeline written, UI integration next',
  },
  {
    title: 'LangChain Agent Workflows',
    desc: 'Exploring multi-step agent systems with tool use, memory, and reflection loops. Currently prototyping a task automation pipeline with human-in-the-loop checkpoints.',
    tags: ['Agents', 'Tool Use', 'Memory'],
    status: 'EXPLORING',
    statusColor: '#7AE7FF',
    note: 'Prototype stage — learning patterns before production use',
  },
  {
    title: 'OpenAI API Integration',
    desc: 'Hands-on experience integrating OpenAI APIs — streaming responses, function calling, prompt engineering, token optimization, and cost management strategies.',
    tags: ['GPT-4o', 'Streaming', 'Function Calling'],
    status: 'ACTIVE',
    statusColor: '#C7FF3F',
    note: 'Production use in contact form and chat endpoints',
  },
]

// ── Status badge dot colors ───────────────────────────────────────────────────

const STATUS_PULSE: Record<string, boolean> = {
  ACTIVE:     true,
  BUILDING:   true,
  EXPLORING:  false,
  BETA:       false,
}

// ── Live log panel ────────────────────────────────────────────────────────────

function LiveLogPanel() {
  const [logs, setLogs]       = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const logRef = useRef<HTMLDivElement>(null)

  const runSimulation = () => {
    if (running) return
    setRunning(true)
    setLogs([])
    LIVE_LOGS.forEach((log, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log])
        if (i === LIVE_LOGS.length - 1) setRunning(false)
      }, i * 380)
    })
  }

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logs])

  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-system text-[--text-muted]">LIVE ORCHESTRATION LOG</span>
        <button
          onClick={runSimulation}
          disabled={running}
          className={cn(
            'text-system px-3 py-1.5 border transition-all duration-300',
            running
              ? 'border-[--border] text-[--text-muted] cursor-not-allowed'
              : 'border-[--border-accent] text-[--accent-lime] hover:bg-[rgba(199,255,63,0.06)]'
          )}
        >
          {running ? 'RUNNING...' : 'RUN SIMULATION'}
        </button>
      </div>

      <div
        ref={logRef}
        className="h-40 overflow-y-auto space-y-1.5 font-mono"
        style={{ scrollbarWidth: 'none' }}
      >
        {logs.length === 0 ? (
          <p className="text-system text-[--text-muted]">
            {'>'} Awaiting simulation trigger...
          </p>
        ) : (
          logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'text-[0.65rem] tracking-wide',
                i === logs.length - 1 ? 'text-[--accent-lime]' : 'text-[--text-muted]'
              )}
            >
              <span className="text-[--text-muted] mr-2">{'>'}</span>
              {log}
              {i === logs.length - 1 && running && (
                <span className="terminal-cursor" />
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

// ── AI system card ────────────────────────────────────────────────────────────

function AISystemCard({
  sys,
  index,
  isInView,
}: {
  sys: typeof AI_SYSTEMS[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="panel p-6 group hover:border-[--border-hover] transition-all duration-300"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-body text-[--text-primary] font-medium leading-snug">
          {sys.title}
        </h3>

        {/* Status badge */}
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 border flex-shrink-0"
          style={{ borderColor: sys.statusColor + '35' }}
        >
          {/* Dot — pulses for active/building, static for exploring */}
          <motion.div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: sys.statusColor }}
            animate={
              STATUS_PULSE[sys.status]
                ? { opacity: [1, 0.3, 1] }
                : { opacity: 0.5 }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span
            className="text-system"
            style={{ color: sys.statusColor }}
          >
            {sys.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-body mb-3">{sys.desc}</p>

      {/* Progress / honest note */}
      <div
        className="flex items-start gap-2 mb-4 px-3 py-2 border-l-2"
        style={{ borderColor: sys.statusColor + '40' }}
      >
        <span
          className="text-system mt-0.5 flex-shrink-0"
          style={{ color: sys.statusColor }}
        >
          →
        </span>
        <span className="text-system text-[--text-muted] leading-relaxed">
          {sys.note}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {sys.tags.map((tag) => (
          <span
            key={tag}
            className="text-system text-[--text-muted] px-2 py-1 border border-[--border] group-hover:border-[--border-hover] transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

export function AILabSection() {
  const sectionRef              = useRef<HTMLElement>(null)
  const isInView                = useInView(sectionRef, { once: true, margin: '-15%' })
  const [activeStep, setActiveStep] = useState(0)
  useSectionReveal(sectionRef)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % WORKFLOW_STEPS.length)
    }, 1400)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      id="ai-lab"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      data-section="ai-lab"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[--bg-primary] via-[#0d0f0a] to-[--bg-primary]" />

      <div className="container-system relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number">
            <span className="accent-line" />06 / AI & AUTOMATION LAB
          </div>
          <h2 className="text-display font-display font-bold text-[--text-primary] mb-4">
            AI Systems
          </h2>
          <p className="text-body max-w-xl">
            Actively exploring the AI engineering stack — from production API integrations
            to building RAG pipelines, agent workflows, and semantic systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Left — pipeline + logs ──────────────────────────────────── */}
          <div>
            {/* Workflow pipeline */}
            <div className="panel p-6 mb-6">
              <span className="text-system text-[--text-muted] block mb-6">
                AI PIPELINE FLOW
              </span>
              <div className="space-y-2">
                {WORKFLOW_STEPS.map((step, i) => (
                  <motion.div
                    key={step.id}
                    className={cn(
                      'flex items-center gap-4 p-4 border transition-all duration-500',
                      activeStep === i
                        ? 'border-[--border-accent] bg-[rgba(199,255,63,0.04)]'
                        : 'border-[--border]'
                    )}
                  >
                    {/* Step dot */}
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300',
                        activeStep === i ? 'scale-150' : 'scale-100'
                      )}
                      style={{
                        background: activeStep === i
                          ? step.color
                          : 'var(--text-muted)',
                      }}
                    />

                    <div className="flex-1">
                      <span
                        className="text-system block mb-0.5"
                        style={{
                          color: activeStep === i
                            ? step.color
                            : 'var(--text-muted)',
                        }}
                      >
                        {step.label}
                      </span>
                      <span className="text-system text-[--text-muted]">
                        {step.desc}
                      </span>
                    </div>

                    {/* Active progress line */}
                    {activeStep === i && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.3 }}
                        className="h-px w-12 origin-left flex-shrink-0"
                        style={{ background: step.color }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Live log simulation */}
            <LiveLogPanel />
          </div>

          {/* ── Right — AI system cards ─────────────────────────────────── */}
          <div className="space-y-4">
            {AI_SYSTEMS.map((sys, i) => (
              <AISystemCard
                key={sys.title}
                sys={sys}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { cn } from '@/utils/cn'

type Stage = 'idle' | 'name' | 'email' | 'project' | 'sending' | 'sent'

const RECRUITER_SHORTCUTS = [
  { label: 'Full-time role inquiry',    value: 'I\'m looking to discuss a full-time engineering position.' },
  { label: 'Freelance project',         value: 'I have a freelance project I\'d like to discuss.' },
  { label: 'Technical collaboration',   value: 'I\'d like to explore a technical collaboration.' },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-15%' })
  const [stage, setStage]         = useState<Stage>('idle')
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [project, setProject]     = useState('')
  const [inputVal, setInputVal]   = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useSectionReveal(sectionRef)

  const handleShortcut = (val: string) => {
    setProject(val)
    setStage('sending')
    setTimeout(() => setStage('sent'), 2200)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (stage === 'idle') {
      setStage('name'); return
    }
    if (stage === 'name') {
      if (!inputVal.trim()) return
      setName(inputVal); setInputVal(''); setStage('email'); return
    }
    if (stage === 'email') {
      if (!inputVal.includes('@')) return
      setEmail(inputVal); setInputVal(''); setStage('project'); return
    }
    if (stage === 'project') {
      if (!inputVal.trim()) return
      setProject(inputVal); setInputVal('')
      setStage('sending')
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, projectIdea: inputVal }),
        })
      } catch (_) { /* swallow */ }
      setTimeout(() => setStage('sent'), 1800)
    }
  }

  const getPrompt = () => {
    if (stage === 'idle')    return 'INITIATE CONNECTION'
    if (stage === 'name')    return 'Enter your name:'
    if (stage === 'email')   return 'Enter your email:'
    if (stage === 'project') return 'Describe your project / idea:'
    if (stage === 'sending') return 'Transmitting...'
    if (stage === 'sent')    return 'SIGNAL RECEIVED'
    return ''
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen section-padding overflow-hidden flex flex-col"
      data-section="contact"
    >
      {/* Pulse background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 system-grid opacity-20" />
        <motion.div
          animate={{ opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-radial"
          style={{ background: 'radial-gradient(ellipse at center, rgba(199,255,63,0.06) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-system relative z-10 flex-1 flex flex-col justify-between">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number"><span className="accent-line" />08 / CONTACT TERMINAL</div>
        </motion.div>

        {/* Center — terminal interface */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {stage !== 'sent' ? (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl"
              >
                {/* Big headline */}
                <h2
                  className="font-display font-bold text-[--text-primary] mb-12 text-center"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.035em', lineHeight: 0.95 }}
                >
                  {stage === 'idle' ? (
                    <>Let's build<br /><span className="text-[--accent-lime]">something.</span></>
                  ) : (
                    <>Connecting<br /><span className="text-[--accent-lime]">to you.</span></>
                  )}
                </h2>

                {/* Terminal panel */}
                <div className="panel p-6">
                  {/* Bread crumb log */}
                  <div className="space-y-1.5 mb-4 min-h-[4rem]">
                    {name && (
                      <p className="font-mono text-[0.65rem] text-[--text-muted]">
                        <span className="text-[--accent-lime] mr-2">✓</span> NAME: {name}
                      </p>
                    )}
                    {email && (
                      <p className="font-mono text-[0.65rem] text-[--text-muted]">
                        <span className="text-[--accent-lime] mr-2">✓</span> EMAIL: {email}
                      </p>
                    )}
                    {stage === 'sending' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="font-mono text-[0.65rem] text-[--accent-lime]"
                      >
                        {'>'} Transmitting signal...
                      </motion.p>
                    )}
                  </div>

                  {/* Prompt + input */}
                  <p className="text-system text-[--text-muted] mb-3">{getPrompt()}</p>

                  {(stage === 'idle' || stage === 'name' || stage === 'email' || stage === 'project') && (
                    <form onSubmit={handleSubmit}>
                      <div className="flex items-center gap-3 border-b border-[--border-hover] pb-2">
                        <span className="text-[--accent-lime] font-mono text-sm">{'>'}</span>
                        {stage === 'idle' ? (
                          <button
                            type="submit"
                            className="text-label text-[--text-secondary] hover:text-[--accent-lime] transition-colors duration-300"
                          >
                            INITIATE CONNECTION ↵
                          </button>
                        ) : (
                          <input
                            ref={inputRef}
                            autoFocus
                            type={stage === 'email' ? 'email' : 'text'}
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            placeholder={
                              stage === 'name'    ? 'Your name...' :
                              stage === 'email'   ? 'your@email.com' :
                              'Describe what you\'re building...'
                            }
                            className={cn(
                              'flex-1 bg-transparent text-[--text-primary] font-mono text-sm',
                              'placeholder:text-[--text-muted] outline-none',
                              'transition-colors duration-200'
                            )}
                          />
                        )}
                        {stage !== 'idle' && (
                          <button type="submit" className="text-system text-[--accent-lime]">↵</button>
                        )}
                      </div>
                    </form>
                  )}
                </div>

                {/* Recruiter shortcuts */}
                {stage === 'project' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <p className="text-system text-[--text-muted] mb-3">QUICK SHORTCUTS</p>
                    <div className="space-y-2">
                      {RECRUITER_SHORTCUTS.map((sc) => (
                        <button
                          key={sc.label}
                          onClick={() => { setInputVal(sc.value) }}
                          className="w-full text-left text-system text-[--text-secondary] px-4 py-2.5 border border-[--border] hover:border-[--border-accent] hover:text-[--accent-lime] transition-all duration-200"
                        >
                          {sc.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* Sent confirmation */
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-lg"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-8 border border-[--accent-lime]/50 flex items-center justify-center"
                >
                  <span className="text-[--accent-lime] text-2xl">✓</span>
                </motion.div>
                <h3 className="text-display font-display font-bold text-[--text-primary] mb-4"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}>
                  SIGNAL RECEIVED
                </h3>
                <p className="text-body mb-2">Response Protocol Initiated.</p>
                <p className="text-system text-[--text-muted]">
                  Expected response: within 24 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
    <motion.footer
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : {}}
  transition={{ delay: 0.5 }}
  className="mt-16 pt-8 border-t border-[--border] grid grid-cols-1 md:grid-cols-3 items-center gap-6"
>
  {/* LEFT */}
  <div className="flex flex-col md:items-start items-center">
    <p className="text-label text-[--text-primary] mb-1 leading-none">
      RAHUL GUPTA
    </p>
    <p className="text-system text-[--text-muted] leading-none text-center md:text-left">
      EXPERIENCE ENGINEER 
    </p>
  </div>

  {/* CENTER */}
  <div className="flex flex-wrap justify-center gap-6">
    {[
      { label: 'GITHUB', href: 'https://github.com/myscreencode18/' },
      { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/rahul-gupta-65759b276/' },
      { label: 'TWITTER', href: 'https://twitter.com/rahulgupta' },
    ].map((link) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-system text-[--text-muted] hover:text-[--accent-lime] transition-colors duration-300"
      >
        {link.label}
      </a>
    ))}
  </div>

  {/* RIGHT */}
  <p className="text-system text-[--text-muted] text-center md:text-right leading-none">
    © 2026 RAHUL GUPTA
  </p>
</motion.footer>
      </div>
    </section>
  )
}

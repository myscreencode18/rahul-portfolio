'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSiteModeStore } from '@/store'
import { getLenis } from '@/hooks/useLenis'
import { cn } from '@/utils/cn'

interface Command {
  id:       string
  label:    string
  hint:     string
  category: string
  action:   () => void
  icon?:    string
}

export function CommandPalette() {
  const [open, setOpen]     = useState(false)
  const [query, setQuery]   = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef  = useRef<HTMLInputElement>(null)
  const { setMode, mode } = useSiteModeStore()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) getLenis()?.scrollTo(el, { offset: -80, duration: 1.4 })
    setOpen(false)
  }

  const COMMANDS: Command[] = [
    { id: 'identity',    label: 'Go to Identity Layer',      hint: 'Section 01',  category: 'NAV',      action: () => scrollTo('identity'),    icon: '◈' },
    { id: 'ecosystem',   label: 'Go to Tech Ecosystem',      hint: 'Section 02',  category: 'NAV',      action: () => scrollTo('ecosystem'),   icon: '◉' },
    { id: 'projects',    label: 'Go to Selected Systems',    hint: 'Section 03',  category: 'NAV',      action: () => scrollTo('projects'),    icon: '◫' },
    { id: 'mindset',     label: 'Go to Engineering Mindset', hint: 'Section 04',  category: 'NAV',      action: () => scrollTo('mindset'),     icon: '◱' },
    { id: 'lab',         label: 'Go to Motion Lab',          hint: 'Section 05',  category: 'NAV',      action: () => scrollTo('lab'),         icon: '◲' },
    { id: 'ai-lab',      label: 'Go to AI Lab',              hint: 'Section 06',  category: 'NAV',      action: () => scrollTo('ai-lab'),      icon: '◈' },
    { id: 'mobile',      label: 'Go to Mobile Systems',      hint: 'Section —',   category: 'NAV',      action: () => scrollTo('mobile'),      icon: '◉' },
    { id: 'timeline',    label: 'Go to Timeline',            hint: 'Section 07',  category: 'NAV',      action: () => scrollTo('timeline'),    icon: '◫' },
    { id: 'playground',  label: 'Go to Playground',          hint: 'Experiments', category: 'NAV',      action: () => scrollTo('playground'),  icon: '◱' },
    { id: 'contact',     label: 'Go to Contact Terminal',    hint: 'Section 08',  category: 'NAV',      action: () => scrollTo('contact'),     icon: '◲' },
    { id: 'eng-mode',    label: mode === 'engineering' ? 'Disable Engineering Mode' : 'Enable Engineering Mode',
                                                             hint: 'Toggle · E',  category: 'MODE',     action: () => { setMode(mode === 'engineering' ? 'experience' : 'engineering'); setOpen(false) }, icon: '⚙' },
    { id: 'github',      label: 'Open GitHub',               hint: 'External',    category: 'LINKS',    action: () => { window.open('https://github.com/rahulgupta', '_blank'); setOpen(false) }, icon: '↗' },
    { id: 'linkedin',    label: 'Open LinkedIn',             hint: 'External',    category: 'LINKS',    action: () => { window.open('https://linkedin.com/in/rahulgupta', '_blank'); setOpen(false) }, icon: '↗' },
  ]

  const filtered = query.trim()
    ? COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS

  /* Open on / key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey)))) {
        const el = document.activeElement
        if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return
        e.preventDefault()
        setOpen((o) => !o)
        setQuery('')
        setCursor(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  /* Arrow key navigation */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)) }
      if (e.key === 'Enter' && filtered[cursor]) {
        filtered[cursor].action()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, cursor])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => { setCursor(0) }, [query])

  /* Group by category */
  const categories = [...new Set(filtered.map((c) => c.category))]

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-modal bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-modal w-full max-w-lg"
          >
            <div className="panel-dark border border-[--border-accent] overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[--border]">
                <span className="text-[--accent-lime] text-lg">{'>'}</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-[--text-primary] font-mono text-sm outline-none placeholder:text-[--text-muted]"
                />
                <kbd className="text-system text-[--text-muted] border border-[--border] px-1.5 py-0.5">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-1">
                {filtered.length === 0 ? (
                  <p className="text-system text-[--text-muted] px-4 py-6 text-center">No commands found</p>
                ) : (
                  categories.map((cat) => (
                    <div key={cat}>
                      <p className="text-system text-[--text-muted] px-4 py-2 sticky top-0 bg-[--bg-secondary]">{cat}</p>
                      {filtered.filter((c) => c.category === cat).map((cmd) => {
                        const globalIdx = filtered.indexOf(cmd)
                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setCursor(globalIdx)}
                            className={cn(
                              'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100',
                              cursor === globalIdx ? 'bg-[rgba(199,255,63,0.06)]' : 'hover:bg-[rgba(255,255,255,0.03)]'
                            )}
                          >
                            <span className="text-[--text-muted] w-4 text-center text-sm">{cmd.icon}</span>
                            <span className={cn(
                              'flex-1 text-body',
                              cursor === globalIdx ? 'text-[--text-primary]' : 'text-[--text-secondary]'
                            )}>
                              {cmd.label}
                            </span>
                            <span className="text-system text-[--text-muted]">{cmd.hint}</span>
                            {cursor === globalIdx && (
                              <kbd className="text-system text-[--accent-lime] border border-[--border-accent] px-1.5 py-0.5">↵</kbd>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-[--border] px-4 py-2 flex gap-4">
                <span className="text-system text-[--text-muted]">↑↓ NAVIGATE</span>
                <span className="text-system text-[--text-muted]">↵ SELECT</span>
                <span className="text-system text-[--text-muted]">/ OR ⌘K TO OPEN</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

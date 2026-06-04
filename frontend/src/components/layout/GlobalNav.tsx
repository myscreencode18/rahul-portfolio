'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavStore, useSiteModeStore } from '@/store'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { label: 'IDENTITY',   href: '#identity',   index: '01' },
  { label: 'ECOSYSTEM',  href: '#ecosystem',  index: '02' },
  { label: 'SYSTEMS',    href: '#projects',   index: '03' },
  { label: 'MINDSET',    href: '#mindset',    index: '04' },
  { label: 'LABS',       href: '#lab',        index: '05' },
  { label: 'AI LAB',     href: '#ai-lab',     index: '06' },
  { label: 'TIMELINE',   href: '#timeline',   index: '07' },
  { label: 'CONTACT',    href: '#contact',    index: '08' },
]

export function GlobalNav() {
  const { nav, toggleNav, closeNav } = useNavStore()
  const { mode, setMode } = useSiteModeStore()
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (nav.isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [nav.isOpen])

  return (
    <>
      {/* Minimal top bar */}
      <header
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-nav',
          'flex items-center justify-between',
          'px-6 md:px-10 py-5',
          'transition-all duration-500',
          scrolled && 'py-4 border-b border-[--border]',
          scrolled && 'backdrop-blur-sm bg-[#0A0A0A]/80'
        )}
      >
        {/* Logo mark */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={closeNav}
        >
          <span className="text-system text-[--text-muted] group-hover:text-[--accent-lime] transition-colors duration-300">
            RG
          </span>
          <span
            className={cn(
              'w-5 h-px bg-[--border-hover]',
              'group-hover:w-8 group-hover:bg-[--accent-lime]',
              'transition-all duration-400'
            )}
          />
          <span className="text-system opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            RAHUL GUPTA
          </span>
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-6">
          {/* Mode toggle */}
          <button
            onClick={() => setMode(mode === 'experience' ? 'engineering' : 'experience')}
            className={cn(
              'text-system hidden md:flex items-center gap-2',
              'text-[--text-muted] hover:text-[--text-secondary]',
              'transition-colors duration-300'
            )}
          >
            <span className={cn(
              'w-1.5 h-1.5 rounded-full transition-colors duration-300',
              mode === 'engineering' ? 'bg-[--accent-lime]' : 'bg-[--text-muted]'
            )} />
            {mode === 'engineering' ? 'ENGINEERING MODE' : 'EXPERIENCE MODE'}
          </button>

          {/* Availability badge */}
          <div className="hidden md:flex items-center gap-2">
            <span className="status-dot" />
            <span className="text-system text-[--text-muted]">AVAILABLE</span>
          </div>

          {/* Menu toggle */}
          <button
            onClick={toggleNav}
            className="flex flex-col gap-1.5 group p-1"
            aria-label={nav.isOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={cn(
              'block w-6 h-px bg-[--text-secondary]',
              'transition-all duration-300 origin-center',
              nav.isOpen && 'rotate-45 translate-y-[5px]'
            )} />
            <span className={cn(
              'block w-4 h-px bg-[--text-secondary]',
              'transition-all duration-300',
              nav.isOpen && 'opacity-0 w-0'
            )} />
            <span className={cn(
              'block w-6 h-px bg-[--text-secondary]',
              'transition-all duration-300 origin-center',
              nav.isOpen && '-rotate-45 -translate-y-[5px]'
            )} />
          </button>
        </div>
      </header>

      {/* Fullscreen navigation overlay */}
      <AnimatePresence>
        {nav.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-modal bg-[#0A0A0A]/95 backdrop-blur-md"
            onClick={closeNav}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full md:w-[60vw] flex flex-col justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-10 md:px-16">
                {/* System label */}
                <p className="text-system mb-12 text-[--text-muted]">
                  NAVIGATION — SYSTEM MAP
                </p>

                {/* Nav items */}
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 40, opacity: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeNav}
                        className={cn(
                          'group flex items-baseline gap-6 py-3',
                          'border-b border-[--border]',
                          'hover:border-[--border-accent]',
                          'transition-colors duration-300'
                        )}
                      >
                        <span className="text-system text-[--text-muted] w-8 group-hover:text-[--accent-lime] transition-colors">
                          {item.index}
                        </span>
                        <span className={cn(
                          'font-display font-bold',
                          'text-3xl md:text-5xl',
                          'text-[--text-secondary] group-hover:text-[--text-primary]',
                          'transition-colors duration-300',
                          'tracking-tight'
                        )}>
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom meta */}
                <div className="mt-12 flex items-center justify-between">
                  <p className="text-system text-[--text-muted]">
                    FULL-STACK · AI · MOTION · SYSTEMS
                  </p>
                  <p className="text-system text-[--text-muted]">
                    GMT+5:30
                  </p>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

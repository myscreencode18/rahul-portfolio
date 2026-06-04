'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { cn } from '@/utils/cn'

const APPS = [
  {
    id: 'memory-lane-camera',
    name: 'Memory Lane Camera',
    platform: 'React Native + Expo',
    desc:
      'Camera-based memory system that automatically organizes photos into meaningful life moments instead of traditional folders or timelines.',

    color: '#C7FF3F',

    screens: ['Capture', 'Moments', 'Search', 'Timeline'],

    features: [
      {
        label: 'Smart Tagging System',
        detail:
          'User-defined + context-based tags for automatic memory grouping'
      },
      {
        label: 'Natural Search',
        detail:
          'Search photos using intent like “late night coding” or “gym progress”'
      },
      {
        label: 'Timeline Memory View',
        detail:
          'Chronological + semantic hybrid gallery experience'
      },
      {
        label: 'Offline First Storage',
        detail:
          'Local caching with sync-ready architecture for future cloud backup'
      }
    ],

    metrics: {
      size: '~10MB',
      fps: '60fps UI',
      rating: 'Concept MVP'
    }
  },

  {
    id: 'moodscape',
    name: 'MoodScape',
    platform: 'React Native + Expo',
    desc:
      'Emotional visualization journal where each day becomes a floating planet representing mood, intensity, and mental state.',

    color: '#7AE7FF',

    screens: ['Today', 'Universe', 'History', 'Insights'],

    features: [
      {
        label: 'Emotional Mapping',
        detail:
          'Mood converted into color, shape, and motion intensity'
      },
      {
        label: 'Interactive Universe UI',
        detail:
          'Swipe/rotate through a personalized emotional galaxy'
      },
      {
        label: 'Daily Check-in System',
        detail:
          'Lightweight journaling with minimal input friction'
      },
      {
        label: 'Gesture-based Navigation',
        detail:
          'Built using React Native Gesture Handler + Reanimated'
      }
    ],

    metrics: {
      size: '~8MB',
      fps: '60fps UI',
      rating: 'High UX concept'
    }
  }
]


const MOBILE_STACK = [
  { name: 'React Native',     role: 'Cross-platform foundation',    color: '#7AE7FF' },
  { name: 'Expo',             role: 'Toolchain + OTA updates',      color: '#C7FF3F' },
  { name: 'Reanimated 3',     role: 'Native thread animations',     color: '#D6C7B2' },
  { name: 'Gesture Handler',  role: 'Pan, pinch, swipe gestures',   color: '#7AE7FF' },
  { name: 'React Navigation', role: 'Stack, tab, drawer routing',   color: '#C7FF3F' },
  { name: 'MMKV',             role: 'Synchronous local storage',    color: '#D6C7B2' },
  { name: 'Expo EAS',         role: 'Build + submit pipeline',      color: '#7AE7FF' },
  { name: 'Hermes Engine',    role: 'Optimised JS runtime',         color: '#C7FF3F' },
  { name: 'Flutter',          role: 'High-fidelity native UI',      color: '#7AE7FF' },
  { name: 'Dart',             role: 'AOT compiled, null-safe',      color: '#C7FF3F' },
  { name: 'BLoC / Riverpod',  role: 'Flutter state management',    color: '#D6C7B2' },
  { name: 'Skia Renderer',    role: '120fps custom paint engine',   color: '#7AE7FF' },
]

function PhoneMockup({ app, index }: { app: typeof APPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 12 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{ perspective: 1000 }}
      className="flex flex-col gap-6"
    >
      {/* Phone frame */}
      <div className="relative mx-auto" style={{ width: 200 }}>
        {/* Outer shell */}
        <div
          className="relative rounded-[2.2rem] border-2 overflow-hidden"
          style={{
            borderColor: app.color + '40',
            background: 'var(--bg-secondary)',
            height: 380,
            boxShadow: `0 0 40px ${app.color}15, 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-xl z-10"
            style={{ background: '#0A0A0A' }} />

          {/* Screen */}
          <div className="absolute inset-[3px] rounded-[calc(2.2rem-3px)] overflow-hidden"
            style={{ background: '#0d0d0d' }}>

            {/* Status bar */}
            <div className="flex justify-between items-center px-4 pt-6 pb-2">
              <span className="font-mono text-[9px] text-[--text-muted]">9:41</span>
              <div className="flex gap-1 items-center">
                {[3,2,3].map((h, i) => (
                  <div key={i} className="w-0.5 rounded-sm" style={{ height: h*2, background: app.color + '80' }} />
                ))}
                <div className="w-4 h-2 rounded-sm border ml-1" style={{ borderColor: app.color + '60' }}>
                  <div className="h-full rounded-sm" style={{ width: '70%', background: app.color }} />
                </div>
              </div>
            </div>

            {/* App header */}
            <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ background: app.color + '20', border: `1px solid ${app.color}40` }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: app.color }} />
                </div>
                <span className="font-mono text-[10px]" style={{ color: app.color }}>{app.name}</span>
              </div>
            </div>

            {/* Mock content blocks */}
            <div className="px-3 pt-3 space-y-2">
              {[70, 50, 85, 40, 60].map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  className="h-2 rounded-full origin-left"
                  style={{
                    width: `${w}%`,
                    background: i === 0
                      ? app.color + '60'
                      : i % 2 === 0
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(255,255,255,0.04)',
                  }}
                />
              ))}

              {/* Mock card */}
              <div className="mt-3 rounded-lg p-2.5 border"
                style={{ borderColor: app.color + '20', background: app.color + '06' }}>
                <div className="h-1.5 w-16 rounded-full mb-1.5" style={{ background: app.color + '50' }} />
                <div className="h-1 w-24 rounded-full mb-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="h-1 w-20 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>

              {/* Tab bar */}
              <div className="absolute bottom-0 inset-x-0 flex justify-around items-center py-2 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0d0d0d' }}>
                {app.screens.slice(0, 4).map((s, i) => (
                  <div key={s} className="flex flex-col items-center gap-0.5">
                    <div className="w-4 h-4 rounded-sm flex items-center justify-center">
                      <div
                        className="rounded-sm"
                        style={{
                          width: i === 0 ? 8 : 6,
                          height: i === 0 ? 8 : 6,
                          background: i === 0 ? app.color : 'rgba(255,255,255,0.2)',
                        }}
                      />
                    </div>
                    <span className="font-mono" style={{ fontSize: 6, color: i === 0 ? app.color : 'rgba(255,255,255,0.3)' }}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side button */}
          <div className="absolute right-[-3px] top-20 w-[3px] h-8 rounded-r"
            style={{ background: app.color + '40' }} />
        </div>

        {/* Glow under phone */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 blur-xl rounded-full"
          style={{ background: app.color + '30' }} />
      </div>

      {/* Metrics row */}
      <div className="flex justify-center gap-4 mx-auto">
        {Object.entries(app.metrics).map(([key, val]) => (
          <div key={key} className="text-center">
            <div className="font-display font-bold text-sm" style={{ color: app.color }}>{val}</div>
            <div className="text-system text-[--text-muted] uppercase">{key}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function MobileSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-10%' })
  useSectionReveal(sectionRef)

  return (
    <section
      id="mobile"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      data-section="mobile"
    >
      <div className="absolute inset-0 system-grid opacity-15" />
      <div className="container-system relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-number"><span className="accent-line" />— / MOBILE SYSTEMS</div>
          <h2 className="text-display font-display font-bold text-[--text-primary] mb-4">
            Mobile Engineering
          </h2>
         <p className="text-body max-w-xl">
  Mobile engineering with React Native and Flutter, building gesture-rich, high-performance apps with real-world UX patterns and scalable architecture thinking.
</p>
        </motion.div>

        {/* Phone mockups */}
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20 mb-20">
          {APPS.map((app, i) => (
            <PhoneMockup key={app.id} app={app} index={i} />
          ))}
        </div>

        {/* App detail cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {APPS.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="panel p-6"
            >
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[--border]">
                <div className="w-2 h-2 rounded-full" style={{ background: app.color }} />
                <span className="text-label" style={{ color: app.color }}>{app.name}</span>
                <span className="text-system text-[--text-muted] ml-auto">{app.platform}</span>
              </div>
              <p className="text-body mb-5">{app.desc}</p>
              <div className="space-y-3">
                {app.features.map((f) => (
                  <div key={f.label} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: app.color }} />
                    <div>
                      <span className="text-body text-[--text-primary] font-medium">{f.label}</span>
                      <span className="text-body text-[--text-secondary]"> — {f.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile stack grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-system text-[--text-muted] mb-6">MOBILE TECH STACK</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MOBILE_STACK.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55 + i * 0.05 }}
                className="panel p-4 hover:border-[--border-hover] transition-colors duration-200"
              >
                <div className="text-body font-medium text-[--text-primary] mb-1">{item.name}</div>
                <div className="text-system text-[--text-muted]">{item.role}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

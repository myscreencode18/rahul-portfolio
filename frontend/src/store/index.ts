import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type {
  SiteMode,
  CursorState,
  AudioState,
  NavigationState,
  BootState,
  BootPhase,
  BootLog,
  MotionConfig,
  AtmosphereState,
} from '@/types'

// ─── Site Mode Store ──────────────────────────────────────────────────────────

interface SiteModeStore {
  mode: SiteMode
  setMode: (mode: SiteMode) => void
  atmosphere: AtmosphereState
  setAtmosphere: (a: AtmosphereState) => void
}

export const useSiteModeStore = create<SiteModeStore>()(
  subscribeWithSelector((set) => ({
    mode: 'experience',
    setMode: (mode) => set({ mode }),
    atmosphere: 'dark',
    setAtmosphere: (atmosphere) => set({ atmosphere }),
  }))
)

// ─── Boot Store ───────────────────────────────────────────────────────────────

interface BootStore {
  state: BootState
  setPhase: (phase: BootPhase) => void
  addLog: (log: Omit<BootLog, 'id' | 'timestamp'>) => void
  updateLog: (id: string, status: BootLog['status']) => void
  setComplete: () => void
  setProgress: (progress: number) => void
}

export const useBootStore = create<BootStore>()(
  subscribeWithSelector((set) => ({
    state: {
      phase: 'initializing',
      progress: 0,
      logs: [],
      complete: false,
    },
    setPhase: (phase) =>
      set((s) => ({ state: { ...s.state, phase } })),
    addLog: (log) =>
      set((s) => ({
        state: {
          ...s.state,
          logs: [
            ...s.state.logs,
            { ...log, id: Math.random().toString(36).slice(2), timestamp: Date.now() },
          ],
        },
      })),
    updateLog: (id, status) =>
      set((s) => ({
        state: {
          ...s.state,
          logs: s.state.logs.map((l) => (l.id === id ? { ...l, status } : l)),
        },
      })),
    setComplete: () =>
      set((s) => ({ state: { ...s.state, complete: true, progress: 100 } })),
    setProgress: (progress) =>
      set((s) => ({ state: { ...s.state, progress } })),
  }))
)

// ─── Cursor Store ─────────────────────────────────────────────────────────────

interface CursorStore {
  cursor: CursorState
  setCursor: (partial: Partial<CursorState>) => void
  setCursorMode: (mode: CursorState['mode']) => void
}

export const useCursorStore = create<CursorStore>()(
  subscribeWithSelector((set) => ({
    cursor: {
      x: 0, y: 0, vx: 0, vy: 0,
      mode: 'default',
      isHovering: false,
      target: null,
    },
    setCursor: (partial) =>
      set((s) => ({ cursor: { ...s.cursor, ...partial } })),
    setCursorMode: (mode) =>
      set((s) => ({ cursor: { ...s.cursor, mode } })),
  }))
)

// ─── Audio Store ──────────────────────────────────────────────────────────────

interface AudioStore {
  audio: AudioState
  toggleAudio: () => void
  setVolume: (volume: number) => void
  setAmbient: (ambient: boolean) => void
}

export const useAudioStore = create<AudioStore>()(
  subscribeWithSelector((set) => ({
    audio: {
      enabled: false,
      volume: 0.3,
      ambient: false,
      currentTrack: null,
    },
    toggleAudio: () =>
      set((s) => ({ audio: { ...s.audio, enabled: !s.audio.enabled } })),
    setVolume: (volume) =>
      set((s) => ({ audio: { ...s.audio, volume } })),
    setAmbient: (ambient) =>
      set((s) => ({ audio: { ...s.audio, ambient } })),
  }))
)

// ─── Navigation Store ─────────────────────────────────────────────────────────

interface NavStore {
  nav: NavigationState
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
  setActiveSection: (section: string) => void
  setTransitioning: (v: boolean) => void
}

export const useNavStore = create<NavStore>()(
  subscribeWithSelector((set) => ({
    nav: {
      isOpen: false,
      activeSection: 'entry',
      previousSection: null,
      isTransitioning: false,
    },
    openNav: () => set((s) => ({ nav: { ...s.nav, isOpen: true } })),
    closeNav: () => set((s) => ({ nav: { ...s.nav, isOpen: false } })),
    toggleNav: () => set((s) => ({ nav: { ...s.nav, isOpen: !s.nav.isOpen } })),
    setActiveSection: (section) =>
      set((s) => ({
        nav: {
          ...s.nav,
          previousSection: s.nav.activeSection,
          activeSection: section,
        },
      })),
    setTransitioning: (isTransitioning) =>
      set((s) => ({ nav: { ...s.nav, isTransitioning } })),
  }))
)

// ─── Motion Config Store ──────────────────────────────────────────────────────

interface MotionStore {
  config: MotionConfig
  setConfig: (partial: Partial<MotionConfig>) => void
  detectCapabilities: () => void
}

export const useMotionStore = create<MotionStore>()(
  subscribeWithSelector((set) => ({
    config: {
      reducedMotion: false,
      fps: 60,
      gpuTier: 'high',
      enableShaders: true,
      enableParticles: true,
      enableBlur: true,
    },
    setConfig: (partial) =>
      set((s) => ({ config: { ...s.config, ...partial } })),
    detectCapabilities: () => {
      if (typeof window === 'undefined') return
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent)
      set((s) => ({
        config: {
          ...s.config,
          reducedMotion,
          gpuTier: isMobile ? 'low' : 'high',
          enableShaders: !isMobile && !reducedMotion,
          enableParticles: !isMobile && !reducedMotion,
          enableBlur: !reducedMotion,
        },
      }))
    },
  }))
)

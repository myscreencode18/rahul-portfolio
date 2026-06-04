// ─── Project Types ───────────────────────────────────────────────────────────

export interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  problem: string
  year: number
  stack: string[]
  category: ProjectCategory
  role: string
  status: 'live' | 'archived' | 'wip'
  color: string
  accentColor: string
  architecture: ArchitectureNode[]
  decisions: EngineeringDecision[]
  metrics: ProjectMetric[]
  links: { demo?: string; github?: string; case?: string }
  coverImage?: string
  scenes: ProjectScene[]
}

export type ProjectCategory =
  | 'fullstack'
  | 'ai'
  | 'mobile'
  | 'motion'
  | 'systems'

export interface ProjectScene {
  id: string
  type: 'problem' | 'experience' | 'architecture' | 'decisions' | 'outcome'
  headline: string
  body: string
  visual?: string
}

export interface ArchitectureNode {
  id: string
  label: string
  layer: 'frontend' | 'backend' | 'ai' | 'infra' | 'mobile' | 'db'
  description: string
  connections: string[]
  tech: string[]
}

export interface EngineeringDecision {
  title: string
  context: string
  decision: string
  tradeoffs: string
}

export interface ProjectMetric {
  label: string
  value: string
  note?: string
}

// ─── Tech Ecosystem Types ────────────────────────────────────────────────────

export interface TechCluster {
  id: string
  label: string
  icon: string
  angle: number
  color: string
  items: TechItem[]
}

export interface TechItem {
  name: string
  description: string
  useCase: string
  pattern: string
  performance: string
}

// ─── Store Types ─────────────────────────────────────────────────────────────

export type SiteMode = 'experience' | 'engineering' | 'cinematic' | 'archive'
export type ThemeState = 'boot' | 'idle' | 'active' | 'transition'
export type AtmosphereState = 'dark' | 'ambient' | 'focused'

export interface CursorState {
  x: number
  y: number
  vx: number
  vy: number
  mode: CursorMode
  isHovering: boolean
  target: string | null
}

export type CursorMode =
  | 'default'
  | 'explore'
  | 'architecture'
  | 'interaction'
  | 'cinematic'
  | 'magnetic'
  | 'text'

export interface AudioState {
  enabled: boolean
  volume: number
  ambient: boolean
  currentTrack: string | null
}

export interface NavigationState {
  isOpen: boolean
  activeSection: string
  previousSection: string | null
  isTransitioning: boolean
}

export interface BootState {
  phase: BootPhase
  progress: number
  logs: BootLog[]
  complete: boolean
}

export type BootPhase =
  | 'initializing'
  | 'loading-systems'
  | 'syncing-motion'
  | 'ai-ready'
  | 'complete'

export interface BootLog {
  id: string
  message: string
  status: 'pending' | 'active' | 'complete' | 'error'
  timestamp: number
}

// ─── Motion Types ────────────────────────────────────────────────────────────

export interface MotionConfig {
  reducedMotion: boolean
  fps: number
  gpuTier: 'low' | 'medium' | 'high'
  enableShaders: boolean
  enableParticles: boolean
  enableBlur: boolean
}

// ─── Contact / AI Types ──────────────────────────────────────────────────────

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface ContactPayload {
  name: string
  email: string
  projectIdea: string
  budget?: string
  timeline?: string
}

export interface RecruiterSession {
  id: string
  startTime: number
  sectionsViewed: string[]
  projectsViewed: string[]
  messagesExchanged: number
  intent: 'hiring' | 'freelance' | 'collaboration' | 'unknown'
}

// ─── Shader Types ────────────────────────────────────────────────────────────

export interface ShaderUniforms {
  uTime: { value: number }
  uResolution: { value: [number, number] }
  uMouse: { value: [number, number] }
  uAccent: { value: [number, number, number] }
  uIntensity: { value: number }
}

// ─── Timeline Types ──────────────────────────────────────────────────────────

export interface TimelineEntry {
  id: string
  year: number
  phase: string
  title: string
  description: string
  breakthrough: string
  tech: string[]
  type: 'learning' | 'project' | 'shift' | 'milestone'
}

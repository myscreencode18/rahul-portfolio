import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { RootProviders }      from '@/components/layout/RootProviders'
import { CustomCursor }       from '@/components/cursor/CustomCursor'
import { GlobalNav }          from '@/components/layout/GlobalNav'
import { BackgroundSystem }   from '@/components/canvas/BackgroundSystem'
import { NoiseOverlay }       from '@/components/ui/NoiseOverlay'
import { ScanLine }           from '@/components/ui/ScanLine'
import { AIAssistant }        from '@/components/ui/AIAssistant'
import { CommandPalette }     from '@/components/ui/CommandPalette'
import { EngineeringOverlay } from '@/components/ui/EngineeringOverlay'
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor'
import { PageTransition }     from '@/components/motion/PageTransition'

export const metadata: Metadata = {
  title: {
    default:  'Rahul Gupta — Experience Engineer',
    template: '%s | Rahul Gupta',
  },
  description:
    'Full-stack experience engineer building intelligent, high-performance digital systems across frontend, backend, AI, and motion.',
  keywords: [
    'Full Stack Developer', 'Experience Engineer', 'GSAP',
    'Three.js', 'Next.js', 'AI Engineer', 'Motion Design', 'React',
  ],
  authors:  [{ name: 'Rahul Gupta' }],
  creator:  'Rahul Gupta',
  openGraph: {
    type:      'website',
    locale:    'en_US',
    url:       'https://rahulgupta.dev',
    siteName:  'Rahul Gupta — Experience Engineer',
    title:     'Rahul Gupta — Experience Engineer',
    description:'Full-stack experience engineer building intelligent digital systems.',
    images:    [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Rahul Gupta — Experience Engineer',
    description: 'Full-stack experience engineer.',
    creator:     '@rahulgupta',
    images:      ['/og-image.jpg'],
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  width:      'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="noise-overlay " suppressHydrationWarning>
        <RootProviders>
          {/* ── Ambient background canvas ──────────────── */}
          <BackgroundSystem />

          {/* ── Atmospheric overlays ───────────────────── */}
          <NoiseOverlay />
          <ScanLine />

          {/* ── Page wipe transition ────────────────────── */}
          <PageTransition />

          {/* ── Global navigation ───────────────────────── */}
          <GlobalNav />

          {/* ── Custom cursor (desktop) ─────────────────── */}
          <CustomCursor />

          {/* ── Engineering mode HUD ────────────────────── */}
          <EngineeringOverlay />

          {/* ── Performance monitor (P key) ─────────────── */}
          <PerformanceMonitor />

          {/* ── Command palette (/ or ⌘K) ───────────────── */}
          <CommandPalette />

          {/* ── AI assistant floating widget ────────────── */}
          <AIAssistant />

          {/* ── Page content ────────────────────────────── */}
          <main id="main-content">{children}</main>
        </RootProviders>
      </body>
    </html>
  )
}

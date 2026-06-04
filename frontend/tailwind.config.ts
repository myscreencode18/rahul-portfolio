import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   '#0A0A0A',
          secondary: '#111111',
          tertiary:  '#181818',
          surface:   '#1E1E1E',
        },
        accent: {
          lime:   '#C7FF3F',
          cyan:   '#7AE7FF',
          warm:   '#D6C7B2',
          dim:    '#8A9B6E',
        },
        system: {
          border:  'rgba(255,255,255,0.08)',
          border2: 'rgba(255,255,255,0.14)',
          glow:    'rgba(199,255,63,0.15)',
        },
        text: {
          primary:   '#F0EDE8',
          secondary: '#8A8A8A',
          muted:     '#444444',
          mono:      '#6B7F5E',
        },
      },
      fontFamily: {
        sans:  ['var(--font-switzer)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'system': ['0.625rem', { lineHeight: '1', letterSpacing: '0.15em' }],
        'label':  ['0.75rem',  { lineHeight: '1.2', letterSpacing: '0.1em' }],
        'body':   ['0.9375rem',{ lineHeight: '1.6' }],
        'lead':   ['1.125rem', { lineHeight: '1.5' }],
        'h3':     ['1.5rem',   { lineHeight: '1.3' }],
        'h2':     ['2.5rem',   { lineHeight: '1.15' }],
        'h1':     ['4rem',     { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display':['7rem',     { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'hero':   ['clamp(4rem, 10vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        'section': '8rem',
      },
      borderRadius: {
        'panel': '2px',
        'card':  '6px',
        'lg':    '10px',
      },
      animation: {
        'signal':      'signal 2s linear infinite',
        'pulse-slow':  'pulse 4s ease-in-out infinite',
        'scan':        'scan 8s linear infinite',
        'flicker':     'flicker 0.1s steps(1) infinite',
        'grid-drift':  'gridDrift 20s linear infinite',
        'orbit':       'orbit 12s linear infinite',
      },
      keyframes: {
        signal: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.7' },
        },
        gridDrift: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
      backgroundImage: {
        'grid-system': `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        'grid-dense': `
          linear-gradient(rgba(199,255,63,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(199,255,63,0.04) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid-60':  '60px 60px',
        'grid-30':  '30px 30px',
        'grid-120': '120px 120px',
      },
      transitionTimingFunction: {
        'expo-out':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in':   'cubic-bezier(0.7, 0, 0.84, 0)',
        'cinematic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      zIndex: {
        'canvas':   '0',
        'base':     '10',
        'overlay':  '20',
        'nav':      '50',
        'cursor':   '100',
        'entry':    '200',
        'modal':    '300',
      },
    },
  },
  plugins: [],
}

export default config

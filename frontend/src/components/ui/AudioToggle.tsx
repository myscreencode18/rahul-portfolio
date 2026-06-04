'use client'

import { useAudio } from '@/hooks/useAudio'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function AudioToggle() {
  const { enabled, toggleAudio } = useAudio()

  return (
    <motion.button
      onClick={toggleAudio}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'flex items-center gap-2 text-system transition-colors duration-300',
        enabled ? 'text-[--accent-lime]' : 'text-[--text-muted] hover:text-[--text-secondary]'
      )}
      aria-label={enabled ? 'Mute audio' : 'Enable audio'}
      title={enabled ? 'Mute audio' : 'Enable ambient audio'}
    >
      {/* Waveform bars */}
      <div className="flex items-end gap-[2px] h-3">
        {[4, 8, 6, 10, 5].map((h, i) => (
          <motion.div
            key={i}
            className="w-[2px] rounded-full"
            style={{ background: 'currentColor' }}
            animate={enabled ? {
              height: ['40%', '100%', '60%', '80%', '40%'],
            } : { height: `${(h / 10) * 40}%` }}
            transition={{
              duration: 0.6,
              repeat: enabled ? Infinity : 0,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span className="hidden md:inline">{enabled ? 'SOUND ON' : 'SOUND OFF'}</span>
    </motion.button>
  )
}

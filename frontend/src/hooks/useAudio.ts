'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useAudioStore } from '@/store'

// Howler is loaded lazily to avoid SSR issues
let Howl: any = null
let Howler: any = null

async function loadHowler() {
  if (Howl) return
  const mod = await import('howler')
  Howl    = mod.Howl
  Howler  = mod.Howler
}

interface AudioLayer {
  id:     string
  src:    string
  loop:   boolean
  volume: number
}

const AUDIO_LAYERS: AudioLayer[] = [
  { id: 'ambient', src: '/audio/ambient-hum.mp3',  loop: true,  volume: 0.06 },
  { id: 'hover',   src: '/audio/hover-click.mp3',  loop: false, volume: 0.3  },
  { id: 'select',  src: '/audio/select.mp3',        loop: false, volume: 0.4  },
  { id: 'boot',    src: '/audio/boot-sequence.mp3', loop: false, volume: 0.5  },
]

export function useAudio() {
  const { audio, toggleAudio, setVolume } = useAudioStore()
  const sounds = useRef<Record<string, any>>({})
  const ready  = useRef(false)

  /* Init Howler on first enable */
  useEffect(() => {
    if (!audio.enabled || ready.current) return

    const init = async () => {
      await loadHowler()
      if (!Howl) return

      AUDIO_LAYERS.forEach((layer) => {
        sounds.current[layer.id] = new Howl({
          src:    [layer.src],
          loop:   layer.loop,
          volume: layer.volume * audio.volume,
          preload: true,
          html5:  layer.loop, // use HTML5 audio for long ambient tracks
        })
      })

      // Start ambient on enable
      sounds.current.ambient?.play()
      ready.current = true
    }

    init()
  }, [audio.enabled, audio.volume])

  /* Mute/unmute on toggle */
  useEffect(() => {
    if (!ready.current || !Howler) return
    Howler.mute(!audio.enabled)
  }, [audio.enabled])

  /* Volume change */
  useEffect(() => {
    if (!ready.current || !Howler) return
    Howler.volume(audio.volume)
  }, [audio.volume])

  /* Cleanup */
  useEffect(() => {
    return () => {
      Object.values(sounds.current).forEach((s: any) => s?.unload?.())
    }
  }, [])

  const play = useCallback((id: string) => {
    if (!audio.enabled || !ready.current) return
    sounds.current[id]?.play()
  }, [audio.enabled])

  const stop = useCallback((id: string) => {
    sounds.current[id]?.stop()
  }, [])

  return { play, stop, toggleAudio, setVolume, enabled: audio.enabled }
}

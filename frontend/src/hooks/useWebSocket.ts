'use client'

import { useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { useNavStore } from '@/store'

let socket: Socket | null = null

function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000', {
      transports: ['websocket', 'polling'],
      autoConnect: false,
      reconnectionAttempts: 3,
      reconnectionDelay: 2000,
    })
  }
  return socket
}

/**
 * useWebSocket
 * Connects to the backend Socket.io server and:
 * - Tracks section enter/leave events for analytics
 * - Tracks project views
 * - Emits cursor position (throttled, opt-in)
 * - Exposes play() for one-off events
 */
export function useWebSocket(sessionId?: string) {
  const { nav } = useNavStore()
  const prevSection = useRef<string>('')
  const emitThrottle = useRef<number>(0)

  useEffect(() => {
    const s = getSocket()
    if (!s.connected) s.connect()

    s.on('connect',    () => console.log('[WS] connected'))
    s.on('disconnect', () => console.log('[WS] disconnected'))

    return () => {
      s.off('connect')
      s.off('disconnect')
    }
  }, [])

  /* Track active section changes */
  useEffect(() => {
    const s = getSocket()
    if (!s.connected) return

    const current = nav.activeSection
    if (current === prevSection.current) return

    if (prevSection.current) {
      s.emit('section:leave', { section: prevSection.current })
    }
    s.emit('section:enter', { section: current, sessionId: sessionId || 'anon' })
    prevSection.current = current
  }, [nav.activeSection, sessionId])

  const trackProject = useCallback((slug: string) => {
    const s = getSocket()
    if (s.connected) {
      s.emit('project:view', { slug, sessionId: sessionId || 'anon' })
    }
  }, [sessionId])

  const emitCursor = useCallback((x: number, y: number, section: string) => {
    const now = Date.now()
    if (now - emitThrottle.current < 50) return // throttle to 20/s
    emitThrottle.current = now
    const s = getSocket()
    if (s.connected) s.emit('cursor:move', { x, y, section })
  }, [])

  const ping = useCallback(() => {
    const s = getSocket()
    s.emit('system:ping')
    s.once('system:pong', (data) => console.log('[WS] pong', data))
  }, [])

  return { trackProject, emitCursor, ping }
}

export function disconnectSocket() {
  socket?.disconnect()
  socket = null
}

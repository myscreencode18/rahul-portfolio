import { Server as HTTPServer } from 'http'
import { Server as SocketServer, Socket } from 'socket.io'
import { AnalyticsService } from '../services/AnalyticsService.js'

const analytics = new AnalyticsService()

export function initWebSocket(httpServer: HTTPServer) {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: [
        process.env.FRONTEND_URL || 'http://localhost:3000',
        'https://rahulgupta.dev',
      ],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  })

  io.on('connection', (socket: Socket) => {
    console.log(`[WS] Client connected: ${socket.id}`)

    // ── Section tracking ───────────────────────────────────────────────────
    socket.on('section:enter', async ({ section, sessionId }: { section: string; sessionId: string }) => {
      await analytics.track({ event: 'section_enter', section, sessionId })
      socket.join(`section:${section}`)
    })

    socket.on('section:leave', ({ section }: { section: string }) => {
      socket.leave(`section:${section}`)
    })

    // ── Project tracking ───────────────────────────────────────────────────
    socket.on('project:view', async ({ slug, sessionId }: { slug: string; sessionId: string }) => {
      await analytics.track({ event: 'project_view', projectSlug: slug, sessionId })
    })

    // ── Live cursor presence (opt-in) ──────────────────────────────────────
    socket.on('cursor:move', (data: { x: number; y: number; section: string }) => {
      socket.to(`section:${data.section}`).emit('cursor:presence', {
        id: socket.id.slice(0, 6),
        ...data,
      })
    })

    // ── AI interaction tracking ───────────────────────────────────────────
    socket.on('ai:query', async ({ sessionId, query }: { sessionId: string; query: string }) => {
      await analytics.track({
        event: 'ai_query',
        sessionId,
        metadata: { queryLength: query.length },
      })
    })

    // ── System status broadcast ───────────────────────────────────────────
    socket.on('system:ping', () => {
      socket.emit('system:pong', {
        serverTime: Date.now(),
        uptime:     process.uptime(),
        status:     'operational',
      })
    })

    socket.on('disconnect', (reason) => {
      console.log(`[WS] Client disconnected: ${socket.id} (${reason})`)
    })
  })

  // Broadcast system status every 30s
  setInterval(() => {
    io.emit('system:status', {
      timestamp:  Date.now(),
      connectedClients: io.sockets.sockets.size,
      status: 'operational',
    })
  }, 30_000)

  return io
}

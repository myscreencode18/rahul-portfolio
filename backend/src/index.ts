import 'dotenv/config'
import { serve } from '@hono/node-server'
import { createServer } from 'http'
import { app } from './app.js'
import { initWebSocket } from './websocket/index.js'
import { connectRedis } from './db/redis.js'
import { connectDB } from './db/postgres.js'

const PORT = parseInt(process.env.PORT || '4000', 10)

async function bootstrap() {
  // Connect services
  await connectDB()
  await connectRedis()

  // Create HTTP server (needed for Socket.io)
  const httpServer = createServer()

  // Mount Hono as the request handler
  httpServer.on('request', (req, res) => {
    app.fetch(req as any, { env: process.env }).then((honoRes) => {
      res.writeHead(honoRes.status, Object.fromEntries(honoRes.headers))
      honoRes.text().then((body) => res.end(body))
    })
  })

  // Init WebSocket
  initWebSocket(httpServer)

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📡 WebSocket ready`)
    console.log(`🗄️  Database connected`)
    console.log(`⚡ Redis connected`)
  })
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})

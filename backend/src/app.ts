import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import { contactRouter }   from './routes/contact.js'
import { chatRouter }      from './routes/chat.js'
import { analyticsRouter } from './routes/analytics.js'
import { healthRouter }    from './routes/health.js'
import { rateLimiter }     from './middleware/rateLimiter.js'
import { errorHandler }    from './middleware/errorHandler.js'

export const app = new Hono()

// ── Middleware ──────────────────────────────────────────────────────────────

app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', secureHeaders())

app.use('*', cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://rahulgupta.dev',
    'https://www.rahulgupta.dev',
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Session-ID'],
  credentials: true,
}))

// Rate limiting per route group
app.use('/api/contact', rateLimiter({ windowMs: 60_000, max: 5 }))
app.use('/api/chat',    rateLimiter({ windowMs: 60_000, max: 20 }))
app.use('/api/*',       rateLimiter({ windowMs: 60_000, max: 100 }))

// ── Routes ──────────────────────────────────────────────────────────────────

app.route('/api/health',    healthRouter)
app.route('/api/contact',   contactRouter)
app.route('/api/chat',      chatRouter)
app.route('/api/analytics', analyticsRouter)

// ── 404 ─────────────────────────────────────────────────────────────────────

app.notFound((c) => c.json({ error: 'Route not found' }, 404))

// ── Error handler ────────────────────────────────────────────────────────────

app.onError(errorHandler)

export default app

import { MiddlewareHandler } from 'hono'
import { incrementRateLimit } from '../db/redis.js'

interface RateLimitOptions {
  windowMs: number  // milliseconds
  max:      number  // max requests per window
}

export function rateLimiter({ windowMs, max }: RateLimitOptions): MiddlewareHandler {
  const windowSec = Math.floor(windowMs / 1000)

  return async (c, next) => {
    const ip  = c.req.header('x-forwarded-for')?.split(',')[0]?.trim()
              || c.req.header('x-real-ip')
              || 'unknown'
    const key = `rl:${c.req.path}:${ip}`

    try {
      const count = await incrementRateLimit(key, windowSec)
      c.res.headers.set('X-RateLimit-Limit',     String(max))
      c.res.headers.set('X-RateLimit-Remaining', String(Math.max(0, max - count)))

      if (count > max) {
        return c.json({ error: 'Too many requests. Please slow down.' }, 429)
      }
    } catch {
      // If Redis is down, allow the request through
    }

    return next()
  }
}

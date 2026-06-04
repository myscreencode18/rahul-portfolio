import { Hono } from 'hono'
import { getPool } from '../db/postgres.js'
import { getRedis } from '../db/redis.js'

export const healthRouter = new Hono()

healthRouter.get('/', async (c) => {
  const checks: Record<string, 'ok' | 'error'> = {}

  // Check DB
  try {
    await getPool().query('SELECT 1')
    checks.db = 'ok'
  } catch { checks.db = 'error' }

  // Check Redis
  try {
    await getRedis().ping()
    checks.redis = 'ok'
  } catch { checks.redis = 'error' }

  const allOk = Object.values(checks).every((v) => v === 'ok')

  return c.json({
    status: allOk ? 'healthy' : 'degraded',
    checks,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  }, allOk ? 200 : 503)
})

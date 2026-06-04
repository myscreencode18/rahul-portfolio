import { Redis } from 'ioredis'

let redis: Redis | null = null

export async function connectRedis(): Promise<Redis> {
  if (redis) return redis

  redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: true,
  })

  redis.on('error', (err) => console.error('Redis error:', err))
  redis.on('connect', () => console.log('✅ Redis connected'))

  await redis.connect()
  return redis
}

export function getRedis(): Redis {
  if (!redis) throw new Error('Redis not connected')
  return redis
}

// ── Cache helpers ────────────────────────────────────────────────────────────

export async function cacheGet<T>(key: string): Promise<T | null> {
  const val = await getRedis().get(key)
  return val ? (JSON.parse(val) as T) : null
}

export async function cacheSet(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
  await getRedis().setex(key, ttlSeconds, JSON.stringify(value))
}

export async function cacheDel(key: string): Promise<void> {
  await getRedis().del(key)
}

// ── Rate limit helpers ───────────────────────────────────────────────────────

export async function incrementRateLimit(key: string, windowSeconds: number): Promise<number> {
  const r = getRedis()
  const count = await r.incr(key)
  if (count === 1) await r.expire(key, windowSeconds)
  return count
}

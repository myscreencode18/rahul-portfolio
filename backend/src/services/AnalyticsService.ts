import { db } from '../db/postgres.js'
import { analyticsEvents } from '../db/schema.js'
import { desc, count, eq, gte } from 'drizzle-orm'
import { cacheGet, cacheSet } from '../db/redis.js'

interface TrackPayload {
  event:       string
  section?:    string
  projectSlug?:string
  sessionId?:  string
  userAgent?:  string
  referrer?:   string
  metadata?:   Record<string, unknown>
}

export class AnalyticsService {
  async track(payload: TrackPayload) {
    await db.insert(analyticsEvents).values({
      event:       payload.event,
      section:     payload.section,
      projectSlug: payload.projectSlug,
      sessionId:   payload.sessionId,
      userAgent:   payload.userAgent,
      referrer:    payload.referrer,
      metadata:    payload.metadata,
    })
  }

  async getSummary() {
    const cacheKey = 'analytics:summary'
    const cached = await cacheGet(cacheKey)
    if (cached) return cached

    const [totalEvents] = await db
      .select({ count: count() })
      .from(analyticsEvents)

    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const [weeklyEvents] = await db
      .select({ count: count() })
      .from(analyticsEvents)
      .where(gte(analyticsEvents.createdAt, since7d))

    const result = {
      totalEvents: totalEvents.count,
      weeklyEvents: weeklyEvents.count,
      generatedAt: new Date().toISOString(),
    }

    await cacheSet(cacheKey, result, 60)
    return result
  }

  async getSectionEngagement() {
    const cacheKey = 'analytics:sections'
    const cached = await cacheGet(cacheKey)
    if (cached) return cached

    const rows = await db
      .select({ section: analyticsEvents.section, count: count() })
      .from(analyticsEvents)
      .groupBy(analyticsEvents.section)
      .orderBy(desc(count()))
      .limit(20)

    await cacheSet(cacheKey, rows, 120)
    return rows
  }
}

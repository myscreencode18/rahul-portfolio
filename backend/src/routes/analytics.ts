import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { AnalyticsService } from '../services/AnalyticsService.js'

export const analyticsRouter = new Hono()
const service = new AnalyticsService()

const eventSchema = z.object({
  event:       z.string().min(1).max(100),
  section:     z.string().optional(),
  projectSlug: z.string().optional(),
  sessionId:   z.string().optional(),
  metadata:    z.record(z.unknown()).optional(),
})

analyticsRouter.post('/', zValidator('json', eventSchema), async (c) => {
  const body      = c.req.valid('json')
  const userAgent = c.req.header('User-Agent') || undefined
  const referrer  = c.req.header('Referer') || undefined

  await service.track({ ...body, userAgent, referrer })
  return c.json({ ok: true })
})

analyticsRouter.get('/summary', async (c) => {
  const summary = await service.getSummary()
  return c.json(summary)
})

analyticsRouter.get('/sections', async (c) => {
  const data = await service.getSectionEngagement()
  return c.json(data)
})

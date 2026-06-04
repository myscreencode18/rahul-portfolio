import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { ContactService } from '../services/ContactService.js'

export const contactRouter = new Hono()
const service = new ContactService()

const contactSchema = z.object({
  name:        z.string().min(1).max(100),
  email:       z.string().email(),
  projectIdea: z.string().min(10).max(2000),
  budget:      z.string().optional(),
  timeline:    z.string().optional(),
})

contactRouter.post('/', zValidator('json', contactSchema), async (c) => {
  const body      = c.req.valid('json')
  const sessionId = c.req.header('X-Session-ID') || undefined
  const result    = await service.submit({ ...body, sessionId })
  return c.json({ success: true, id: result.id }, 201)
})

contactRouter.get('/', async (c) => {
  // Admin endpoint - in production add auth middleware
  const submissions = await service.getAll()
  return c.json(submissions)
})

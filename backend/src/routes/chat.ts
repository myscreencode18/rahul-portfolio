import { Hono } from 'hono'
import { stream } from 'hono/streaming'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { ChatService } from '../services/ChatService.js'

export const chatRouter = new Hono()
const service = new ChatService()

const messageSchema = z.object({
  role:    z.enum(['user', 'assistant']),
  content: z.string().min(1).max(4000),
})

const chatSchema = z.object({
  messages:  z.array(messageSchema).min(1).max(20),
  sessionId: z.string().optional(),
})

// Streaming chat endpoint
chatRouter.post('/stream', zValidator('json', chatSchema), async (c) => {
  const { messages, sessionId } = c.req.valid('json')

  return stream(c, async (streamCtx) => {
    try {
      const aiStream = await service.streamResponse(messages, sessionId)

      for await (const chunk of aiStream) {
        const text = chunk.choices[0]?.delta?.content || ''
        if (text) {
          await streamCtx.write(`data: ${JSON.stringify({ text })}\n\n`)
        }
      }
      await streamCtx.write('data: [DONE]\n\n')
    } catch (err) {
      await streamCtx.write(`data: ${JSON.stringify({ error: 'AI unavailable' })}\n\n`)
    }
  })
})

// Non-streaming for simple queries
chatRouter.post('/', zValidator('json', chatSchema), async (c) => {
  const { messages, sessionId } = c.req.valid('json')
  const response = await service.getResponse(messages, sessionId)
  return c.json({ response })
})

// Get chat history for session
chatRouter.get('/history/:sessionId', async (c) => {
  const { sessionId } = c.req.param()
  const history = await service.getHistory(sessionId)
  return c.json(history)
})

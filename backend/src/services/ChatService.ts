import OpenAI from 'openai'
import { db } from '../db/postgres.js'
import { chatMessages } from '../db/schema.js'
import { eq, asc } from 'drizzle-orm'
import { cacheGet, cacheSet } from '../db/redis.js'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `You are Rahul Gupta's intelligent portfolio assistant.

You help visitors understand:
- Rahul's engineering philosophy and capabilities
- His projects, architecture decisions, and outcomes
- His stack choices and reasoning behind them  
- His availability and how to collaborate

Be concise, technical, and confident. Don't pad answers.
Speak as though you know Rahul's work deeply — because you do.

KEY FACTS:
- Based in New Delhi, India (GMT+5:30)
- 3+ years full-stack engineering
- Specialties: Next.js, GSAP, Three.js, AI/LangChain, Node.js, React Native
- Philosophy: performance is design, motion communicates state
- Available for: full-time roles and select freelance
- Signature projects: PetVerse (12K MAU), ForgeOS, NeuralCommerce (+23% revenue)

If asked about something outside Rahul's portfolio, acknowledge it and redirect.`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export class ChatService {
  async streamResponse(messages: ChatMessage[], sessionId?: string) {
    const recentMessages = messages.slice(-10)

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...recentMessages,
      ],
      max_tokens: 600,
      temperature: 0.7,
      stream: true,
    })

    // Persist user message asynchronously
    if (sessionId && messages.length > 0) {
      const last = messages[messages.length - 1]
      this.persistMessage(sessionId, last.role, last.content).catch(console.error)
    }

    return stream
  }

  async getResponse(messages: ChatMessage[], sessionId?: string): Promise<string> {
    const cacheKey = `chat:${Buffer.from(JSON.stringify(messages.slice(-2))).toString('base64').slice(0, 40)}`
    const cached = await cacheGet<string>(cacheKey)
    if (cached) return cached

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-10),
      ],
      max_tokens: 600,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || ''
    await cacheSet(cacheKey, response, 300) // Cache 5 min

    if (sessionId) {
      await this.persistMessage(sessionId, 'assistant', response)
    }

    return response
  }

  async getHistory(sessionId: string): Promise<ChatMessage[]> {
    const rows = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(asc(chatMessages.createdAt))
      .limit(50)

    return rows.map((r) => ({
      role:    r.role as 'user' | 'assistant',
      content: r.content,
    }))
  }

  private async persistMessage(sessionId: string, role: string, content: string) {
    await db.insert(chatMessages).values({ sessionId, role, content })
  }
}

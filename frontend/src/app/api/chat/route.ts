// import { NextRequest, NextResponse } from 'next/server'
// import OpenAI from 'openai'

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// const SYSTEM_PROMPT = `You are Rahul Gupta's intelligent portfolio assistant — an AI guide built into his personal website.

// You help recruiters, clients, and collaborators understand:
// - Rahul's engineering capabilities and philosophy
// - His projects, architecture decisions, and tech stack
// - His availability and work preferences
// - His approach to full-stack, AI, and motion engineering

// Keep responses concise, technical, and confident. Speak as if you know Rahul deeply.
// When asked about projects, reference specific technical decisions and outcomes.
// When asked about skills, explain the "why" behind technology choices, not just a list.

// Rahul Gupta is:
// - A full-stack experience engineer based in New Delhi, India
// - Specializes in: Next.js, GSAP, Three.js, AI integrations, Node.js, React Native
// - Philosophy: performance is design, motion communicates state, complexity should be invisible
// - Available for full-time roles and select freelance projects
// - Current focus: AI-integrated web systems + cinematic frontend experiences`

// export async function POST(req: NextRequest) {
//   try {
//     const { messages } = await req.json()

//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
//     }

//     const stream = await openai.chat.completions.create({
//       model: 'gpt-4o-mini',
//       messages: [
//         { role: 'system', content: SYSTEM_PROMPT },
//         ...messages.slice(-10), // last 10 messages for context window
//       ],
//       max_tokens: 600,
//       temperature: 0.7,
//       stream: true,
//     })

//     // Stream response back
//     const encoder = new TextEncoder()
//     const readable = new ReadableStream({
//       async start(controller) {
//         for await (const chunk of stream) {
//           const text = chunk.choices[0]?.delta?.content || ''
//           if (text) {
//             controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
//           }
//         }
//         controller.enqueue(encoder.encode('data: [DONE]\n\n'))
//         controller.close()
//       },
//     })

//     return new Response(readable, {
//       headers: {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive',
//       },
//     })
//   } catch (error) {
//     console.error('Chat API error:', error)
//     return NextResponse.json(
//       { error: 'AI system temporarily unavailable.' },
//       { status: 500 }
//     )
//   }
// }


// import { NextRequest, NextResponse } from 'next/server'

// // ── Lazy client — only created at request time, never at build time ──────────
// function getOpenAI() {
//   const apiKey = process.env.OPENAI_API_KEY
//   if (!apiKey) {
//      return null
//   }
//   const OpenAI = require('openai').default
//   return new OpenAI({ apiKey })
// }

// const SYSTEM_PROMPT = `You are Rahul Gupta's intelligent portfolio assistant — an AI guide built into his personal website.

// You help recruiters, clients, and collaborators understand:
// - Rahul's engineering capabilities and philosophy
// - His projects, architecture decisions, and tech stack
// - His availability and work preferences
// - His approach to full-stack, AI, and motion engineering

// Keep responses concise, technical, and confident. Speak as if you know Rahul deeply.
// When asked about projects, reference specific technical decisions and outcomes.
// When asked about skills, explain the "why" behind technology choices, not just a list.

// Rahul Gupta is:
// - A full-stack experience engineer based in New Delhi, India
// - Specializes in: Next.js, GSAP, Three.js, AI integrations, Node.js, React Native, Flutter
// - Philosophy: performance is design, motion communicates state, complexity should be invisible
// - Available for full-time roles and select freelance projects
// - Current focus: AI-integrated web systems + cinematic frontend experiences
// - DevOps knowledge: Docker, Kubernetes, Jenkins, Ansible, Linux, GitHub Actions`

// // export async function POST(req: NextRequest) {
// //   // Return graceful fallback if no API key configured
// //   if (!process.env.OPENAI_API_KEY) {
// //     return NextResponse.json(
// //       { error: 'AI assistant not configured yet. Please reach out directly via the contact form.' },
// //       { status: 503 }
// //     )
// //   }

// //   try {
// //     const { messages } = await req.json()

// //     if (!messages || !Array.isArray(messages)) {
// //       return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
// //     }

// //     const openai = getOpenAI()

// //     const stream = await openai.chat.completions.create({
// //       model: 'gpt-4o-mini',
// //       messages: [
// //         { role: 'system', content: SYSTEM_PROMPT },
// //         ...messages.slice(-10),
// //       ],
// //       max_tokens: 600,
// //       temperature: 0.7,
// //       stream: true,
// //     })

// //     // Stream response back to client
// //     const encoder = new TextEncoder()
// //     const readable = new ReadableStream({
// //       async start(controller) {
// //         try {
// //           for await (const chunk of stream) {
// //             const text = chunk.choices[0]?.delta?.content || ''
// //             if (text) {
// //               controller.enqueue(
// //                 encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
// //               )
// //             }
// //           }
// //           controller.enqueue(encoder.encode('data: [DONE]\n\n'))
// //         } finally {
// //           controller.close()
// //         }
// //       },
// //     })

// //     return new Response(readable, {
// //       headers: {
// //         'Content-Type':  'text/event-stream',
// //         'Cache-Control': 'no-cache',
// //         'Connection':    'keep-alive',
// //       },
// //     })
// //   } catch (error) {
// //     console.error('Chat API error:', error)
// //     return NextResponse.json(
// //       { error: 'AI system temporarily unavailable.' },
// //       { status: 500 }
// //     )
// //   }
// // }

// export async function POST(req: NextRequest) {
//   const openai = getOpenAI()

//   if (!openai) {
//     return NextResponse.json(
//       { error: 'AI not configured' },
//       { status: 503 }
//     )
//   }

//   try {
//     const { messages } = await req.json()

//     const stream = await openai.chat.completions.create({
//       model: 'gpt-4o-mini',
//       messages: [
//         { role: 'system', content: SYSTEM_PROMPT },
//         ...messages.slice(-10),
//       ],
//       max_tokens: 600,
//       temperature: 0.7,
//       stream: true,
//     })

//     const encoder = new TextEncoder()

//     const readable = new ReadableStream({
//       async start(controller) {
//         for await (const chunk of stream) {
//           const text = chunk.choices[0]?.delta?.content || ''
//           if (text) {
//             controller.enqueue(
//               encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
//             )
//           }
//         }
//         controller.enqueue(encoder.encode('data: [DONE]\n\n'))
//         controller.close()
//       },
//     })

//     return new Response(readable, {
//       headers: {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         Connection: 'keep-alive',
//       },
//     })
//   } catch (err) {
//     return NextResponse.json(
//       { error: 'AI system error' },
//       { status: 500 }
//     )
//   }
// }




// import { NextRequest, NextResponse } from 'next/server'

// // Force dynamic — prevents Next.js from touching this route at build time
// export const dynamic = 'force-dynamic'
// export const runtime = 'nodejs'

// const SYSTEM_PROMPT = `You are Rahul Gupta's intelligent portfolio assistant.

// You help recruiters and collaborators understand:
// - Rahul's engineering capabilities and philosophy
// - His projects, architecture decisions, and tech stack
// - His availability and work preferences

// Rahul Gupta is:
// - A full-stack experience engineer based in New Delhi, India
// - Specializes in: Next.js, GSAP, Three.js, Node.js, React Native, Flutter
// - DevOps: Docker, Kubernetes, Jenkins, Ansible, Linux, GitHub Actions
// - Philosophy: performance is design, motion communicates state
// - Available for full-time roles and select freelance projects

// Keep responses concise, technical, and confident.`

// export async function POST(req: NextRequest) {
//   // Graceful fallback — no crash, no build error
//   if (!process.env.OPENAI_API_KEY) {
//     return NextResponse.json(
//       { error: 'AI assistant not configured. Please use the contact form.' },
//       { status: 503 }
//     )
//   }

//   try {
//     const { messages } = await req.json()

//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json(
//         { error: 'Invalid messages format' },
//         { status: 400 }
//       )
//     }

//     // Dynamic import — only runs at request time, never at build time
//     const { default: OpenAI } = await import('openai')
//     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

//     const stream = await openai.chat.completions.create({
//       model:       'gpt-4o-mini',
//       messages:    [
//         { role: 'system', content: SYSTEM_PROMPT },
//         ...messages.slice(-10),
//       ],
//       max_tokens:  600,
//       temperature: 0.7,
//       stream:      true,
//     })

//     const encoder = new TextEncoder()
//     const readable = new ReadableStream({
//       async start(controller) {
//         try {
//           for await (const chunk of stream) {
//             const text = chunk.choices[0]?.delta?.content || ''
//             if (text) {
//               controller.enqueue(
//                 encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
//               )
//             }
//           }
//           controller.enqueue(encoder.encode('data: [DONE]\n\n'))
//         } finally {
//           controller.close()
//         }
//       },
//     })

//     return new Response(readable, {
//       headers: {
//         'Content-Type':  'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection':    'keep-alive',
//       },
//     })

//   } catch (error) {
//     console.error('Chat API error:', error)
//     return NextResponse.json(
//       { error: 'AI system temporarily unavailable.' },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: 'AI assistant coming soon.' },
    { status: 503 }
  )
}
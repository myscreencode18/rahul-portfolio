import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, projectIdea, budget, timeline } = body

    // Validate
    if (!name || !email || !projectIdea) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Forward to backend API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000'
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, projectIdea, budget, timeline }),
    })

    if (!response.ok) {
      throw new Error('Backend submission failed')
    }

    return NextResponse.json({ success: true, message: 'Signal received.' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

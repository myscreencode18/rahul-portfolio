import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { event, section, projectSlug, sessionId } = body

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000'
    await fetch(`${backendUrl}/api/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        section,
        projectSlug,
        sessionId,
        timestamp: new Date().toISOString(),
        userAgent: req.headers.get('user-agent'),
        referrer: req.headers.get('referer'),
      }),
    })

    return NextResponse.json({ ok: true })
  } catch {
    // Silently fail — analytics should never break the user experience
    return NextResponse.json({ ok: false })
  }
}

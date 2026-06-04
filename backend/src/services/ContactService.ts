import nodemailer from 'nodemailer'
import { db } from '../db/postgres.js'
import { contacts } from '../db/schema.js'
import { desc } from 'drizzle-orm'

interface ContactPayload {
  name:        string
  email:       string
  projectIdea: string
  budget?:     string
  timeline?:   string
  sessionId?:  string
}

export class ContactService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  async submit(payload: ContactPayload) {
    // Save to DB
    const [record] = await db
      .insert(contacts)
      .values({
        name:        payload.name,
        email:       payload.email,
        projectIdea: payload.projectIdea,
        budget:      payload.budget,
        timeline:    payload.timeline,
        sessionId:   payload.sessionId,
        status:      'new',
      })
      .returning({ id: contacts.id })

    // Send notification email (non-blocking)
    this.sendNotification(payload).catch((err) =>
      console.error('Email notification failed:', err)
    )

    return record
  }

  async getAll() {
    return db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt))
      .limit(50)
  }

  private async sendNotification(payload: ContactPayload) {
    if (!process.env.SMTP_USER) return

    await this.transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to:      process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
      subject: `New inquiry from ${payload.name}`,
      html: `
        <div style="font-family: monospace; background: #0a0a0a; color: #f0ede8; padding: 32px; border-radius: 4px;">
          <h2 style="color: #C7FF3F; margin: 0 0 24px;">NEW SIGNAL RECEIVED</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #8a8a8a; width: 120px;">NAME</td><td style="color: #f0ede8;">${payload.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a8a8a;">EMAIL</td><td><a href="mailto:${payload.email}" style="color: #7AE7FF;">${payload.email}</a></td></tr>
            ${payload.budget ? `<tr><td style="padding: 8px 0; color: #8a8a8a;">BUDGET</td><td style="color: #f0ede8;">${payload.budget}</td></tr>` : ''}
            ${payload.timeline ? `<tr><td style="padding: 8px 0; color: #8a8a8a;">TIMELINE</td><td style="color: #f0ede8;">${payload.timeline}</td></tr>` : ''}
          </table>
          <div style="margin-top: 24px; padding: 16px; border: 1px solid #222; border-radius: 4px;">
            <div style="color: #8a8a8a; font-size: 11px; letter-spacing: 0.1em; margin-bottom: 8px;">PROJECT IDEA</div>
            <div style="color: #f0ede8; line-height: 1.6;">${payload.projectIdea}</div>
          </div>
        </div>
      `,
    })
  }
}

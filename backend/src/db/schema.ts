import {
  pgTable, text, timestamp, integer, boolean, jsonb, uuid, index
} from 'drizzle-orm/pg-core'

// ── Contact submissions ──────────────────────────────────────────────────────

export const contacts = pgTable('contacts', {
  id:          uuid('id').primaryKey().defaultRandom(),
  name:        text('name').notNull(),
  email:       text('email').notNull(),
  projectIdea: text('project_idea').notNull(),
  budget:      text('budget'),
  timeline:    text('timeline'),
  sessionId:   text('session_id'),
  status:      text('status').default('new'),
  createdAt:   timestamp('created_at').defaultNow().notNull(),
})

// ── Analytics events ─────────────────────────────────────────────────────────

export const analyticsEvents = pgTable('analytics_events', {
  id:          uuid('id').primaryKey().defaultRandom(),
  event:       text('event').notNull(),
  section:     text('section'),
  projectSlug: text('project_slug'),
  sessionId:   text('session_id'),
  userAgent:   text('user_agent'),
  referrer:    text('referrer'),
  metadata:    jsonb('metadata'),
  createdAt:   timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  sessionIdx: index('analytics_session_idx').on(table.sessionId),
  eventIdx:   index('analytics_event_idx').on(table.event),
  createdIdx: index('analytics_created_idx').on(table.createdAt),
}))

// ── Recruiter sessions ────────────────────────────────────────────────────────

export const recruiterSessions = pgTable('recruiter_sessions', {
  id:               uuid('id').primaryKey().defaultRandom(),
  sessionId:        text('session_id').unique().notNull(),
  sectionsViewed:   text('sections_viewed').array().default([]),
  projectsViewed:   text('projects_viewed').array().default([]),
  messagesExchanged:integer('messages_exchanged').default(0),
  intent:           text('intent').default('unknown'),
  totalTimeMs:      integer('total_time_ms').default(0),
  lastActive:       timestamp('last_active').defaultNow(),
  createdAt:        timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  sessionIdx: index('recruiter_session_idx').on(table.sessionId),
}))

// ── Chat messages ─────────────────────────────────────────────────────────────

export const chatMessages = pgTable('chat_messages', {
  id:        uuid('id').primaryKey().defaultRandom(),
  sessionId: text('session_id').notNull(),
  role:      text('role').notNull(),        // 'user' | 'assistant'
  content:   text('content').notNull(),
  tokens:    integer('tokens'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  sessionIdx: index('chat_session_idx').on(table.sessionId),
}))

-- Rahul Portfolio Database Schema
-- Run: psql $DATABASE_URL -f src/db/migrations/001_init.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact submissions
CREATE TABLE IF NOT EXISTS contacts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  project_idea TEXT NOT NULL,
  budget       TEXT,
  timeline     TEXT,
  session_id   TEXT,
  status       TEXT DEFAULT 'new',
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event        TEXT NOT NULL,
  section      TEXT,
  project_slug TEXT,
  session_id   TEXT,
  user_agent   TEXT,
  referrer     TEXT,
  metadata     JSONB,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS analytics_session_idx ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS analytics_event_idx   ON analytics_events(event);
CREATE INDEX IF NOT EXISTS analytics_created_idx ON analytics_events(created_at);

-- Recruiter sessions
CREATE TABLE IF NOT EXISTS recruiter_sessions (
  id                UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id        TEXT    UNIQUE NOT NULL,
  sections_viewed   TEXT[]  DEFAULT '{}',
  projects_viewed   TEXT[]  DEFAULT '{}',
  messages_exchanged INTEGER DEFAULT 0,
  intent            TEXT    DEFAULT 'unknown',
  total_time_ms     INTEGER DEFAULT 0,
  last_active       TIMESTAMPTZ DEFAULT NOW(),
  created_at        TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS recruiter_session_idx ON recruiter_sessions(session_id);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  role       TEXT NOT NULL,
  content    TEXT NOT NULL,
  tokens     INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS chat_session_idx ON chat_messages(session_id);

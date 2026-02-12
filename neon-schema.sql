-- ============================================================
-- FocusFlow Landing Page — Neon Postgres Schema
-- Run this in the Neon SQL Editor (console.neon.tech)
-- ============================================================

-- 1) Waitlist signups
CREATE TABLE IF NOT EXISTS waitlist (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name  TEXT NOT NULL,
  last_name   TEXT,
  email       TEXT NOT NULL UNIQUE,
  role        TEXT,
  challenge   TEXT,
  source      TEXT DEFAULT 'landing_page',
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist (created_at DESC);

-- 2) Feedback submissions
CREATE TABLE IF NOT EXISTS feedback (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT,
  rating      SMALLINT CHECK (rating BETWEEN 1 AND 5),
  features    TEXT,
  message     TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_feedback_created ON feedback (created_at DESC);

-- 3) Quick analytics view
CREATE OR REPLACE VIEW landing_stats AS
SELECT
  (SELECT COUNT(*) FROM waitlist)          AS total_signups,
  (SELECT COUNT(*) FROM waitlist
   WHERE created_at >= CURRENT_DATE)       AS signups_today,
  (SELECT COUNT(*) FROM waitlist
   WHERE created_at >= CURRENT_DATE - 7)   AS signups_this_week,
  (SELECT COUNT(*) FROM feedback)          AS total_feedback,
  (SELECT ROUND(AVG(rating)::numeric, 1)
   FROM feedback WHERE rating IS NOT NULL) AS avg_rating;

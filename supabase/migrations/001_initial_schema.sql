-- SB-01 Skill Bank Dashboard — Initial Schema
-- Run this in Supabase SQL Editor first, then run seed.sql

-- Reference: Roles
CREATE TABLE roles (
  slug          TEXT PRIMARY KEY,
  display_name  TEXT NOT NULL,
  phase         SMALLINT NOT NULL CHECK (phase BETWEEN 1 AND 3),
  cluster_name  TEXT NOT NULL,
  sort_order    SMALLINT NOT NULL
);

-- Reference: Task Categories
CREATE TABLE task_categories (
  slug          TEXT PRIMARY KEY,
  display_name  TEXT NOT NULL,
  layer         TEXT NOT NULL CHECK (layer IN ('Build', 'Operate', 'Quality', 'Support')),
  sort_order    SMALLINT NOT NULL
);

-- Reference: Format Types
CREATE TABLE format_types (
  slug          TEXT PRIMARY KEY,
  display_name  TEXT NOT NULL,
  sort_order    SMALLINT NOT NULL
);

-- Core: Skills
CREATE TABLE skills (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  skill_name      TEXT NOT NULL,
  description     TEXT NOT NULL,
  task_category   TEXT NOT NULL REFERENCES task_categories(slug),
  roles           TEXT[] NOT NULL,
  source_platform TEXT NOT NULL,
  format_type     TEXT NOT NULL REFERENCES format_types(slug),
  source_link     TEXT,
  quality_rating  SMALLINT NOT NULL CHECK (quality_rating BETWEEN 1 AND 3),
  phase           SMALLINT NOT NULL DEFAULT 1 CHECK (phase BETWEEN 1 AND 3),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  sheet_row_id    TEXT UNIQUE
);

CREATE INDEX idx_skills_roles ON skills USING GIN(roles);
CREATE INDEX idx_skills_task_category ON skills(task_category);
CREATE INDEX idx_skills_quality ON skills(quality_rating);
CREATE INDEX idx_skills_format_type ON skills(format_type);
CREATE INDEX idx_skills_phase ON skills(phase);

-- Sync log
CREATE TABLE sync_log (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  synced_at     TIMESTAMPTZ DEFAULT NOW(),
  rows_synced   INTEGER NOT NULL,
  rows_added    INTEGER NOT NULL DEFAULT 0,
  rows_updated  INTEGER NOT NULL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'success',
  error_message TEXT
);

-- RLS: public read-only
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE format_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read" ON roles FOR SELECT USING (true);
CREATE POLICY "Public read" ON task_categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON format_types FOR SELECT USING (true);
CREATE POLICY "Public read" ON sync_log FOR SELECT USING (true);

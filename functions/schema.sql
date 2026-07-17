-- D1 schema for the AI quiz generator (same key/value pattern as Quiz Hub).
-- The Functions self-create this table on first request, so running it manually
-- is optional — it's here for reference and for pre-seeding a fresh database.
--
-- Keys by prefix:
--   quiz:<id>        published quiz config (public)
--   meta:<id>        publisher IP / timestamp (private, never rendered)
--   index:published  homepage list of lightweight cards
--   rl:gen:<ip>:<day> per-IP daily generation counter
CREATE TABLE IF NOT EXISTS kv (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  expires_at INTEGER            -- unix seconds; NULL = never expires
);

CREATE INDEX IF NOT EXISTS idx_kv_key ON kv (key);

// Storage layer — D1-backed key/value store (same pattern as Quiz Hub).
// D1 free limits (~100k writes / ~5M reads per day) are far higher than KV's
// 1000 writes/day, so quiz publishing won't hit a wall. All data lives in a
// single `kv` table keyed by prefix (quiz:, index:published, rl:gen:*, meta:*).

let schemaReady = false;

async function ensureSchema(db) {
  if (schemaReady) return;
  // Runs ~once per isolate (isolates persist across requests). CREATE ... IF NOT
  // EXISTS is a no-op once the table is there, so no manual migration is needed.
  await db.prepare(
    'CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT NOT NULL, expires_at INTEGER)'
  ).run();
  schemaReady = true;
}

export function makeStore(env) {
  const db = env.DB;
  const nowSec = () => Math.floor(Date.now() / 1000);

  return {
    async get(key) {
      await ensureSchema(db);
      const row = await db.prepare('SELECT value, expires_at FROM kv WHERE key = ?').bind(key).first();
      if (!row) return null;
      if (row.expires_at && row.expires_at < nowSec()) return null;
      return row.value;
    },

    async put(key, value, ttlSeconds) {
      await ensureSchema(db);
      const exp = ttlSeconds ? nowSec() + ttlSeconds : null;
      await db
        .prepare('INSERT INTO kv (key, value, expires_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, expires_at = excluded.expires_at')
        .bind(key, value, exp)
        .run();
    },

    async delete(key) {
      await ensureSchema(db);
      await db.prepare('DELETE FROM kv WHERE key = ?').bind(key).run();
    },

    async list(prefix) {
      await ensureSchema(db);
      const escaped = prefix.replace(/[%_\\]/g, '\\$&');
      const { results } = await db
        .prepare("SELECT key FROM kv WHERE key LIKE ?1 ESCAPE '\\' AND (expires_at IS NULL OR expires_at > ?2)")
        .bind(escaped + '%', nowSec())
        .all();
      return { keys: (results || []).map((r) => ({ name: r.key })) };
    },
  };
}

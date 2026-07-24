// ============================================================================
// PostgreSQL (Neon) connection for serverless functions.
//
// DATABASE_URL lives ONLY in the server environment (Vercel project env
// vars). It is never bundled into the Vite/React build, so it can't leak
// into client-side JS — only files under /api ever import this module.
// ============================================================================
import pg from 'pg';

const { Pool } = pg;

let pool;

/**
 * Reuses a single Pool across warm serverless invocations (module scope
 * persists between invocations on the same instance). Neon's pooled
 * connection string (the "-pooler" host) means a small max is enough.
 */
export function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set in the server environment');
    }
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return pool;
}

export async function query(text, params) {
  return getPool().query(text, params);
}

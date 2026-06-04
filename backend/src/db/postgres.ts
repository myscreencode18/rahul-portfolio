import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema.js'

let pool: Pool | null = null
export let db: ReturnType<typeof drizzle>

export async function connectDB() {
  if (pool) return

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  })

  pool.on('error', (err) => {
    console.error('Unexpected DB error:', err)
  })

  // Test connection
  const client = await pool.connect()
  await client.query('SELECT 1')
  client.release()

  db = drizzle(pool, { schema })
  console.log('✅ PostgreSQL connected')
}

export function getPool() {
  if (!pool) throw new Error('Database not connected')
  return pool
}

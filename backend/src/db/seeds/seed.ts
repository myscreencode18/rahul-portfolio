import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../schema.js'

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const db   = drizzle(pool, { schema })

  console.log('Seeding database...')

  // Seed a test contact submission
  await db.insert(schema.contacts).values({
    name:        'Test Recruiter',
    email:       'test@company.com',
    projectIdea: 'We are looking for a full-stack engineer to lead our web platform rebuild.',
    budget:      '$150K–$180K',
    timeline:    'Immediate',
    status:      'new',
  }).onConflictDoNothing()

  console.log('✅ Seed complete')
  await pool.end()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

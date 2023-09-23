import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import type { D1Database } from '@cloudflare/workers-types'

import { users } from './schema'
import { eq } from 'drizzle-orm'

// This ensures c.env.DB is correctly typed
type Bindings = {
	DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => c.text('Hello Hono!'))

app.get('/users', async (c) => {
	const db = drizzle(c.env.DB)
	const result = await db.select().from(users).all()
	return c.json(result)
})

app.get('/users/:id', async (c) => {
	const db = drizzle(c.env.DB)
	const id = parseInt(c.req.param('id'))
	const result = await db.select().from(users).where(eq(users.id, id)).get()
	return c.json(result)
})

// Export our Hono app: Hono automatically exports a
// Workers 'fetch' handler for you
export default app

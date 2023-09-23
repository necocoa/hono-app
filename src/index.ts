import { Hono } from 'hono'
import type { D1Database } from '@cloudflare/workers-types'

// This ensures c.env.DB is correctly typed
type Bindings = {
	DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => c.text('Hello Hono!'))

// Accessing D1 is via the c.env.YOUR_BINDING property
app.get('/users/:id', async (c) => {
	const id = c.req.param('id')
	try {
		let { results } = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(id).all()
		return c.json(results)
	} catch (e) {
		return c.json({ err: e }, 500)
	}
})

// Export our Hono app: Hono automatically exports a
// Workers 'fetch' handler for you
export default app

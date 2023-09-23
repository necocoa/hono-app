## Dev start
```
bun install
bun run dev
```

```
open http://localhost:8787
```

## Deploy

```
bun run deploy
```

## Schema setup

local
```
bun run wrangler d1 execute hono-worker-sample --local --file=./schema.sql
```

production
```
bun run  wrangler d1 execute hono-worker-sample --file=./schema.sql
```

### Lookup db

local
```
bun run wrangler d1 execute hono-worker-sample --local --command="SELECT name FROM sqlite_master WHERE type='table'"
```

production
```
bun run wrangler d1 execute hono-worker-sample --command="SELECT name FROM sqlite_master WHERE type='table'"
```

# src/config/ — Environment and Configuration

## What belongs here

- `env.ts` — Zod schema that validates all environment variables at startup.

## What does NOT belong here

- Route handlers, middleware, or business logic.
- Actual secret values — those live in `.env` locally and in platform dashboards (Render/Vercel/GitHub Actions) for production.

## Rule

Import `env` from `./config/env` everywhere you need an environment variable.
**Never** read from `process.env` directly in application code — this bypasses validation and breaks TypeScript typing.

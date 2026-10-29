# tests/ — Automated Tests

## Structure

```
tests/
├── unit/          # Pure logic tests (streaks, validation schemas, utils)
└── integration/   # Full endpoint tests using Supertest + a test database
```

## What goes where

| Type | Folder | Tool | What to test |
|---|---|---|---|
| Unit | `unit/` | Vitest | Streak calculation, goal progress, Zod schema validation |
| Integration | `integration/` | Vitest + Supertest | HTTP endpoints, auth flow, ownership checks |

## CI database

Integration tests in CI use a **throwaway Postgres container** (GitHub Actions `services:`), never Supabase.
Set `DATABASE_URL` in the CI workflow to point at the container. See `.github/workflows/ci-backend.yml`.

## Running tests

```bash
npm test            # run all tests once (used in CI)
npm test -- --watch # watch mode for local dev
```

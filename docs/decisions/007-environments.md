# ADR 007 — Environments

**Status:** Accepted
**Date:** Phase 0

## Decision

Four environments:

| Environment | Frontend | Backend | Database |
|---|---|---|---|
| Local | `localhost:3000` | `localhost:4000` | Supabase `detox-dev` |
| CI | n/a | GitHub Actions runner | Throwaway Postgres container |
| Preview | Vercel preview URL (per PR) | Production backend (or none) | `detox-dev` |
| Production | Vercel production URL | Render service | Supabase `detox-prod` |

## Why separate dev and prod databases?

- A bad migration against dev does not take down production.
- Load testing, seed data, and schema experiments stay isolated.
- Practise the habit of treating production as sacred.

## Why a throwaway Postgres container in CI?

- CI tests must be fast, deterministic, and not depend on Supabase uptime.
- The container is destroyed after the job — no cleanup needed.
- No risk of polluting the real dev database with test data.

## Env variable rules

- Production secrets are entered only in Render / Vercel / GitHub dashboards.
- `.env.example` is the only env file in Git (dummy values + comments).
- `NEXT_PUBLIC_*` variables are visible in the browser — never put secrets there.
- Use different secret values for each environment (local, CI, production).

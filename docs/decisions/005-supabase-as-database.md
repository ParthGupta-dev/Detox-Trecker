# ADR 005 — Supabase as Managed PostgreSQL Only

**Status:** Accepted
**Date:** Phase 0

## Decision

Use Supabase **only as managed PostgreSQL**. Do not use:
- Supabase Auth
- Supabase Storage
- Supabase Realtime
- Supabase Data API (PostgREST / `anon` key)
- Supabase client SDK

## Why

1. **Learning goal:** This project exists to learn authentication from scratch.
   Using Supabase Auth would skip the lesson.
2. **Security principle:** The Data API auto-exposes tables to the internet via a public key.
   We avoid this entirely by using Prisma through the Postgres connection string.
3. **Simplicity:** Fewer moving parts, fewer keys, fewer things that can go wrong.

## Consequences

- Enable **Row Level Security (RLS)** on every table. With no policies, the `anon` and 
  `authenticated` roles (used by the Data API) get zero access.
- Never store the Supabase `anon` key or `service_role` key in this project.
- The Supabase dashboard is used for: viewing data, running SQL queries, getting connection strings.

## Connection strings (see ARCHITECTURE.md 3.1)

| | URL | Used for |
|---|---|---|
| `DATABASE_URL` | Pooled (Supavisor, port 6543) | Running app |
| `DIRECT_URL` | Direct (port 5432) | Prisma migrations |

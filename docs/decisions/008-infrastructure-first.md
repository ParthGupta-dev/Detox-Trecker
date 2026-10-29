# ADR 008 — Infrastructure First

**Status:** Accepted
**Date:** Phase 0

## Decision

Phase 0 sets up all infrastructure (GitHub, Vercel, Render, Supabase, env files, CI/CD, folder scaffold)
**before** any feature code is written.

## Why?

1. **Problems are cheaper to fix when the app is tiny.**
   CORS issues, env var problems, build errors, and deploy failures are much easier to debug
   on a 10-line skeleton than on a 1000-line feature.

2. **The full path is verified before committing to it.**
   Laptop → GitHub → CI → Vercel/Render → live URL.
   If anything in that chain is broken, we find out now.

3. **Every feature gets CI + CD from day one.**
   When Phase 3 code is merged, it is automatically deployed and tested by the same pipeline.
   No "I'll set up CI later" debt.

4. **Habits form early.**
   Branch → PR → CI → merge → deploy is the workflow from the first commit.
   This becomes natural by the time the code is complex.

## What "infrastructure first" allows

- Generator output (`create-next-app`, `npm init`)
- Config files, folder scaffolding
- CI/CD workflow files
- `.env.example` files
- Walking skeleton: one placeholder page + `GET /health` (~10 lines)

## What it forbids (until Phase 1+)

- Features, business logic
- Database tables, auth, Prisma models
- Any code that is not needed to prove the pipeline

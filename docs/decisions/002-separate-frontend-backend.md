# ADR 002 — Separate Frontend and Backend

**Status:** Accepted
**Date:** Phase 0

## Context

Next.js supports API routes, which could allow a single monorepo/monolith approach.
We chose a separate Express backend instead.

## Decision

Separate Next.js frontend (`/frontend`) from the Express backend (`/backend`).

## Reasons

1. **Learning goal:** The purpose of this project is to understand the client-server model properly.
   Running API logic inside Next.js would obscure that boundary.
2. **Independent deployability:** Frontend (Vercel) and backend (Render) deploy independently.
3. **Career relevance:** Most professional codebases separate frontend and backend.

## Consequences

- CORS must be configured correctly (cross-origin cookies need `SameSite=None; Secure` in production).
- Frontend uses `NEXT_PUBLIC_API_URL` to know where the backend is.
- Two `npm install` + two `npm run dev` to start locally.

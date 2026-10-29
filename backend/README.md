# Backend — Express + TypeScript API

This folder contains the Detox Tracker backend: a Node.js + Express server written in TypeScript.

## What belongs here

- `src/` — all application source code
- `prisma/` — Prisma schema and migration files (added in Phase 5)
- `tests/` — unit and integration tests
- `.env.example` — example environment variables (never commit `.env`)

## What does NOT belong here

- Frontend code (lives in `../frontend/`)
- Business secrets or database passwords (use `.env` locally; dashboards in production)
- Generated Prisma client files (they are `.gitignore`d; run `npx prisma generate` after cloning)

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start with hot-reload (uses `tsx`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled output (production) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest (unit + integration) |

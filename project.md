# Detox Tracker: Project Overview

> Single source of truth for *what this project is* and *where it stands*. Update the status section after every phase.

## What is it?

A personal productivity web app to log time across activities (social media, coding, study, exercise, other), set daily goals, build streaks, and see analytics, with the aim of reducing social media usage.

## Why am I building it?

- Learn how real web apps are designed: frontend, backend, database, auth, validation, testing, deployment.
- Practise Git and GitHub.
- Learn to think like a developer, not copy generated code.

It is a learning project first. Finishing it is secondary to understanding it.

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js + React + TypeScript + Tailwind CSS | Industry-standard UI stack |
| Backend | Node.js + Express + TypeScript | Lightweight, lets me learn backend fundamentals without much magic |
| Validation | Zod | Runtime validation of request data |
| Database | PostgreSQL (hosted on Supabase) | Relational data with constraints; Supabase is managed Postgres with a dashboard and SQL editor |
| ORM | Prisma | Schema + migrations + typed queries |
| Testing | Vitest, Supertest | Unit and API tests |
| API testing | Postman | Manual endpoint checks |
| Tools | Git, GitHub, VS Code | Version control and editor |
| CI/CD | GitHub Actions + Vercel/Render Git deploys | Automated checks and deploys from Phase 0 |
| Later | Docker | Only after the app is understood |
| Deploy | Vercel (frontend), Render (backend), Supabase (DB) | Verify current free-tier limits when deploying |

**Learning order:** HTML → CSS → JavaScript → TypeScript → React → Next.js → Tailwind.

## Repository Structure

```
detox-tracker/
├── frontend/        # Next.js app
├── backend/         # Express + TypeScript API
├── docs/            # Architecture notes, API docs, decision records (ADRs)
├── .github/         # CI/CD workflows, PR template, dependabot
├── README.md        # Setup + overview
├── PRD.md
├── project.md
├── ARCHITECTURE.md
├── BUILD_PLAN.md
├── rules.md
└── .gitignore
```

Add folders only when they become useful.

## Core Request Flow

```
Browser (Next.js) → HTTP request → Express → validate → business logic → Prisma → PostgreSQL
                  ← HTTP response ←
```

The frontend never talks to the database directly.

## Working Order

**Infrastructure before features.** In Phase 0 we create the GitHub repo, folder scaffold, Supabase projects, env files, live Render and Vercel services and the CI/CD pipeline. Only then do we start learning and building features, and every change reaches production through a pull request that passes CI.

## Environments

| Environment | Frontend | Backend | Database |
|---|---|---|---|
| Local | `localhost:3000` | `localhost:4000` | Supabase `detox-dev` |
| Preview | Vercel preview URL (per PR) | Production backend is NOT shared with previews unless configured; verify CORS | `detox-dev` or none |
| Production | Vercel production URL | Render service | Supabase `detox-prod` |
| CI tests | n/a | GitHub Actions runner | Postgres service container (throwaway) |

Live URLs (fill in after Phase 0):
- Frontend: _TBD_
- Backend `/health`: _TBD_

## CI/CD at a Glance

```
feature branch → push → PR → GitHub Actions (lint, typecheck, test, build)
   → Vercel preview deploy → review → merge to main
   → Vercel production deploy + Render deploy (+ DB migration job from Phase 5)
```

## Local Setup (to be filled in as phases complete)

```
# Prerequisites: Node.js (LTS), Git, a Supabase project (or local PostgreSQL), VS Code
# Backend:   cd backend  && npm install && npm run dev
# Frontend:  cd frontend && npm install && npm run dev
# Env files: copy .env.example to .env and fill in values (never commit .env)
#   DATABASE_URL = Supabase pooled connection string (used by the app)
#   DIRECT_URL   = Supabase direct connection string (used by Prisma migrations)
```

## Supabase: How We Use It

- We use Supabase **only as a managed PostgreSQL database**. Auth, storage, realtime and the auto-generated Data API are **not used**; authentication stays in our Express backend (this is the learning goal).
- The frontend never connects to Supabase directly, and the Supabase `service_role` key is never used or stored in this project.
- Prisma manages the schema through migrations; avoid editing tables by hand in the Supabase dashboard (except for read-only inspection and SQL practice).

## Conventions

- Branch per feature: `feat/activity-log-api`. Merge into `main` via PR, even when working solo.
- Commit style: `feat: add POST /api/logs validation`, `fix: ...`, `docs: ...`, `test: ...`, `chore: ...`.
- Names: `camelCase` variables/functions, `PascalCase` types/components, `UPPER_SNAKE` enum values and env vars.
- API base path: `/api`. JSON in, JSON out.

## Status Tracker

| Phase | Topic | Status |
|---|---|---|
| 0 | Infrastructure first: live services, env files, CI/CD, folder scaffold | Not started |
| 1 | HTTP and REST | In progress (concepts introduced) |
| 2 | Node and Express basics | Not started |
| 3 | First API (in-memory + Zod) | Not started |
| 4 | PostgreSQL and SQL | Not started |
| 5 | Prisma and persistence | Not started |
| 6 | Auth | Not started |
| 7 | Frontend (Next.js) | Not started |
| 8 | Goals, timer, streaks, dashboard | Not started |
| 9 | Analytics, tests, deployment, docs | Not started |

Statuses: Not started / In progress / Done. Only mark **Done** when it is actually working and tested.

## Learning Log

Keep a short note after each session:

- Date:
- What I learned:
- What confused me:
- What I built:
- Next step:

## Glossary (add as you learn)

- **API endpoint:** a URL + HTTP method that the backend exposes (e.g. `POST /api/logs`).
- **Middleware:** a function that runs between receiving a request and sending the response (e.g. `express.json()` parses the JSON body).
- **Persistence:** data that survives a server restart (needs a database).
- **Migration:** a versioned change to the database structure.

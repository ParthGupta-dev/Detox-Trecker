# Detox Tracker

A personal productivity web app to log time across activities (social media, coding, study, exercise), set daily goals, build streaks, and view analytics — with the goal of reducing social media usage.

> **This is a learning project.** Understanding every line matters more than finishing fast.

## Live URLs

> Fill in after Phase 0 deploy:
- **Frontend:** _TBD (Vercel)_
- **Backend `/health`:** _TBD (Render)_

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js + React + TypeScript + Tailwind CSS |
| Backend | Node.js + Express + TypeScript |
| Validation | Zod |
| Database | PostgreSQL (Supabase — managed Postgres only) |
| ORM | Prisma |
| Testing | Vitest + Supertest |
| CI/CD | GitHub Actions + Vercel + Render |

## Running Locally

**Prerequisites:** Node.js LTS, Git, VS Code, a Supabase project (`detox-dev`).

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/detox-tracker.git
cd detox-tracker

# 2. Backend
cd backend
cp .env.example .env        # Fill in real values (never commit .env)
npm install
npm run dev                 # Starts on http://localhost:4000

# 3. Frontend (new terminal)
cd frontend
cp .env.example .env.local  # Fill in real values
npm install
npm run dev                 # Starts on http://localhost:3000
```

## Environment Variables

See `backend/.env.example` and `frontend/.env.example` for all variables, with comments.
**Never commit `.env` files.** Production secrets go into Vercel / Render / GitHub dashboards only.

## Repository Structure

```
detox-tracker/
├── .github/          # CI workflows, PR template, Dependabot config
├── backend/          # Express + TypeScript API
├── frontend/         # Next.js app
├── docs/             # Architecture notes, API docs, ADRs, phase notes
├── README.md
├── .gitignore
└── (docs at root: project.md, ARCHITECTURE.md, BUILD_PLAN.md, rules.md)
```

## Development Workflow

```
feature branch → push → PR → GitHub Actions CI (lint + typecheck + test + build)
  → Vercel preview deploy → review → merge to main
  → Vercel prod deploy + Render deploy (+ DB migration job from Phase 5)
```

## Phase Status

See [`project.md`](./project.md) for the full phase tracker and learning log.

## Contributing / Working Solo

- Never push directly to `main`. Always use a PR.
- Write meaningful commit messages: `feat: add POST /api/logs validation`.
- See `rules.md` for the full working agreement.

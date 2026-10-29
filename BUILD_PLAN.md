# Detox Tracker: Phased Build Plan

**Order of work:** infrastructure first (Phase 0: live services, env files, CI/CD, folder scaffold), then fundamentals and features. Each phase has: **Learn → Build → Test → Checkpoint**. Do not move on until the checkpoint is satisfied. Every phase is delivered through a pull request that passes CI, and ends with an update to `project.md`. Because the pipeline exists from Phase 0, each merged phase is automatically deployed.

---

## Phase 0: Infrastructure First (Before Any Feature Code)

**Principle:** Set up everything the app will live on, and prove the full path (laptop → GitHub → CI → live URL) works **before** writing any feature code. Problems with accounts, env vars, CORS, builds and deploys are cheaper to fix when the app is tiny.

**What "no code" means here**
- Allowed: generator output (`create-next-app`, `npm init`), config files, folder scaffolding, CI/CD workflow files, `.env.example` files.
- Allowed as a **walking skeleton** (so there is something to deploy and verify): one placeholder page in the frontend and one `GET /health` route (about 10 lines) in the backend. These exist only to prove the pipeline. Their line-by-line explanation is taught in Phase 2.
- Not allowed yet: features, business logic, database tables, auth, Prisma models.

**Learn:** What each service does (GitHub, Vercel, Render, Supabase), environments (local / preview / production), environment variables and secrets, what CI and CD are, how a deploy is triggered, how to roll back.

### Step 0.1: Accounts and tools
- Accounts: GitHub, Vercel, Render, Supabase. Turn on **2FA** for all.
- Install: Node.js LTS, Git, VS Code, Postman.
- Set up a password manager for DB passwords and secrets.

### Step 0.2: Repository and Git rules
- Create the GitHub repo `detox-tracker` and clone it.
- Add `.gitignore` (`node_modules`, `.env*` except `.env.example`, build output) **before** the first commit.
- Enable GitHub **secret scanning** (and push protection if available).
- Protect `main`: require a pull request and passing CI checks before merge. (Branch protection on private repos may need a paid plan; verify. It is free on public repos. If unavailable, follow the rule by discipline.)
- Add `.github/pull_request_template.md` (what / why / how tested / checklist from `rules.md`).

### Step 0.3: Architectural directories (scaffold only)
- Create the full folder tree from `ARCHITECTURE.md` section 2 now, with a `.gitkeep` (Git doesn't track empty folders) and a short `README.md` in each major folder saying what belongs there and what doesn't.
- Add `docs/decisions/` with stub ADRs 001 to 007 (title + "status: pending").

### Step 0.4: Supabase projects (database host)
- Create **two** Supabase projects: `detox-dev` and `detox-prod` (verify the current free-tier project limit; if only one is allowed, use one project with separate schemas or accept the risk and be extra careful until you upgrade or switch).
- Pick a region close to your Render region.
- Save the database passwords in the password manager.
- Copy both connection strings per project: **pooled** (`DATABASE_URL`) and **direct** (`DIRECT_URL`). See `ARCHITECTURE.md` 3.1.
- In project settings, review Data API exposure of the `public` schema (we don't use it).
- Verify connectivity by running `select 1;` in the SQL Editor. **No tables yet.**

### Step 0.5: Environment files and secrets map
- Create `backend/.env.example` and `frontend/.env.example` with dummy values and comments (see the env matrix in `ARCHITECTURE.md` section 8).
- Create real `.env` files locally (gitignored) pointing at `detox-dev`.
- Fill the env matrix: for every variable, where it lives (local `.env`, GitHub Actions secrets, Render, Vercel) and which environment it belongs to.
- Rule: production secrets are typed only into the Render / Vercel / GitHub dashboards, never into a file in the repo.

### Step 0.6: Walking skeleton
- `backend/`: initialise a TypeScript Node project with Express, with a single `GET /health` returning `{ "status": "ok" }`. Add `dev`, `build`, `start`, `lint`, `typecheck`, `test` scripts (the test script can run with no tests passing-through until Phase 3).
- `frontend/`: generate a Next.js (TypeScript, Tailwind, App Router) app; replace the home page with a placeholder "Detox Tracker" heading.
- Run both locally and confirm they work.

### Step 0.7: Go live (first deploy)
- **Render** (backend): new Web Service from the GitHub repo; root directory `backend`; set build and start commands; health check path `/health`; add env vars (`NODE_ENV=production`, `FRONTEND_ORIGIN`, and later `DATABASE_URL`).
- **Vercel** (frontend): import the repo; root directory `frontend`; set `NEXT_PUBLIC_API_URL` to the Render URL.
- Open both live URLs and confirm: backend `/health` returns ok; frontend placeholder loads.
- Note the free-tier behaviour of Render (cold starts after inactivity). Verify current limits.
- Decide domain strategy now (default `*.vercel.app` + `*.onrender.com`; consider a custom domain later because cross-site cookies need care in Phase 6).

### Step 0.8: CI/CD pipelines
- **CI (GitHub Actions)**, runs on every pull request and on pushes to `main`:
  1. install dependencies (with caching)
  2. lint
  3. typecheck
  4. test (backend gets a **Postgres service container** for integration tests, not Supabase)
  5. build
  Use path filters so backend changes run backend jobs and frontend changes run frontend jobs.
- **CD**:
  - Vercel Git integration: every PR gets a **preview deployment**; merge to `main` deploys to production.
  - Render auto-deploy from `main`; prefer the setting that deploys only **after CI checks pass** (verify the option in Render's current UI).
  - **Database migrations** (activated in Phase 5): a `migrate.yml` workflow runs `prisma migrate deploy` against `detox-prod` using `DIRECT_URL` stored as a GitHub Actions secret, only on `main`, before/with the backend deploy. (Render's pre-deploy command is an alternative; verify plan availability.)
- Add `dependabot.yml` for dependency update PRs (optional but recommended).
- Store any CI secrets in **GitHub Actions secrets**; never echo them in logs.

### Step 0.9: Docs and verification
- Write `README.md` (what it is, live URLs, how to run locally) and update `project.md`.
- Practise a **rollback**: redeploy a previous version on Render and Vercel.

**Test (end-to-end pipeline drill):** create a branch, change the placeholder text, open a PR → CI turns green → Vercel preview URL shows the change → merge → production updates on both services. Then break something on purpose (e.g. a type error) and confirm CI blocks the merge.

**Checkpoint:**
- [ ] Both services are live and reachable; `/health` works in production.
- [ ] Supabase dev and prod projects exist; `select 1` works; no tables yet.
- [ ] `.env.example` files committed; real `.env` files and secrets are **not** in Git; env matrix filled.
- [ ] Folder scaffold and ADR stubs committed.
- [ ] CI runs on PRs and blocks a failing change; CD deploys on merge.
- [ ] I practised a rollback.
- [ ] I can explain: what CI is, what CD is, where each secret lives, why dev and prod databases are separate.

---

## Phase 1: HTTP and REST Fundamentals

**Learn:** URL, path, query params, headers, body, methods (GET/POST/PATCH/DELETE), status codes (200, 201, 400, 401, 404, 500), JSON, `fetch`, network error vs HTTP error.
**Build:** Nothing big. Use the browser console and a public test API to send requests; write notes in `docs/http-notes.md`.
**Exercise:** Describe `POST /api/logs` fully (URL, headers, body, success and error responses).

**Checkpoint:** I can explain a request/response without notes.

---

## Phase 2: Node.js and Express Basics

**Learn:** What Node is; Node vs browser JS; npm and `package.json`; Express; routes; `req`/`res`; middleware; `express.json()`; error-handling middleware; TypeScript setup basics.
**Build:**
- Backend project with TypeScript, `tsx`/`ts-node` dev script.
- Understand and rewrite the Phase 0 `GET /health` skeleton yourself, line by line (it was scaffolded in Phase 0; now you learn it properly). Add the real env validation (Zod) here.

**Test:** Hit `/health` in browser and Postman.
**Checkpoint:** Server starts, responds, and I can explain what each line of the server file does.

---

## Phase 3: First Real API (In-Memory + Validation)

**Learn:** Route design, in-memory storage (and why it's temporary), Zod schemas, consistent error format, separation of routes / validation / logic.
**Build:**
- `POST /api/logs` (validate with Zod; store in an array).
- `GET /api/logs`.
- Activity enum validation (`SOCIAL_MEDIA | CODING | STUDY | EXERCISE | OTHER`).

**Test:** Postman collection with valid and invalid cases. First Vitest/Supertest tests.
**Checkpoint:** Invalid input returns `400` with clear messages; restart wipes data (and I understand why).

---

## Phase 4: PostgreSQL and SQL

**Learn:** What Supabase is (managed Postgres + extras), connection pooling at beginner level, tables, rows, columns, primary/foreign keys, data types, constraints (`NOT NULL`, `CHECK`, `UNIQUE`), timestamps, `SELECT/INSERT/UPDATE/DELETE`, `WHERE`, `ORDER BY`, `GROUP BY`, `JOIN`, indexes.
**Build:**
- Create a free Supabase account and project (save the database password in a password manager, not in Git).
- Find the connection strings (Project → Connect). Note the difference between the **direct** connection and the **pooled** connection (explained in this phase).
- Hand-write SQL for `users` and `activity_logs` tables and practise queries in the Supabase **SQL Editor** (or `psql`/a GUI such as DBeaver).
- Learn what **Row Level Security (RLS)** is and why we still enable it (see ARCHITECTURE.md, section 3.1).

**Checkpoint:** I can write a query for "total minutes per category for user X today".

---

## Phase 5: Prisma and Persistence

**Learn:** What an ORM is; Prisma schema; migrations; Prisma Client; how Prisma maps to SQL; `.env`, `DATABASE_URL` (pooled) and `DIRECT_URL` (direct, for migrations).
**Build:**
- Prisma schema for `User` and `ActivityLog` (use a placeholder user for now).
- Configure `datasource` with both `url` (pooled) and `directUrl` (direct), then run the first migration against Supabase.
- Replace the in-memory array with Prisma calls.

- Enable the `migrate.yml` workflow from Phase 0 so migrations reach `detox-prod` through CI, never by running commands against prod from a laptop. Enable RLS on new tables.

**Test:** Create a log, restart the server, log is still there. Integration test against a test database.
**Checkpoint:** `201` only returned after a successful DB write.

---

## Phase 6: Authentication and Authorization

**Learn:** Authentication vs authorization; password hashing (argon2 or bcrypt); **sessions vs JWT trade-offs** (decide and record it in `docs/decisions/001-auth.md`); cookie attributes (HttpOnly, Secure, SameSite); CORS; rate limiting basics.
**Build:**
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`.
- Auth middleware protecting `/api/logs`.
- Logs scoped to `req.user.id`.

**Test:** User A cannot read, edit or delete user B's logs (write this as an automated test).
**Checkpoint:** Unauthenticated calls give `401`; cross-user access is blocked.

---

## Phase 7: Frontend with Next.js

**Learn:** HTML/CSS/JS recap, TypeScript for UI, React components/props/state/effects, Next.js routing, Tailwind, calling the API with `fetch`, CORS in practice.
**Build:**
- Pages: Register, Login, Logs.
- Activity log form with loading, success, validation-error and network-error states.
- Logs list with delete.

**Checkpoint:** Full flow works in the browser: register → login → add log → refresh → log still there.

---

## Phase 8: Goals, Focus Timer, Streaks, Dashboard

**Learn:** Aggregation queries, date/timezone handling, server-authoritative timers, computing streaks.
**Build (in this order, one at a time):**
1. Dashboard (today's totals per category).
2. Goals (target and limit) + progress.
3. Focus timer (`POST /api/sessions/start`, `POST /api/sessions/stop`, server-side timestamps).
4. Streak calculation (pure function, heavily unit-tested using the rules in the PRD).

**Checkpoint:** Streak unit tests cover: first day, consecutive days, a missed day, midnight boundary, different timezones.

---

## Phase 9: Analytics, Production Hardening, Docs

**Learn:** Charts, query performance and indexes, production configuration, logging and monitoring basics.
**Build:**
- Weekly/monthly summaries and a chart.
- Confirm RLS is enabled on all tables and the Data API exposure is reviewed (see ARCHITECTURE.md, 3.1).
- Security review checklist (see `rules.md`).
- Production hardening (deployment itself was done in Phase 0): re-verify current free-tier limits and pricing for Vercel, Render and Supabase; check cold-start behaviour, connection limits and backups; confirm production env vars; add basic request logging and uptime check on `/health`; test cross-site cookies end to end in production.
- Final README with screenshots, setup steps, API docs.

**Checkpoint:** Live app works end to end; CI green on `main`; no secrets in Git history; README lets a stranger run the project.

---

## After MVP (optional)

- Docker for local dev.
- CI with GitHub Actions (run tests on PR).
- Rebuild the backend in Java + Spring Boot as a separate learning exercise (keep the same API contract so the frontend works unchanged).
- Export data to CSV, dark mode, PWA.

## Scope Rules

- No new feature until the current phase's checkpoint is met.
- Anything not in the PRD's P0/P1 list waits until after Phase 9.

# rules.md: How We Work on Detox Tracker

These rules apply to **me (Kanishk)** and to **any AI assistant** helping with this project. Paste this file at the start of a new AI chat.

---

## A. Teaching Rules (for the AI assistant)

1. **Teach progressively, like I'm a beginner who wants to become a capable developer.** No giant code dumps or advanced theory at once.
2. For every new concept, follow this structure:
   1. What is it?
   2. Why does it exist?
   3. What problem does it solve?
   4. How does it work internally (beginner level)?
   5. How does it fit into Detox Tracker?
   6. A small practical example.
   7. Line-by-line explanation of the important code.
   8. Common mistakes and alternatives.
   9. A short question or small exercise for me.
   10. Review my answer/code, explain mistakes, then proceed.
3. Use **simple English with conversational Hinglish** where helpful. Explain every technical term the first time it appears.
4. Don't generate the whole project. Build **incrementally**; let me attempt each small task first.
5. Explain the *reasoning* behind design decisions, how pieces communicate, how to debug, and how to verify a feature works.
6. Correct my mistakes clearly and simply.
7. Continue from where we left off; don't restart explanations from zero.
8. Explain reasoning **before** adding any new dependency.

## B. Honesty Rules (for the AI assistant)

1. Never claim code has been **run, tested, deployed or saved** unless it actually has.
2. Never present incomplete code as a working feature. Mark placeholders clearly (e.g. `// TODO: save to database`).
3. A successful API response does **not** mean data is persisted. Only report success after the DB write succeeds.
4. If unsure, say so. Verify current pricing, free-tier limits and library versions before recommending them.
5. Don't switch frameworks or the stack without a concrete reason, explained first.

## C. Scope Rules

1. Follow `BUILD_PLAN.md` phase by phase. Don't skip ahead.
2. **Infrastructure first:** Phase 0 (live Vercel, Render and Supabase, env files, CI/CD, folder scaffold) must be complete and verified before any feature code. The only code allowed earlier is the walking skeleton (placeholder page + `GET /health`).
3. Keep the first version small and working.
4. **No** automatic screen-time detection in the MVP.
5. **No** microservices, Redis, Docker or advanced design patterns until the fundamentals are understood and there is a real need.
6. **No** Spring Boot in this project. It is a separate, later learning path.
7. Keep Express as the backend framework.
8. Use Supabase only as hosted PostgreSQL. Do not use Supabase Auth, Storage, Realtime or the client SDK in this project.

## D. Code Rules

1. TypeScript everywhere; avoid `any`. If used, leave a comment explaining why.
2. Small, focused functions with clear names. One job per function.
3. Separate concerns: routes → validation → business logic → data access.
4. Validate **all** external input on the server with Zod, even if the frontend validates too.
5. Handle errors on purpose: return the correct status code and a consistent JSON error shape:
   ```json
   { "error": { "code": "VALIDATION_ERROR", "message": "Minutes must be between 1 and 1440", "details": [] } }
   ```
6. No magic numbers or strings; use constants/enums.
7. Comments explain *why*, not *what*.
8. No dead code or commented-out blocks in commits.
9. Don't add a dependency without being able to say what problem it solves.

## E. Security Rules

1. Never store plaintext passwords; use a proper password-hashing algorithm (argon2 or bcrypt).
2. Never commit `.env`, secrets, database URLs or tokens. Commit `.env.example` with dummy values only.
3. Never expose DB credentials or auth secrets to frontend code.
4. The frontend never connects directly to the database (or to Supabase APIs).
5. Every protected route checks authentication **and** ownership (a user can only touch their own rows).
6. Cookies: `HttpOnly`, `Secure` (in production), appropriate `SameSite`.
7. CORS: allow only known origins, never `*` with credentials.
8. Login errors must be generic ("Invalid email or password").
9. Don't leak internals in error messages (no stack traces or SQL errors to the client).
10. Supabase: never commit the database password, connection strings, or any Supabase API key. Never use the `service_role` key. Enable RLS on every table.
11. If a secret is ever committed, rotate it immediately. Deleting the commit isn't enough.

## F. Git and GitHub Rules

1. `main` always works. Work on feature branches (`feat/...`, `fix/...`, `docs/...`).
2. Small commits with meaningful messages (`feat: validate activity enum with Zod`).
3. Open a PR for every feature, even solo; write a short description of what and why.
4. Commit after each working step, not at the end of the day.
5. Never commit `node_modules`, `.env` or build output.

## G. Testing Rules

1. A feature is **done** only when I have tested it manually (Postman/browser) **and** the important logic has automated tests.
2. Business logic (streaks, goal progress, validation) → unit tests with Vitest.
3. Endpoints → integration tests with Supertest.
4. Always test: valid input, invalid input, unauthenticated, wrong user, edge cases.
5. Fix the bug, then add a test that would have caught it.

## H. Debugging Rules (for me)

When something breaks, go in this order:
1. Read the **full** error message and the first line of the stack trace that points to my code.
2. Identify the layer: frontend, network, backend, or database.
3. Check the Network tab / Postman: what was sent, what status came back?
4. Check backend logs. Add temporary `console.log`s, and remove them afterwards.
5. Check the database directly to see what was actually saved.
6. Make **one** change at a time and re-test.
7. Only then ask for help, and include: what I expected, what happened, the exact error, and the relevant code.

## I. Learning Rules (for me)

1. Attempt each task myself before looking at the answer.
2. Type the code; don't just paste it.
3. If I can't explain a line, I don't move on.
4. After each phase: write a 5-line summary in my own words in `docs/`.
5. Update `project.md` status and learning log at the end of each session.
6. Done means: working, tested, committed, understood.

## J. Infrastructure, Environment and CI/CD Rules

1. Never push directly to `main`. Every change goes through a pull request with green CI.
2. Never deploy by hand from a laptop. Deploys happen through Git (Vercel/Render) and CI.
3. Never run migrations against the production database from a laptop. Production migrations run only through the CI workflow.
4. Local development uses the `detox-dev` database; production uses `detox-prod`. Never point a local `.env` at production.
5. Use different secret values for local, CI and production.
6. Production secrets are entered only in the Render, Vercel and GitHub dashboards.
7. Only `.env.example` files are committed, with dummy values and a comment per variable. Update it in the same PR that adds a new variable.
8. Any variable starting with `NEXT_PUBLIC_` is visible in the browser, so it must never hold a secret.
9. Tests in CI use a throwaway Postgres container, never Supabase.
10. A red CI is the top priority: fix it or revert before doing anything else.
11. Re-verify current free-tier limits, pause/cold-start behaviour and pricing of Vercel, Render and Supabase before depending on them.
12. When a pipeline step fails, read the log from the top, find the first error, and fix that one before rerunning.

## K. Definition of Done (per feature)

- [ ] Works end to end (UI → API → DB where applicable)
- [ ] Input validated and errors handled
- [ ] Auth/ownership enforced (if it touches user data)
- [ ] Tested manually and automatically
- [ ] No secrets or debug code committed
- [ ] Committed with a clear message; PR has green CI and is merged
- [ ] Deployed through the pipeline and checked on the live URL
- [ ] New env variables added to `.env.example`, the env matrix, and the platform dashboards
- [ ] README/docs updated if behaviour changed
- [ ] I can explain how it works

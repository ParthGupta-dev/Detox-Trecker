# ADR 006 — CI/CD Strategy

**Status:** Accepted
**Date:** Phase 0

## Decision

- **CI:** GitHub Actions — runs lint, typecheck, tests, build on every PR.
- **CD (Frontend):** Vercel Git integration — preview deploy per PR, production deploy on `main` merge.
- **CD (Backend):** Render auto-deploy from `main`.
- **DB Migrations:** `migrate.yml` GitHub Actions workflow — runs `prisma migrate deploy` against prod DB
  using `DIRECT_URL` stored as a GitHub Actions secret. Runs on `main` only. Enabled in Phase 5.

## Why CI must pass before merge

- Prevents broken code from reaching `main`.
- `main` always works — this is a rule from `rules.md`.
- Catching type errors, linting issues, and failing tests before merge is cheaper than fixing them in production.

## Why not deploy from laptop

- Reproducibility: CI runs the same steps every time on a clean environment.
- Auditability: GitHub Actions log shows exactly what was deployed and when.
- Safety: No one can accidentally `prisma migrate deploy` against production from a dev machine.

## Consequences

- Render's "deploy only after CI passes" setting should be enabled (verify in Render's current UI).
- Branch protection on `main` requires PR + passing CI before merge.
- Production `DIRECT_URL` is stored as a GitHub Actions secret, never in any file.

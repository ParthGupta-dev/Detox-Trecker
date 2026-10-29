# src/services/ — Business Logic

## What belongs here

Functions that implement the **business rules** of the application.
Services are called by route handlers and call Prisma (or, before Phase 5, the in-memory store).

Examples:
- `logs.service.ts` — create, list, update, delete activity logs
- `auth.service.ts` — register user, validate credentials
- `streaks.service.ts` — `computeStreak(goal, dailyTotals[], today, timezone)` → pure function
- `goals.service.ts` — create/update goals, calculate progress

## What does NOT belong here

- HTTP specifics (`req`, `res`) — those are in routes/
- Direct Prisma calls that aren't wrapped in business logic — keep Prisma calls close to the service that needs them for now; add a repository layer only when files get too big
- Validation — that's Zod schemas in `schemas/`

## Pure functions are best

Functions that take inputs and return outputs (with no side effects) are easiest to test.
The streak calculator is a perfect example: it takes data, returns a number — no DB call inside.

## Example shape

```ts
// services/logs.service.ts
export async function createLog(userId: string, input: CreateLogInput) {
  // business rule: a user can only log up to 24 hours (1440 min) per day
  // (the hard constraint is in the DB schema; this could add softer rules)
  return prisma.activityLog.create({
    data: { ...input, userId },
  });
}
```

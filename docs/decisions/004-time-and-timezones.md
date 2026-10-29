# ADR 004 — Time and Timezones

**Status:** Accepted
**Date:** Phase 0

## Decision

- Store **all timestamps in UTC** in the database.
- Compute "today" in the user's **own timezone** for streaks and daily totals.
- The user's timezone is stored in the `User.timezone` column (IANA format, e.g. `Asia/Kolkata`).

## Why UTC in the database?

- UTC has no daylight saving time (DST) ambiguity.
- Comparing timestamps across users in different timezones is trivial.
- It is the convention in every production system — learn it once, apply everywhere.

## Why convert to user timezone for "today"?

- If a user in `Asia/Kolkata` (UTC+5:30) logs at 11pm, that is still their "today",
  even though UTC has already flipped to the next day.
- Streaks and goal progress must match the user's lived experience, not UTC midnight.

## Implementation (Phase 8)

- Use a library for timezone-safe date arithmetic (e.g. `date-fns-tz` or `Temporal` when mature).
- `computeStreak` takes a `timezone` parameter and converts all timestamps before comparing dates.
- Never use `new Date().toLocaleDateString()` on the server — the server timezone is irrelevant.

## Consequences

- Every query that computes "today's logs" must receive the user's timezone.
- Timezone-aware unit tests are required (see BUILD_PLAN Phase 8 checkpoint).

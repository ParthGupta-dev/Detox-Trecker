# ADR 001 — Authentication Strategy: Sessions vs JWT

**Status:** Pending (decision to be made in Phase 6)
**Date:** TBD
**Decider:** Kanishk

## Context

We need to decide how to authenticate users across requests.
Two common approaches: server-side sessions (cookie + session store) vs JWTs (self-contained signed tokens).

## Decision

_To be filled in during Phase 6._

## Consequences

_To be filled in after the decision._

---

### Notes for Phase 6 (read before deciding)

| | Server-side sessions | JWT |
|---|---|---|
| Client holds | Session ID (random, opaque) | Token (contains user data, signed) |
| State lives | Server/DB session store | Inside the token |
| Logout/revoke | Easy — delete the session row | Hard — token is valid until expiry unless a denylist is maintained |
| Scaling | Needs shared session store if multiple servers | Stateless |
| Fit for this app | Good — single backend, single DB, simple | Works, but adds complexity we don't need |

Leaning: **server-side sessions in PostgreSQL**, sent as an `HttpOnly` cookie.

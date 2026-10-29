# ADR 003 — Express over NestJS

**Status:** Accepted
**Date:** Phase 0

## Context

NestJS is a popular, opinionated Node.js framework that adds decorators, DI, modules, and a lot of structure.
Express is minimal — just routing and middleware.

## Decision

Use **Express** for the backend.

## Reasons

1. **Fundamentals first:** Express is close to raw Node.js. Learning it teaches you what a framework actually does.
   NestJS hides too much behind magic decorators, which would be confusing at the learning stage.
2. **Less to learn at once:** NestJS adds TypeScript decorators, DI patterns, module system, and CLI — 
   all in addition to Node.js and HTTP. That's too much in parallel.
3. **Same job:** For a single-developer learning project with this scope, Express is more than enough.

## Consequences

- No automatic dependency injection — use simple imports and exported singleton instances.
- No built-in module system — keep to the layered folder structure (routes → services → lib).
- If the project scales to a team or grows in complexity, NestJS is a valid future migration.

# src/lib/ — Shared Utilities and Clients

## What belongs here

- `prisma.ts` — The singleton Prisma Client instance (added in Phase 5)
- Any other small utilities shared across the app (e.g. date helpers, error constructors)

## Why a singleton Prisma Client?

Prisma opens a database connection pool. If you create a new `PrismaClient()` in every file, you'll
open too many connections and exhaust the pool. The singleton pattern ensures one shared instance.

```ts
// lib/prisma.ts (added in Phase 5)
import { PrismaClient } from '@prisma/client';

// Use a global variable in development to survive hot-reloads (tsx watch).
// In production the module cache ensures this only runs once.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ['error'] });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

## What does NOT belong here

- Business logic — that goes in `services/`
- Validation schemas — that goes in `schemas/`

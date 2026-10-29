# src/schemas/ — Zod Validation Schemas

## What belongs here

Zod schemas that validate the shape and values of incoming request data.

Each schema corresponds to one API operation, e.g.:

- `createLog.schema.ts` — validates `POST /api/logs` body
- `createUser.schema.ts` — validates `POST /api/auth/register` body

## What does NOT belong here

- Business rules (e.g. checking if a user owns a log) — those go in `services/`
- Prisma models or database types — those live in `lib/prisma.ts` or are auto-generated

## Why validate on the server even if the frontend validates?

Frontend validation can be bypassed (e.g. via Postman or curl). The backend is the last line of defence.
Invalid input reaching the database layer can corrupt data or cause cryptic errors.
Zod gives us a single source of truth for what valid data looks like.

## Example

```ts
import { z } from 'zod';

export const createLogSchema = z.object({
  activity: z.enum(['SOCIAL_MEDIA', 'CODING', 'STUDY', 'EXERCISE', 'OTHER']),
  minutes: z.number().int().min(1).max(1440),
  note: z.string().max(280).optional(),
});

export type CreateLogInput = z.infer<typeof createLogSchema>;
```

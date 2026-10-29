# src/routes/ — Express Route Handlers

## What belongs here

Each file handles one resource area:

| File | Phase | Purpose |
|---|---|---|
| `auth.ts` | 6 | `POST /api/auth/register`, login, logout, me |
| `logs.ts` | 3 | `POST/GET/PATCH/DELETE /api/logs` |
| `goals.ts` | 8 | `PUT/GET/DELETE /api/goals/:activity` |
| `sessions.ts` | 8 | `POST /api/sessions/start`, stop, active |
| `dashboard.ts` | 8 | `GET /api/dashboard/today` |
| `streaks.ts` | 8 | `GET /api/streaks` |
| `analytics.ts` | 9 | `GET /api/analytics/summary` |

## What does NOT belong here

- Business logic — call a function from `services/`
- Validation schemas — those go in `schemas/`
- Database queries — those go through Prisma in `services/` or `lib/`

## Pattern

```ts
// routes/logs.ts
import { Router } from 'express';
const router = Router();

router.post('/', validate(createLogSchema), async (req, res, next) => {
  try {
    const log = await logsService.create(req.user!.id, req.body);
    res.status(201).json({ log });
  } catch (err) {
    next(err); // let the error handler middleware respond
  }
});

export default router;
```

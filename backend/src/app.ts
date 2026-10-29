/**
 * app.ts — Builds and exports the Express application.
 *
 * WHY this is separate from server.ts:
 *   - Tests can import `app` directly without starting a real HTTP listener.
 *   - server.ts is the only file that calls app.listen().
 *
 * What lives here:
 *   - Middleware registration (CORS, JSON parsing, request logger)
 *   - Route mounting
 *   - Error-handling middleware (must be last)
 *
 * What does NOT live here:
 *   - app.listen() — that's in server.ts
 *   - Business logic — that's in services/
 *   - Database access — that's in lib/ and repositories/
 */

import express from 'express';
import cors from 'cors';
import { env } from './config/env';

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────

// Parse JSON request bodies.
// Without this, req.body would be undefined for POST/PATCH requests.
app.use(express.json());

// CORS: allow requests only from the configured frontend origin.
// "credentials: true" is needed so cookies are sent cross-origin.
// We never use "*" with credentials — that's blocked by browsers.
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// ── Routes ─────────────────────────────────────────────────────────────────

// Health check — unauthenticated, used by Render to verify the service is up.
// Responds with { status: "ok" } and the environment name.
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: env.NODE_ENV });
});

// Future routes will be mounted here as the project grows, e.g.:
// app.use('/api/auth', authRouter);
// app.use('/api/logs', logsRouter);

// ── Error-handling middleware ───────────────────────────────────────────────
// Must be registered LAST — Express identifies error handlers by their 4-parameter signature.
// This is a placeholder; the real handler will be added in Phase 2.
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction
  ) => {
    console.error(err.stack);
    res
      .status(500)
      .json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong.' } });
  }
);

export default app;

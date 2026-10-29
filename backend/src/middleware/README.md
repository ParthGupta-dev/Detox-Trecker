# src/middleware/ — Express Middleware

## What belongs here

- `auth.ts` — Session/JWT authentication middleware (Phase 6)
- `errorHandler.ts` — Centralized error-handling middleware (Phase 2)
- `validate.ts` — Generic Zod validation middleware factory (Phase 3)

## What does NOT belong here

- Business logic — that goes in `services/`
- Route definitions — those go in `routes/`
- Database access — that goes in `lib/` or repositories

## How middleware works

Middleware is a function that runs **between** receiving a request and sending a response.
It has access to `req`, `res`, and `next`. Call `next()` to pass to the next middleware, or `next(error)` to jump to the error handler.

```ts
// Example shape of a middleware function:
function myMiddleware(req: Request, res: Response, next: NextFunction) {
  // do something
  next(); // pass to the next middleware or route handler
}
```

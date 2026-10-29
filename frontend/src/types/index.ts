/**
 * types/index.ts — Shared TypeScript types for the frontend.
 *
 * These types mirror the shapes returned by the backend API.
 * Keep them in sync as the API evolves.
 *
 * Phase 0: Empty — types will be added as API endpoints are built.
 */

// Activity enum — must match the backend Zod schema and Prisma enum
export type Activity = 'SOCIAL_MEDIA' | 'CODING' | 'STUDY' | 'EXERCISE' | 'OTHER';

// TODO (Phase 3+): Add types as we build each feature
// export interface ActivityLog { ... }
// export interface User { ... }
// export interface Goal { ... }

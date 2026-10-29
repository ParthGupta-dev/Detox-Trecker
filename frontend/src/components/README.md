# src/components/ — Reusable React Components

## What belongs here

Shared UI components used across multiple pages:

| Component | Phase | Purpose |
|---|---|---|
| `ActivityForm.tsx` | 7 | Form to create a new activity log |
| `LogsList.tsx` | 7 | Renders a list of activity logs |
| `GoalCard.tsx` | 8 | Shows a goal with progress bar |
| `FocusTimer.tsx` | 8 | Countdown/count-up focus session UI |
| `StreakBadge.tsx` | 8 | Shows current streak count |
| `Chart.tsx` | 9 | Weekly/monthly analytics chart |

## What does NOT belong here

- Page-level components (those go in `src/app/`)
- API calls (those go in `src/lib/api.ts`)
- Global state management (keep it simple with React state for now)

## Convention

Each component gets its own file. Name it with PascalCase (`ActivityForm.tsx`).
Props interfaces are defined in the same file unless shared — then move them to `src/types/`.

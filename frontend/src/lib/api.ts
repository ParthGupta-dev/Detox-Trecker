/**
 * lib/api.ts — The single place that wraps all fetch() calls to the backend.
 *
 * WHY centralise API calls here:
 *   - If the backend URL or auth header changes, we update ONE file.
 *   - All requests get consistent error handling.
 *   - Components stay clean — they call a function like `api.getLogs()`,
 *     not raw fetch() with repeated boilerplate.
 *
 * This file will grow as new API endpoints are added in later phases.
 * For Phase 0, it only exports the base URL and a helper fetch wrapper.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

/**
 * A thin wrapper around fetch that:
 * - Prepends the API base URL
 * - Includes credentials (cookies) by default
 * - Throws an error if the response is not OK
 */
export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include', // send cookies for session auth
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    // Try to parse the backend's error JSON; fall back to a generic message
    const body = await res.json().catch(() => ({}));
    throw new Error(
      body?.error?.message ?? `Request failed with status ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}

// TODO (Phase 3+): Add typed API functions here, e.g.:
// export const logsApi = {
//   create: (data: CreateLogInput) =>
//     apiFetch<{ log: ActivityLog }>('/api/logs', { method: 'POST', body: JSON.stringify(data) }),
//   list: () => apiFetch<{ logs: ActivityLog[] }>('/api/logs'),
// };

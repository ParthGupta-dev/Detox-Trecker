/**
 * Home page — Walking skeleton placeholder (Phase 0).
 *
 * This page exists ONLY to prove the pipeline works end-to-end
 * (laptop → GitHub → CI → Vercel → live URL).
 *
 * It will be replaced in Phase 7 with the real dashboard.
 *
 * WHY a placeholder and not a blank page:
 *   - We need something to deploy so we can verify the Vercel pipeline.
 *   - It gives us a test case for the "pipeline drill" in Phase 0.
 */

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Detox Tracker
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Infrastructure is being set up. Features coming soon.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Phase 0 — Walking skeleton · Check backend{' '}
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/health`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            /health
          </a>
        </p>
      </div>
    </main>
  );
}

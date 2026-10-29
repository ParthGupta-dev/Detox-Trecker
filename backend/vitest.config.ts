import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Run tests sequentially within integration tests (they share a DB)
    // Unit tests can run in parallel (they're pure functions)
    globals: true,
    environment: 'node',
    // Test file discovery
    include: ['tests/**/*.test.ts'],
    // Timeout per test (in ms)
    testTimeout: 10000,
  },
});

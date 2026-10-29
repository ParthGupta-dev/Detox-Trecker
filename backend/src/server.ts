/**
 * server.ts — The entry point. Imports the built app and starts listening.
 *
 * WHY this is separate from app.ts:
 *   - Tests import app.ts directly without binding to a port.
 *   - This file is the only place that calls app.listen().
 */

import app from './app';
import { env } from './config/env';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`✅  Backend running on http://localhost:${PORT} [${env.NODE_ENV}]`);
});

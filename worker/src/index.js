/**
 * Cloudflare Worker entry point for the Alter Phase Roofing chat assistant.
 * All logic lives in lib.js. (Workers only allow handler objects as exports from the entry module,
 * so the testable helpers are exported from lib.js instead of here.)
 */
import { handleFetch } from './lib.js';

export default { fetch: handleFetch };

/**
 * True when a request's Origin header names a different site than its Host.
 * A missing Origin (same-origin GETs, server-to-server calls) is not cross-origin;
 * an Origin that is not a URL, such as the literal "null" a sandboxed frame sends,
 * cannot be shown to match and is treated as cross-origin.
 */
export function isCrossOrigin(origin: string | null, host: string | null): boolean {
  if (!origin) return false;
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

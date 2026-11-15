type RateLimitEntry = {
  timestamps: number[];
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_ENTRIES = 5000;

const store = new Map<string, RateLimitEntry>();

/** Extracts the best-effort client IP from standard proxy headers. */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

function pruneStaleEntries(now: number) {
  const cutoff = now - WINDOW_MS;
  for (const [key, entry] of store) {
    const recent = entry.timestamps.filter((ts) => ts > cutoff);
    if (recent.length === 0) {
      store.delete(key);
    } else {
      entry.timestamps = recent;
    }
  }
}

/** Sliding-window per-key rate limiter for lightweight API abuse protection. */
export function checkRateLimit(
  key: string,
  now = Date.now(),
): { allowed: boolean; retryAfterSeconds: number } {
  const cutoff = now - WINDOW_MS;
  const existing = store.get(key);
  const recent = existing
    ? existing.timestamps.filter((ts) => ts > cutoff)
    : [];

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + WINDOW_MS - now) / 1000),
    );
    store.set(key, { timestamps: recent });
    return { allowed: false, retryAfterSeconds };
  }

  if (!existing && store.size >= MAX_ENTRIES) {
    pruneStaleEntries(now);
    if (store.size >= MAX_ENTRIES) {
      const firstKey = store.keys().next().value;
      if (firstKey !== undefined) {
        store.delete(firstKey);
      }
    }
  }

  recent.push(now);
  store.set(key, { timestamps: recent });
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Clears in-memory rate-limit state (intended for tests). */
export function resetRateLimitStore() {
  store.clear();
}

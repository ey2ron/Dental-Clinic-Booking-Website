interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * In-memory sliding window rate limiter
 * Enforces limits on submissions per IP address
 * @param ip Client IP address or unique identifier
 * @param limit Maximum allowed requests within the duration window (default: 5)
 * @param durationMs Window duration in milliseconds (default: 15 minutes = 900,000ms)
 */
export function checkRateLimit(
  ip: string,
  limit: number = 5,
  durationMs: number = 900000 // 15 minutes per plan.md Section 4.2
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Periodic cleanup if map grows too large
  if (rateLimitStore.size > 10000) {
    for (const [key, val] of rateLimitStore.entries()) {
      if (val.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || record.resetAt < now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + durationMs,
    });
    return {
      success: true,
      remaining: limit - 1,
      reset: Math.ceil((now + durationMs) / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      reset: Math.ceil(record.resetAt / 1000),
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    reset: Math.ceil(record.resetAt / 1000),
  };
}

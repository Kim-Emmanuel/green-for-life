// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Use a proper storage solution for production
const rateLimit = new Map<string, number[]>();
const CLEANUP_INTERVAL = 60 * 1000; // Cleanup every minute
let lastCleanup = Date.now();

// Rate limit configuration
const RATE_LIMIT = {
  WINDOW_MS: 60 * 1000, // 1 minute
  MAX_REQUESTS: 5,
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to send API endpoint
  if (pathname.startsWith("/api/send")) {
    // Get client IP with proper reverse proxy support
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Periodic cleanup to prevent memory leaks
    const now = Date.now();
    if (now - lastCleanup > CLEANUP_INTERVAL) {
      rateLimit.forEach((timestamps, key) => {
        const filtered = timestamps.filter(
          (ts) => ts > now - RATE_LIMIT.WINDOW_MS
        );
        // Fixed the ternary expression error
        if (filtered.length) {
          rateLimit.set(key, filtered);
        } else {
          rateLimit.delete(key);
        }
      });
      lastCleanup = now;
    }

    // Get existing timestamps
    const timestamps = rateLimit.get(ip) || [];
    const recentRequests = timestamps.filter(
      (ts) => ts > now - RATE_LIMIT.WINDOW_MS
    );

    // Check rate limit
    if (recentRequests.length >= RATE_LIMIT.MAX_REQUESTS) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil(
            (recentRequests[0] + RATE_LIMIT.WINDOW_MS - now) / 1000
          ),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(
              Math.ceil((recentRequests[0] + RATE_LIMIT.WINDOW_MS - now) / 1000)
            ),
          },
        }
      );
    }

    // Update rate limit
    rateLimit.set(ip, [...recentRequests, now]);
  }

  return NextResponse.next();
}
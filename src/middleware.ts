import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Neon enforces a 5-second connection timeout
  // Set a custom timeout for specific routes if needed
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-middleware-cache', 'no-cache')
 
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
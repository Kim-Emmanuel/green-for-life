// src/app/api/auth/check/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth/middleware'

export async function GET(request: NextRequest) {
  const authResult = await verifyAuth(request)  // Remove ADMIN requirement
  
  if (authResult.error) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status }
    )
  }
  
  return NextResponse.json({
    authenticated: true,
    user: authResult.user
  })
}
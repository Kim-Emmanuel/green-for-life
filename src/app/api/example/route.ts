import { NextResponse } from 'next/server'
import { prisma, withDB } from '@/lib/db'

export async function GET() {
  try {
    const users = await withDB(() => 
      prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          role: true
        }
      })
    )
    
    return NextResponse.json({ users })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
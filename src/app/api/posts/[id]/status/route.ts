import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { verifyAuth } from '@/lib/auth/middleware';
import { z } from 'zod';
import { PostStatus } from '@prisma/client';

const statusSchema = z.object({
  status: z.nativeEnum(PostStatus),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResponse = await verifyAuth(request, 'ADMIN');
  if (authResponse.error || !authResponse.user) {
    return NextResponse.json(
      { error: authResponse.error || 'Unauthorized' },
      { status: authResponse.status || 401 }
    );
  }

  try {
    const data = statusSchema.parse(await request.json());
    
    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        status: data.status,
        published_at: data.status === 'PUBLISHED' ? new Date() : null,
      },
      include: {
        author: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
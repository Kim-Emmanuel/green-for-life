import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { verifyAuth } from '@/lib/auth/middleware';
import { z } from 'zod';
import { PostCategory } from '@prisma/client';

const updatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.nativeEnum(PostCategory),
  featured_image: z.string().url().optional().nullable(),
  file_attachment: z.string().url().optional().nullable(),
  apply_url: z.string().url().optional().nullable(),
  location: z.string().optional().nullable(),
  deadline: z.string().datetime().optional().nullable(),
});

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await verifyAuth(request, 'ADMIN');
  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { error: authResult.error || 'Unauthorized' },
      { status: authResult.status || 401 }
    );
  }

  try {
    // Resolve params first
    const { id } = await Promise.resolve(params);
    
    const data = updatePostSchema.parse(await request.json());

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        featured_image: data.featured_image || null,
        file_attachment: data.file_attachment || null,
        apply_url: data.apply_url || null,
        location: data.location || null,
        deadline: data.deadline ? new Date(data.deadline) : null,
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
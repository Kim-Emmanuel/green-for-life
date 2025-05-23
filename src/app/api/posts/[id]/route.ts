import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { verifyAuth } from "@/lib/auth/middleware";
import { z } from "zod";
import { PostCategory } from "@prisma/client";

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

// Updated GET handler with correct Next.js 15 type definitions
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: "Missing post ID" },
        { status: 400 }
      );
    }

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

    return post
      ? NextResponse.json({ post })
      : NextResponse.json({ error: "Post not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const authResult = await verifyAuth(request, "ADMIN");
  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { error: authResult.error || "Unauthorized" },
      { status: authResult.status || 401 }
    );
  }

  try {
    const id = await params.id;
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
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

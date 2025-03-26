import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { verifyAuth } from '@/lib/auth/middleware';
import { z } from 'zod';
import { PostCategory, PostStatus } from '@prisma/client';

const urlOrPathSchema = z.string().refine(
  (value) => {
    // Allow empty string since it's optional
    if (!value) return true;
    // Allow absolute URLs
    try {
      new URL(value);
      return true;
    } catch {
      // Allow relative paths starting with /
      return value.startsWith('/');
    }
  },
  { message: "Must be a valid URL or a relative path starting with '/'" }
);

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.nativeEnum(PostCategory, { errorMap: () => ({ message: "Invalid category" }) }),
  status: z.nativeEnum(PostStatus).default(PostStatus.DRAFT),
  featured_image: urlOrPathSchema.optional(),
  file_attachment: urlOrPathSchema.optional(),
  apply_url: z.string().url({ message: "Apply URL must be a valid URL" }).optional(),
  location: z.string().optional(),
  deadline: z.string().datetime({ message: "Deadline must be a valid date and time" }).optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category')?.toUpperCase();
  
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        ...(category && { category: category as PostCategory }),
      },
      include: {
        author: {
          select: {
            username: true,
            email: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Log the request for debugging
  console.log("Received POST request to /api/posts");
  
  const authResult = await verifyAuth(request, 'ADMIN');
  if (authResult.error || !authResult.user) {
    return NextResponse.json(
      { error: authResult.error || 'Unauthorized' },
      { status: authResult.status || 401 }
    );
  }

  let requestData;
  try {
    requestData = await request.json();
    console.log("Request data:", requestData);
  } catch (error) {
    console.error("Error parsing request JSON:", error);
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }

  try {
    // Validate the data with Zod
    const data = postSchema.parse(requestData);
    
    const user = await prisma.user.findFirst({
      where: { id: authResult.user.id }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        status: data.status,
        author_id: user.id,
        featured_image: data.featured_image,
        file_attachment: data.file_attachment,
        apply_url: data.apply_url,
        location: data.location,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
      },
    });

    console.log("Post created successfully:", post);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    
    if (error instanceof z.ZodError) {
      // Format Zod errors into a more client-friendly format
      const errorMessages = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join(', ');
      
      console.log("Validation errors:", errorMessages);
      
      return NextResponse.json(
        { error: `Validation error: ${errorMessages}` }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
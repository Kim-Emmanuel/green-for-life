import { NextResponse } from 'next/server';
import { PostCategory } from '@prisma/client';

export async function GET() {
  const categories = Object.values(PostCategory).map(category => ({
    id: category,
    name: category.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '),
    value: category
  }));

  return NextResponse.json({ categories });
}
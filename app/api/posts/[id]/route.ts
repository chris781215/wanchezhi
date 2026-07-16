import { NextResponse } from 'next/server';
import { mockPosts } from '@/lib/mock-data';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = mockPosts.find((p) => p.id === id);
  if (!post) {
    return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: post });
}

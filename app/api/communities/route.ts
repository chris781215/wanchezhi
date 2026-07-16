import { NextResponse } from 'next/server';
import { mockCommunities } from '@/lib/mock-data';

export async function GET(request: Request) {
  // TODO: Implement search, pagination
  return NextResponse.json({
    success: true,
    data: { items: mockCommunities, total: mockCommunities.length },
  });
}

export async function POST(request: Request) {
  // TODO: Create new community
  const body = await request.json();
  return NextResponse.json({
    success: true,
    data: { id: 'new-comm-id', ...body, postCount: 0, memberCount: 1, createdAt: new Date() },
  });
}

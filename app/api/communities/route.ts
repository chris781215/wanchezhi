import { NextResponse } from 'next/server';
import { mockCommunities } from '@/lib/mock-data';

export async function GET(request: Request) {
  return NextResponse.json({
    success: true,
    data: { items: mockCommunities, total: mockCommunities.length },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { slug, brand, code, displayName, description } = body;
  if (!slug) {
    return NextResponse.json({ success: false, error: '社区代码不能为空' }, { status: 400 });
  }
  // Check if already exists
  const existing = mockCommunities.find((c) => c.slug === slug);
  if (existing) {
    return NextResponse.json({ success: false, error: '社区已存在' }, { status: 400 });
  }
  const newCommunity = {
    id: 'comm-' + Date.now(),
    slug,
    brand: brand || '',
    code: code || slug.toUpperCase(),
    displayName: displayName || slug.toUpperCase(),
    description: description || '',
    postCount: 0,
    memberCount: 1,
    createdAt: new Date(),
    createdById: 'user1',
  };
  // Push to in-memory array so community page can find it
  mockCommunities.push(newCommunity as any);
  return NextResponse.json({ success: true, data: newCommunity });
}

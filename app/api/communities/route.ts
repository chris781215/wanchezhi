import { NextResponse } from 'next/server';
import { mockCommunities } from '@/lib/mock-data';
import { loadDynamicCommunities, saveCommunity } from '@/lib/community-store';

export async function GET(request: Request) {
  // Load persisted dynamic communities into memory
  const dynamicComms = loadDynamicCommunities();
  dynamicComms.forEach((dc: any) => {
    if (!mockCommunities.find((c) => c.slug === dc.slug)) {
      dc.createdAt = new Date(dc.createdAt);
      mockCommunities.push(dc);
    }
  });

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
  // Persist to file so it survives hot reload
  saveCommunity(newCommunity);
  return NextResponse.json({ success: true, data: newCommunity });
}

import { NextResponse } from 'next/server';
import { mockCommunities } from '@/lib/mock-data';
import { loadDynamicCommunities, saveCommunity } from '@/lib/community-store';
import { loadDynamicUsers } from '@/lib/user-store';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Load dynamic communities
  const dynamicComms = loadDynamicCommunities();
  dynamicComms.forEach((dc: any) => {
    if (!mockCommunities.find((c) => c.slug === dc.slug)) {
      dc.createdAt = new Date(dc.createdAt);
      mockCommunities.push(dc);
    }
  });
  const community = mockCommunities.find((c) => c.slug === slug);
  if (!community) {
    return NextResponse.json({ success: false, error: 'Community not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: community });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Load dynamic communities
  const dynamicComms = loadDynamicCommunities();
  dynamicComms.forEach((dc: any) => {
    if (!mockCommunities.find((c) => c.slug === dc.slug)) {
      dc.createdAt = new Date(dc.createdAt);
      mockCommunities.push(dc);
    }
  });

  const community = mockCommunities.find((c) => c.slug === slug);
  if (!community) {
    return NextResponse.json({ success: false, error: '社区不存在' }, { status: 404 });
  }

  const body = await request.json();
  const { description, displayName, createdById } = body;

  // Check if the requester is the community creator
  if (createdById && community.createdById !== createdById) {
    return NextResponse.json({ success: false, error: '只有版主可以编辑社区信息' }, { status: 403 });
  }

  // Update fields
  if (description !== undefined) community.description = description;
  if (displayName !== undefined) community.displayName = displayName;
  community.updatedAt = new Date();

  // Persist to file
  saveCommunity(community);

  return NextResponse.json({ success: true, data: community });
}

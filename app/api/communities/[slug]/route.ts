import { NextResponse } from 'next/server';
import { mockCommunities } from '@/lib/mock-data';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const community = mockCommunities.find((c) => c.slug === slug);
  if (!community) {
    return NextResponse.json({ success: false, error: 'Community not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: community });
}

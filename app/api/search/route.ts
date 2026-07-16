import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim();
    const type = searchParams.get('type') || 'all'; // all, communities, posts, users

    if (!q || q.length < 1) {
      return NextResponse.json({ success: true, data: { communities: [], posts: [], users: [] } });
    }

    const query = q.toLowerCase();

    // Mock search results - in production this would query the database
    // For now, return structured empty results that the client can supplement with mock data
    return NextResponse.json({
      success: true,
      data: {
        query: q,
        type,
        communities: [],
        posts: [],
        users: [],
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

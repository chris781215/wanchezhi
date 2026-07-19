import { NextResponse } from 'next/server';
import { mockPosts, mockCommunities, mockUsers } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ success: true, data: mockPosts });
}

export async function POST(request: Request) {
  try {
    const { title, content, type, communityId, url, images, price } = await request.json();
    if (!communityId) {
      return NextResponse.json({ success: false, error: '社区不能为空' }, { status: 400 });
    }
    // Auto-generate title from content if not provided
    const finalTitle = title || (content ? content.trim().split('\n')[0].slice(0, 30) : (url || '分享'));
    const community = mockCommunities.find((c) => c.slug === communityId || c.id === communityId);
    const newPost = {
      id: 'post-' + Date.now(),
      title: finalTitle,
      content: content || '',
      type: type || 'TEXT',
      url: url || null,
      images: images || [],
      price: price || null,
      communityId: community?.id || communityId,
      authorId: 'user1',
      voteScore: 0,
      bookmarkCount: 0,
      commentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      community: community || { slug: communityId, displayName: communityId, brand: '' },
      author: mockUsers[0],
    };
    // Push to in-memory array so detail page can find it
    mockPosts.unshift(newPost as any);
    return NextResponse.json({ success: true, data: newPost });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { mockPosts } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ success: true, data: mockPosts });
}

export async function POST(request: Request) {
  try {
    const { title, content, type, communityId, url, images, price } = await request.json();
    if (!title || !communityId) {
      return NextResponse.json({ success: false, error: '标题和社区不能为空' }, { status: 400 });
    }
    const newPost = {
      id: 'post-' + Date.now(),
      title,
      content: content || '',
      type: type || 'TEXT',
      url: url || null,
      images: images || [],
      price: price || null,
      communityId,
      authorId: 'user1',
      voteScore: 0,
      bookmarkCount: 0,
      commentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      community: { slug: communityId, displayName: communityId },
      author: { id: 'user1', nickname: '张三', avatar: '/avatars/default.png' },
    };
    return NextResponse.json({ success: true, data: newPost });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

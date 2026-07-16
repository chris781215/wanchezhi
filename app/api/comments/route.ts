import { NextResponse } from 'next/server';
import { mockComments } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ success: true, data: mockComments });
}

export async function POST(request: Request) {
  try {
    const { content, postId } = await request.json();
    if (!content || !postId) {
      return NextResponse.json({ success: false, error: '内容和帖子ID不能为空' }, { status: 400 });
    }
    const newComment = {
      id: 'comment-' + Date.now(),
      content,
      postId,
      parentId: null,
      authorId: 'user1',
      voteScore: 0,
      createdAt: new Date(),
      author: { id: 'user1', nickname: '张三', avatar: '/avatars/default.png' },
    };
    return NextResponse.json({ success: true, data: newComment });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId, postId } = await request.json();
    if (!userId || !postId) {
      return NextResponse.json({ success: false, error: '缺少必要参数' }, { status: 400 });
    }
    // Mock bookmark - return success
    return NextResponse.json({ success: true, data: { userId, postId, bookmarked: true } });
  } catch (error) {
    console.error('Bookmark error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

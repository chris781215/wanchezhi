import { NextResponse } from 'next/server';
import { addBookmark, removeBookmark, isBookmarked, getBookmarkCount } from '@/lib/bookmark-store';

export async function POST(request: Request) {
  try {
    const { userId, postId, action } = await request.json();
    if (!userId || !postId) {
      return NextResponse.json({ success: false, error: '缺少必要参数' }, { status: 400 });
    }

    // action: 'add' or 'remove'
    if (action === 'remove') {
      removeBookmark(userId, postId);
    } else {
      addBookmark(userId, postId);
    }

    const bookmarked = isBookmarked(userId, postId);
    const count = getBookmarkCount(postId);

    return NextResponse.json({
      success: true,
      data: { bookmarked, count },
    });
  } catch (error) {
    console.error('Bookmark error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');
  const userId = searchParams.get('userId');

  if (postId && userId) {
    const bookmarked = isBookmarked(userId, postId);
    const count = getBookmarkCount(postId);
    return NextResponse.json({ success: true, data: { bookmarked, count } });
  }

  return NextResponse.json({ success: false, error: '缺少参数' }, { status: 400 });
}

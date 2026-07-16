import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { followerId, followingId, action } = await request.json();
    if (!followerId || !followingId) {
      return NextResponse.json({ success: false, error: '缺少必要参数' }, { status: 400 });
    }
    if (followerId === followingId) {
      return NextResponse.json({ success: false, error: '不能关注自己' }, { status: 400 });
    }
    // Mock follow - return success
    return NextResponse.json({
      success: true,
      data: { followerId, followingId, action: action || 'follow' },
    });
  } catch (error) {
    console.error('Follow error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ success: false, error: '缺少 userId' }, { status: 400 });
    }
    // Mock - return empty following list
    return NextResponse.json({ success: true, data: { following: [], followers: [] } });
  } catch (error) {
    console.error('Get follows error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

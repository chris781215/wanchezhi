import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data';
import { addNotification } from '@/lib/notification-store';

export async function POST(request: Request) {
  try {
    const { followerId, followingId, action } = await request.json();
    if (!followerId || !followingId) {
      return NextResponse.json({ success: false, error: '缺少必要参数' }, { status: 400 });
    }
    if (followerId === followingId) {
      return NextResponse.json({ success: false, error: '不能关注自己' }, { status: 400 });
    }

    // Send notification for follow action
    if (action !== 'unfollow') {
      const follower = mockUsers.find((u: any) => u.id === followerId);
      addNotification({
        type: 'FOLLOW',
        recipientId: followingId,
        actorId: followerId,
        actorNickname: follower?.nickname || '匿名',
        targetId: followerId,
        targetType: 'user',
        message: `${follower?.nickname || '匿名'} 关注了你`,
        link: `/u/${follower?.username || ''}`,
      });
    }

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
    return NextResponse.json({ success: true, data: { following: [], followers: [] } });
  } catch (error) {
    console.error('Get follows error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

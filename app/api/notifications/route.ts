import { NextResponse } from 'next/server';
import { getUserNotifications, getUnreadCount, markAsRead, markAllAsRead } from '@/lib/notification-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: '缺少 userId' }, { status: 400 });
    }

    const notifications = getUserNotifications(userId);
    const unreadCount = getUnreadCount(userId);

    return NextResponse.json({ success: true, data: notifications, unreadCount });
  } catch (error) {
    console.error('Get notifications error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { notificationId, action, userId } = await request.json();

    if (action === 'markRead' && notificationId) {
      markAsRead(notificationId);
      return NextResponse.json({ success: true, data: { id: notificationId, read: true } });
    }

    if (action === 'markAllRead' && userId) {
      markAllAsRead(userId);
      return NextResponse.json({ success: true, data: { allRead: true } });
    }

    return NextResponse.json({ success: false, error: '未知操作' }, { status: 400 });
  } catch (error) {
    console.error('Notification action error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

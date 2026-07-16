import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: '缺少 userId' }, { status: 400 });
    }

    // Mock notifications
    const notifications = [
      {
        id: 'notif1',
        type: 'COMMENT',
        message: '张三 评论了你的帖子 "W221 空气悬挂维修经验分享"',
        link: '/post/post1#comments',
        read: false,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'notif2',
        type: 'LIKE',
        message: '李四 赞了你的帖子 "E46 底盘异响排查全过程"',
        link: '/post/post2',
        read: false,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'notif3',
        type: 'FOLLOW',
        message: '王五 关注了你',
        link: '/u/王五',
        read: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'notif4',
        type: 'BOOKMARK',
        message: '赵六 收藏了你的帖子 "B58 涡轮升级指南"',
        link: '/post/post3',
        read: true,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
    ];

    return NextResponse.json({ success: true, data: notifications });
  } catch (error) {
    console.error('Get notifications error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { notificationId, action } = await request.json();

    if (action === 'markRead' && notificationId) {
      return NextResponse.json({ success: true, data: { id: notificationId, read: true } });
    }

    if (action === 'markAllRead') {
      return NextResponse.json({ success: true, data: { allRead: true } });
    }

    return NextResponse.json({ success: false, error: '未知操作' }, { status: 400 });
  } catch (error) {
    console.error('Notification action error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

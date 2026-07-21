import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const { email, nickname, password } = await request.json();

    if (!email || !nickname || !password) {
      return NextResponse.json({ success: false, error: '所有字段都是必填的' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: '密码至少6位' }, { status: 400 });
    }

    const username = email.split('@')[0];

    // Check if username already exists
    const existing = mockUsers.find((u: any) => u.username === username || u.email === email);
    if (existing) {
      return NextResponse.json({ success: false, error: '该邮箱已注册' }, { status: 400 });
    }

    // Create and persist new user
    const newUser = {
      id: 'user-' + Date.now(),
      email,
      username,
      nickname,
      avatar: '/avatars/default.png',
      bio: '',
      points: 0,
      level: 1,
      joinDate: new Date().toISOString(),
    };
    mockUsers.push(newUser as any);

    const token = Buffer.from(JSON.stringify({ userId: newUser.id, email: newUser.email, username: newUser.username })).toString('base64');

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

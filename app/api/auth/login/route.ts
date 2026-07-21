import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: '邮箱和密码不能为空' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: '密码至少6位' }, { status: 400 });
    }

    // Find existing user or auto-register
    let user = mockUsers.find((u: any) => u.email === email);

    if (!user) {
      // Auto-register: create new user
      const username = email.split('@')[0];
      user = {
        id: 'user-' + Date.now(),
        email,
        username,
        nickname: username,
        avatar: '/avatars/default.png',
        bio: '',
        points: 0,
        level: 1,
        joinDate: new Date().toISOString(),
      } as any;
      mockUsers.push(user as any);
    }

    const token = Buffer.from(JSON.stringify({ userId: user!.id, email: user!.email, username: user!.username })).toString('base64');

    return NextResponse.json({
      success: true,
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

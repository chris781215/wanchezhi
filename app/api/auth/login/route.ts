import { NextResponse } from 'next/server';

// TODO: Replace with actual Prisma + bcrypt implementation
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcryptjs';
// const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: '邮箱和密码不能为空' }, { status: 400 });
    }

    // Mock login - find user by email
    const { mockUsers } = await import('@/lib/mock-data');
    const foundUser = mockUsers.find((u: any) => u.email === email);
    const mockUser = {
      id: foundUser?.id || 'user1',
      email: email,
      username: foundUser?.username || email.split('@')[0],
      nickname: foundUser?.nickname || '张三',
      avatar: foundUser?.avatar || '/avatars/default.png',
      points: foundUser?.points || 1250,
    };

    const token = Buffer.from(JSON.stringify({ userId: mockUser.id, email: mockUser.email })).toString('base64');

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: mockUser,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

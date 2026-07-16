import { NextResponse } from 'next/server';

// TODO: Replace with actual Prisma + bcrypt implementation
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcryptjs';
// const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, nickname, password } = await request.json();

    if (!email || !nickname || !password) {
      return NextResponse.json({ success: false, error: '所有字段都是必填的' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: '密码至少6位' }, { status: 400 });
    }

    // Mock registration - return mock user data
    const username = email.split('@')[0];
    const mockUser = {
      id: 'new-user-' + Date.now(),
      email: email,
      username: username,
      nickname: nickname,
      avatar: '/avatars/default.png',
      points: 0,
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
    console.error('Register error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

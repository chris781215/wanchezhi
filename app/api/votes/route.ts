import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId, targetId, targetType, value } = await request.json();
    if (!userId || !targetId || !targetType || value === undefined) {
      return NextResponse.json({ success: false, error: '缺少必要参数' }, { status: 400 });
    }
    if (value !== 1 && value !== -1) {
      return NextResponse.json({ success: false, error: '投票值只能是 1 或 -1' }, { status: 400 });
    }
    // Mock vote - return success
    return NextResponse.json({ success: true, data: { userId, targetId, targetType, value } });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

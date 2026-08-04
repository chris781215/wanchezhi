import { NextResponse } from 'next/server';
import { addVote, removeVote, getVoteScore, getUserVote } from '@/lib/vote-store';

export async function POST(request: Request) {
  try {
    const { userId, targetId, targetType, value } = await request.json();
    if (!userId || !targetId || !targetType || value === undefined) {
      return NextResponse.json({ success: false, error: '缺少必要参数' }, { status: 400 });
    }
    if (value !== 1 && value !== -1 && value !== 0) {
      return NextResponse.json({ success: false, error: '投票值只能是 1, -1 或 0' }, { status: 400 });
    }

    // value=0 means cancel vote
    if (value === 0) {
      removeVote(userId, targetId, targetType);
    } else {
      const vote = {
        id: 'vote-' + Date.now(),
        userId,
        targetId,
        targetType,
        value: value as 1 | -1,
        createdAt: new Date().toISOString(),
      };
      addVote(vote);
    }

    const score = getVoteScore(targetId, targetType);
    const userVote = getUserVote(userId, targetId, targetType);

    return NextResponse.json({
      success: true,
      data: { score, userVote },
    });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetId = searchParams.get('targetId');
  const targetType = searchParams.get('targetType') as 'post' | 'comment' | null;
  const userId = searchParams.get('userId');

  if (targetId && targetType) {
    const score = getVoteScore(targetId, targetType);
    const userVote = userId ? getUserVote(userId, targetId, targetType) : 0;
    return NextResponse.json({ success: true, data: { score, userVote } });
  }

  return NextResponse.json({ success: false, error: '缺少参数' }, { status: 400 });
}

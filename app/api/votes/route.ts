import { NextResponse } from 'next/server';
import { addVote, removeVote, getVoteScore, getUserVote } from '@/lib/vote-store';
import { addPoints } from '@/lib/user-store';
import { mockPosts } from '@/lib/mock-data';
import { loadDynamicPosts } from '@/lib/post-store';
import { mockComments } from '@/lib/mock-data';
import { loadDynamicComments } from '@/lib/comment-store';

// Helper: get the author ID of a post or comment
function getTargetAuthorId(targetId: string, targetType: 'post' | 'comment'): string | null {
  // Load dynamic data
  const dynamicPosts = loadDynamicPosts();
  dynamicPosts.forEach((dp: any) => {
    if (!mockPosts.find((p: any) => p.id === dp.id)) mockPosts.push(dp);
  });
  const dynamicComments = loadDynamicComments();
  dynamicComments.forEach((dc: any) => {
    if (!mockComments.find((c: any) => c.id === dc.id)) mockComments.push(dc);
  });

  if (targetType === 'post') {
    const post = mockPosts.find((p: any) => p.id === targetId);
    return post?.authorId || null;
  } else {
    const comment = mockComments.find((c: any) => c.id === targetId);
    return comment?.authorId || null;
  }
}

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
      const oldVote = getUserVote(userId, targetId, targetType);
      removeVote(userId, targetId, targetType);
      // Revert points for the target author if cancelling a vote
      if (oldVote !== 0) {
        const targetAuthorId = getTargetAuthorId(targetId, targetType);
        if (targetAuthorId) {
          addPoints(targetAuthorId, oldVote === 1 ? -1 : 1);
        }
      }
    } else {
      const oldVote = getUserVote(userId, targetId, targetType);
      const vote = {
        id: 'vote-' + Date.now(),
        userId,
        targetId,
        targetType,
        value: value as 1 | -1,
        createdAt: new Date().toISOString(),
      };
      addVote(vote);
      // Award/revoke points for the target author
      const targetAuthorId = getTargetAuthorId(targetId, targetType);
      if (targetAuthorId) {
        // Remove old vote effect
        if (oldVote !== 0) {
          addPoints(targetAuthorId, oldVote === 1 ? -1 : 1);
        }
        // Add new vote effect: upvote +1, downvote -1
        addPoints(targetAuthorId, value === 1 ? 1 : -1);
      }
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

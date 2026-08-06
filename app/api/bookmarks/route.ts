import { NextResponse } from 'next/server';
import { addBookmark, removeBookmark, isBookmarked, getBookmarkCount } from '@/lib/bookmark-store';
import { addPoints } from '@/lib/user-store';
import { mockPosts, mockUsers } from '@/lib/mock-data';
import { loadDynamicPosts } from '@/lib/post-store';
import { addNotification } from '@/lib/notification-store';

export async function POST(request: Request) {
  try {
    const { userId, postId, action } = await request.json();
    if (!userId || !postId) {
      return NextResponse.json({ success: false, error: '缺少必要参数' }, { status: 400 });
    }

    // action: 'add' or 'remove'
    if (action === 'remove') {
      removeBookmark(userId, postId);
      // Revert bookmark points for post author (-2)
      const dynamicPosts = loadDynamicPosts();
      dynamicPosts.forEach((dp: any) => {
        if (!mockPosts.find((p: any) => p.id === dp.id)) mockPosts.push(dp);
      });
      const post = mockPosts.find((p: any) => p.id === postId);
      if (post?.authorId) {
        addPoints(post.authorId, -2);
      }
    } else {
      addBookmark(userId, postId);
      // Award bookmark points for post author (+2)
      const dynamicPosts = loadDynamicPosts();
      dynamicPosts.forEach((dp: any) => {
        if (!mockPosts.find((p: any) => p.id === dp.id)) mockPosts.push(dp);
      });
      const post = mockPosts.find((p: any) => p.id === postId);
      if (post?.authorId) {
        addPoints(post.authorId, 2);
        // Send notification
        if (post.authorId !== userId) {
          const bookmarker = mockUsers.find((u: any) => u.id === userId);
          const slug = post.communityId || 'all';
          addNotification({
            type: 'BOOKMARK',
            recipientId: post.authorId,
            actorId: userId,
            actorNickname: bookmarker?.nickname || '匿名',
            targetId: postId,
            targetType: 'post',
            targetTitle: post.title?.slice(0, 20),
            message: `${bookmarker?.nickname || '匿名'} 收藏了你的帖子 "${post.title?.slice(0, 20) || ''}"`,
            link: `/w/${slug}/post/${postId}`,
          });
        }
      }
    }

    const bookmarked = isBookmarked(userId, postId);
    const count = getBookmarkCount(postId);

    return NextResponse.json({
      success: true,
      data: { bookmarked, count },
    });
  } catch (error) {
    console.error('Bookmark error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');
  const userId = searchParams.get('userId');

  if (postId && userId) {
    const bookmarked = isBookmarked(userId, postId);
    const count = getBookmarkCount(postId);
    return NextResponse.json({ success: true, data: { bookmarked, count } });
  }

  return NextResponse.json({ success: false, error: '缺少参数' }, { status: 400 });
}

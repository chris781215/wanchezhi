import { NextResponse } from 'next/server';
import { mockComments, mockUsers, mockPosts } from '@/lib/mock-data';
import { loadDynamicUsers, addPoints } from '@/lib/user-store';
import { loadDynamicComments, saveComment } from '@/lib/comment-store';
import { loadDynamicPosts, savePost } from '@/lib/post-store';
import { addNotification } from '@/lib/notification-store';

function ensureDynamicUsersLoaded() {
  const dynamicUsers = loadDynamicUsers();
  dynamicUsers.forEach((du: any) => {
    const idx = mockUsers.findIndex((u: any) => u.id === du.id);
    if (idx >= 0) {
      mockUsers[idx] = { ...mockUsers[idx], ...du };
    } else {
      mockUsers.push(du);
    }
  });
}

export async function GET() {
  // Load persisted dynamic comments into memory
  const dynamicComments = loadDynamicComments();
  dynamicComments.forEach((dc: any) => {
    if (!mockComments.find((c) => c.id === dc.id)) {
      dc.createdAt = new Date(dc.createdAt);
      mockComments.push(dc);
    }
  });
  return NextResponse.json({ success: true, data: mockComments });
}

export async function POST(request: Request) {
  try {
    ensureDynamicUsersLoaded();
    // Load dynamic posts
    const dynamicPosts = loadDynamicPosts();
    dynamicPosts.forEach((dp: any) => {
      const idx = mockPosts.findIndex((p: any) => p.id === dp.id);
      if (idx >= 0) {
        mockPosts[idx] = { ...mockPosts[idx], ...dp };
      } else {
        mockPosts.push(dp);
      }
    });

    const { content, postId, parentId, authorId, author } = await request.json();
    if (!content || !postId) {
      return NextResponse.json({ success: false, error: '内容和帖子ID不能为空' }, { status: 400 });
    }
    const uid = authorId || 'user1';
    const defaultAuthor = mockUsers.find((u) => u.id === uid) || { id: 'user1', nickname: '张三', avatar: '/avatars/default.png' };
    const newComment = {
      id: 'comment-' + Date.now(),
      content,
      postId,
      parentId: parentId || null,
      authorId: uid,
      voteScore: 0,
      createdAt: new Date(),
      author: author || defaultAuthor,
    };
    // Persist comment to file
    saveComment(newComment);
    mockComments.push(newComment);

    // Update post commentCount
    const post = mockPosts.find((p) => p.id === postId);
    if (post) {
      post.commentCount = (post.commentCount || 0) + 1;
      savePost(post);
    }

    // Award points for commenting (+1)
    if (uid) {
      addPoints(uid, 1);
    }

    // Send notification to post author
    if (post && post.authorId && post.authorId !== uid) {
      const commenter = mockUsers.find((u: any) => u.id === uid);
      const slug = post.communityId || 'all';
      addNotification({
        type: parentId ? 'REPLY' : 'COMMENT',
        recipientId: post.authorId,
        actorId: uid,
        actorNickname: commenter?.nickname || '匿名',
        targetId: newComment.id,
        targetType: 'comment',
        targetTitle: post.title,
        message: `${commenter?.nickname || '匿名'} ${parentId ? '回复了你' : '评论了帖子'} "${post.title?.slice(0, 20) || ''}"`,
        link: `/w/${slug}/post/${postId}#comments`,
      });
    }

    return NextResponse.json({ success: true, data: newComment });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

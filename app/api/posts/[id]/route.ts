import { NextResponse } from 'next/server';
import { mockPosts } from '@/lib/mock-data';
import { loadDynamicPosts, deletePost } from '@/lib/post-store';
import { loadVotes } from '@/lib/vote-store';
import { loadDynamicUsers } from '@/lib/user-store';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Load dynamic posts
  const dynamicPosts = loadDynamicPosts();
  dynamicPosts.forEach((dp: any) => {
    if (!mockPosts.find((p) => p.id === dp.id)) {
      mockPosts.unshift(dp);
    }
  });

  // Load dynamic users
  const dynamicUsers = loadDynamicUsers();
  const { mockUsers } = require('@/lib/mock-data');
  dynamicUsers.forEach((du: any) => {
    const idx = mockUsers.findIndex((u: any) => u.id === du.id);
    if (idx >= 0) {
      mockUsers[idx] = { ...mockUsers[idx], ...du };
    } else {
      mockUsers.push(du);
    }
  });

  const { id } = await params;
  const post = mockPosts.find((p) => p.id === id);
  if (!post) {
    return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
  }

  // Compute actual vote score from vote-store
  const votes = loadVotes();
  const postVotes = votes.filter((v) => v.targetId === post.id && v.targetType === 'post');
  const voteScore = postVotes.reduce((sum, v) => sum + v.value, 0);

  return NextResponse.json({ success: true, data: { ...post, voteScore } });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { userId, isAdmin } = body;

  // Load dynamic posts
  const dynamicPosts = loadDynamicPosts();
  dynamicPosts.forEach((dp: any) => {
    if (!mockPosts.find((p) => p.id === dp.id)) {
      mockPosts.unshift(dp);
    }
  });

  const post = mockPosts.find((p) => p.id === id);
  if (!post) {
    return NextResponse.json({ success: false, error: '帖子不存在' }, { status: 404 });
  }

  // Check permission: only author or admin can delete
  if (!userId || ((post as any).authorId !== userId && !isAdmin)) {
    return NextResponse.json({ success: false, error: '没有权限删除' }, { status: 403 });
  }

  // Remove from in-memory array
  const idx = mockPosts.findIndex((p) => p.id === id);
  if (idx >= 0) mockPosts.splice(idx, 1);

  // Remove from persisted store
  deletePost(id);

  return NextResponse.json({ success: true });
}

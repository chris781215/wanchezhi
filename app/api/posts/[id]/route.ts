import { NextResponse } from 'next/server';
import { mockPosts } from '@/lib/mock-data';
import { loadDynamicPosts } from '@/lib/post-store';
import { loadVotes } from '@/lib/vote-store';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Load dynamic posts
  const dynamicPosts = loadDynamicPosts();
  dynamicPosts.forEach((dp: any) => {
    if (!mockPosts.find((p) => p.id === dp.id)) {
      mockPosts.unshift(dp);
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

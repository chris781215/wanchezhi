import { NextResponse } from 'next/server';
import { mockPosts, mockCommunities, mockUsers } from '@/lib/mock-data';
import { loadDynamicPosts, savePost } from '@/lib/post-store';
import { loadDynamicUsers } from '@/lib/user-store';
import { loadVotes } from '@/lib/vote-store';

// Load persisted dynamic users into memory
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
  // Load persisted dynamic posts into memory
  const dynamicPosts = loadDynamicPosts();
  dynamicPosts.forEach((dp: any) => {
    if (!mockPosts.find((p) => p.id === dp.id)) {
      dp.createdAt = new Date(dp.createdAt);
      dp.updatedAt = new Date(dp.updatedAt);
      mockPosts.unshift(dp);
    }
  });

  // Compute actual vote scores from vote-store
  const votes = loadVotes();
  mockPosts.forEach((post) => {
    const postVotes = votes.filter((v) => v.targetId === post.id && v.targetType === 'post');
    post.voteScore = postVotes.reduce((sum, v) => sum + v.value, 0);
  });

  return NextResponse.json({ success: true, data: mockPosts });
}

export async function POST(request: Request) {
  try {
    ensureDynamicUsersLoaded();
    const { title, content, type, communityId, url, images, price, authorId, author } = await request.json();
    if (!communityId) {
      return NextResponse.json({ success: false, error: '社区不能为空' }, { status: 400 });
    }
    // Auto-generate title from content if not provided
    const finalTitle = title || (content ? content.trim().split('\n')[0].slice(0, 30) : (url || '分享'));
    const community = mockCommunities.find((c) => c.slug === communityId || c.id === communityId);
    const newPost = {
      id: 'post-' + Date.now(),
      title: finalTitle,
      content: content || '',
      type: type || 'TEXT',
      url: url || null,
      images: images || [],
      price: price || null,
      communityId: community?.id || communityId,
      authorId: authorId || 'user1',
      voteScore: 0,
      bookmarkCount: 0,
      commentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      community: community || { slug: communityId, displayName: communityId, brand: '' },
      author: author || mockUsers.find((u) => u.id === (authorId || 'user1')) || mockUsers[0],
    };
    // Push to in-memory array so detail page can find it
    mockPosts.unshift(newPost as any);
    // Persist to file so it survives hot reload and module isolation
    savePost(newPost);
    return NextResponse.json({ success: true, data: newPost });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ success: false, error: '服务器错误' }, { status: 500 });
  }
}

import { mockPosts } from '@/lib/mock-data';
import PostDetailClient from '@/components/PostDetailClient';
import Sidebar from '@/components/Sidebar';
import TrendingCommunities from '@/components/TrendingCommunities';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    return { title: '帖子不存在 - 玩车志' };
  }

  const description = post.content
    ? post.content.slice(0, 200) + (post.content.length > 200 ? '...' : '')
    : post.title;

  const firstImage = post.images && post.images.length > 0 ? post.images[0] : undefined;

  return {
    title: `${post.title} - 玩车志`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      ...(firstImage && { images: [{ url: firstImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      ...(firstImage && { images: [firstImage] }),
    },
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="max-w-7xl mx-auto px-3 md:px-4 py-4">
      <div className="flex gap-6">
        {/* Left sidebar - Desktop only */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <PostDetailClient postId={id} />
        </div>

        {/* Right sidebar - Desktop only */}
        <div className="hidden lg:block w-64 shrink-0">
          <TrendingCommunities />
        </div>
      </div>
    </div>
  );
}

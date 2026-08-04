import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import SortTabs from '@/components/SortTabs';
import TrendingCommunities from '@/components/TrendingCommunities';
import HeroCarousel from '@/components/ImageCarousel';
import { mockPosts } from '@/lib/mock-data';
import { loadDynamicPosts } from '@/lib/post-store';
import { calculateHotScore } from '@/lib/utils';
import { loadVotes } from '@/lib/vote-store';

function getAllPosts() {
  const dynamicPosts = loadDynamicPosts();
  const allPosts = [...mockPosts];
  dynamicPosts.forEach((dp: any) => {
    if (!allPosts.find((p) => p.id === dp.id)) {
      dp.createdAt = new Date(dp.createdAt);
      dp.updatedAt = new Date(dp.updatedAt);
      allPosts.unshift(dp);
    }
  });

  // Compute actual vote scores from vote-store
  const votes = loadVotes();
  allPosts.forEach((post) => {
    const postVotes = votes.filter((v) => v.targetId === post.id && v.targetType === 'post');
    post.voteScore = postVotes.reduce((sum, v) => sum + v.value, 0);
  });

  return allPosts;
}

export default async function HomePage({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const { sort } = await searchParams;
  const sortType = sort || 'hot';
  const allPosts = getAllPosts();

  const sortedPosts = [...allPosts].sort((a, b) => {
    switch (sortType) {
      case 'new':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'top':
        return b.voteScore - a.voteScore;
      default: // hot
        return calculateHotScore(b.voteScore, 0, b.createdAt) - calculateHotScore(a.voteScore, 0, a.createdAt);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-4 py-4">
      <div className="flex gap-6">
        {/* Left sidebar - Desktop only */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Hero carousel - high voted image posts */}
          <HeroCarousel posts={sortedPosts} />

          {/* Sort tabs */}
          <SortTabs />

          {/* Posts feed */}
          <div className="space-y-3 mt-3">
            {sortedPosts.map((post, index) => (
              <PostCard key={post.id} post={post} rank={index} />
            ))}
          </div>
        </div>

        {/* Right sidebar - Desktop only */}
        <div className="hidden lg:block w-64 shrink-0">
          <TrendingCommunities />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Post, Community } from '@/types';
import PostCard from '@/components/PostCard';
import SortTabs from '@/components/SortTabs';
import CommunityTradeSection from '@/components/CommunityTradeSection';
import Link from 'next/link';

// Icons
const TagIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);
const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

interface CommunityTabsProps {
  community: Community;
  communityPosts: Post[];
  tradePosts: Post[];
}

export default function CommunityTabs({ community, communityPosts, tradePosts }: CommunityTabsProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'trade'>('posts');

  return (
    <>
      {/* Tab bar */}
      <div className="flex items-center gap-1 mb-3 bg-white border border-border rounded-lg p-1">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
            activeTab === 'posts'
              ? 'bg-primary text-white'
              : 'text-text-secondary hover:bg-secondary'
          }`}
        >
          <FileTextIcon className="w-4 h-4" />
          帖子
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            activeTab === 'posts' ? 'bg-white/20' : 'bg-secondary'
          }`}>
            {communityPosts.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('trade')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
            activeTab === 'trade'
              ? 'bg-orange-500 text-white'
              : 'text-text-secondary hover:bg-secondary'
          }`}
        >
          <TagIcon className="w-4 h-4" />
          交易区
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            activeTab === 'trade' ? 'bg-white/20' : 'bg-secondary'
          }`}>
            {tradePosts.length}
          </span>
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'posts' && (
        <div>
          <SortTabs />
          <div className="space-y-3 mt-3">
            {communityPosts.length > 0 ? (
              communityPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="bg-white border border-border rounded-lg p-8 text-center">
                <p className="text-text-secondary mb-4">这个社区还没有帖子</p>
                <Link
                  href={`/submit?community=${community.slug}`}
                  className="text-primary hover:underline"
                >
                  发布第一篇帖子
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'trade' && (
        <CommunityTradeSection
          community={community}
          tradePosts={tradePosts}
        />
      )}
    </>
  );
}

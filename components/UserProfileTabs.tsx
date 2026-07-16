'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Post, Comment } from '@/types';
import PostCard from '@/components/PostCard';
import { formatRelativeTime } from '@/lib/utils';

interface UserProfileTabsProps {
  posts: Post[];
  userPosts: Post[];
  comments: Comment[];
}

export default function UserProfileTabs({ posts, userPosts, comments }: UserProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'bookmarks'>('posts');

  const tabs = [
    { id: 'posts' as const, label: '帖子', count: userPosts.length },
    { id: 'comments' as const, label: '评论', count: comments.length },
    { id: 'bookmarks' as const, label: '收藏', count: 0 },
  ];

  return (
    <>
      {/* Tabs */}
      <div className="bg-white border border-border rounded-lg mb-4">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-foreground'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === 'posts' && (
          userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-center text-text-secondary py-8">暂无帖子</p>
          )
        )}
        {activeTab === 'comments' && (
          comments.length > 0 ? (
            comments.map((comment) => {
              const post = posts.find((p) => p.id === comment.postId);
              return (
                <Link
                  key={comment.id}
                  href={post ? `/w/${post.community?.slug || 'all'}/post/${post.id}#comments` : '#'}
                  className="block bg-white border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
                >
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-text-secondary">
                      {comment.voteScore} 赞 · {formatRelativeTime(comment.createdAt)}
                    </p>
                    {post && (
                      <p className="text-xs text-primary truncate max-w-[200px]">
                        ↩ {post.title}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-center text-text-secondary py-8">暂无评论</p>
          )
        )}
        {activeTab === 'bookmarks' && (
          <p className="text-center text-text-secondary py-8">暂无收藏</p>
        )}
      </div>
    </>
  );
}

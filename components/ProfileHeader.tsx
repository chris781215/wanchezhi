'use client';

import { useState, useEffect } from 'react';
import Avatar from '@/components/Avatar';
import FollowButton from '@/components/FollowButton';
import { getBadgeLevel, formatNumber } from '@/lib/utils';
import { Post, Comment } from '@/types';

interface ProfileHeaderProps {
  userId: string;
  username: string;
  nickname: string;
  avatar?: string;
  points: number;
  postCount: number;
  posts: Post[];
  comments: Comment[];
}

export default function ProfileHeader({ username, nickname, avatar, points, postCount }: ProfileHeaderProps) {
  const [bio, setBio] = useState('');

  // Fetch bio from API
  useEffect(() => {
    fetch(`/api/users/${encodeURIComponent(username)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.bio) {
          setBio(data.data.bio);
        }
      })
      .catch(() => {});
  }, [username]);

  const badge = getBadgeLevel(points);

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden mb-6">
      <div className="h-24 bg-gradient-to-r from-primary to-blue-400" />
      <div className="px-4 pb-4 -mt-10">
        <div className="flex items-end gap-4">
          <div className="border-4 border-white rounded-full shadow">
            <Avatar nickname={nickname} points={points} size="lg" image={avatar} />
          </div>
          <div className="flex-1 pt-12">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-bold">{nickname}</h1>
                <p className="text-sm text-text-secondary">@{username}</p>
              </div>
              <FollowButton nickname={nickname} />
            </div>

            {/* Bio - pure display */}
            {bio && (
              <div className="mt-2">
                <p className="text-sm text-text-secondary whitespace-pre-wrap">{bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div>
            <span className="font-bold">{formatNumber(points)}</span>
            <span className="text-text-secondary ml-1">积分</span>
          </div>
          <div>
            <span className="font-bold">{badge.current.icon} {badge.current.name}</span>
          </div>
          <div>
            <span className="font-bold">{postCount}</span>
            <span className="text-text-secondary ml-1">帖子</span>
          </div>
        </div>

        {/* Badge progress */}
        {badge.next && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>{badge.current.icon} {badge.current.name}</span>
              <span>距离 {badge.next.icon} {badge.next.name} 还需 {badge.next.minPoints - points} 积分</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${badge.progress}%` }}
              />
            </div>
            <p className="text-[11px] text-text-secondary mt-1.5">
              🎯 即将解锁：<span className="font-medium text-foreground">{badge.next.unlock}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

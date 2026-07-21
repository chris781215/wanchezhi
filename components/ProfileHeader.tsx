'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import Avatar from '@/components/Avatar';
import FollowButton from '@/components/FollowButton';
import { getBadgeLevel, formatNumber } from '@/lib/utils';
import { Post, Comment } from '@/types';

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface ProfileHeaderProps {
  userId: string;
  username: string;
  nickname: string;
  points: number;
  postCount: number;
  posts: Post[];
  comments: Comment[];
}

export default function ProfileHeader({ userId, username, nickname: initialNickname, points, postCount, posts, comments }: ProfileHeaderProps) {
  const { user } = useAuth();
  const isOwner = user?.username === username;

  const [bio, setBio] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const [bioValue, setBioValue] = useState('');
  const [saving, setSaving] = useState(false);

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

  const handleSaveBio = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(username)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: bioValue.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setBio(bioValue.trim());
      }
    } catch {}
    setSaving(false);
    setEditingBio(false);
  };

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden mb-6">
      <div className="h-24 bg-gradient-to-r from-primary to-blue-400" />
      <div className="px-4 pb-4 -mt-10">
        <div className="flex items-end gap-4">
          <div className="border-4 border-white rounded-full shadow">
            <Avatar nickname={initialNickname} points={points} size="lg" />
          </div>
          <div className="flex-1 pt-12">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-bold">{initialNickname}</h1>
                <p className="text-sm text-text-secondary">@{username}</p>
              </div>
              <FollowButton nickname={initialNickname} />
            </div>

            {/* Bio */}
            <div className="mt-2">
              {editingBio ? (
                <div className="space-y-2">
                  <textarea
                    value={bioValue}
                    onChange={(e) => setBioValue(e.target.value)}
                    className="w-full border border-border rounded-lg p-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    rows={2}
                    placeholder="介绍一下自己..."
                    autoFocus
                    maxLength={200}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => { setEditingBio(false); setBioValue(bio); }}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-secondary transition-colors"
                    >
                      <XIcon className="w-3.5 h-3.5" />
                      取消
                    </button>
                    <button
                      onClick={handleSaveBio}
                      disabled={saving}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      <CheckIcon className="w-3.5 h-3.5" />
                      {saving ? '保存中...' : '保存'}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`text-sm text-text-secondary ${isOwner ? 'cursor-pointer hover:text-foreground transition-colors' : ''}`}
                  onClick={() => { if (isOwner) { setEditingBio(true); setBioValue(bio); } }}
                >
                  {bio ? (
                    <p className="whitespace-pre-wrap">{bio}</p>
                  ) : isOwner ? (
                    <p className="italic text-text-secondary/60">✏️ 点击添加个人简介</p>
                  ) : null}
                </div>
              )}
            </div>
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

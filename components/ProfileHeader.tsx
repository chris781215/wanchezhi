'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import Avatar from '@/components/Avatar';
import FollowButton from '@/components/FollowButton';
import { getBadgeLevel, formatNumber } from '@/lib/utils';
import { Post, Comment } from '@/types';

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);
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
  const { user, updateUser } = useAuth();
  const isOwner = user?.username === username;

  const [nickname, setNickname] = useState(initialNickname);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(initialNickname);
  const [saving, setSaving] = useState(false);

  const badge = getBadgeLevel(points);

  const handleSave = async () => {
    if (!editValue.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(username)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: editValue.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setNickname(editValue.trim());
        // Update auth context if it's the current user
        if (isOwner) {
          updateUser({ nickname: editValue.trim() });
        }
      }
    } catch {
      // silent
    }
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden mb-6">
      <div className="h-24 bg-gradient-to-r from-primary to-blue-400" />
      <div className="px-4 pb-4 -mt-10">
        <div className="flex items-end gap-4">
          <div className="border-4 border-white rounded-full shadow">
            <Avatar nickname={nickname} points={points} size="lg" />
          </div>
          <div className="flex-1 pt-12">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                {editing ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="text-xl font-bold border border-border rounded px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary max-w-[200px]"
                      autoFocus
                      maxLength={20}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') { setEditing(false); setEditValue(nickname); }
                      }}
                    />
                    <button onClick={handleSave} disabled={saving} className="p-1 rounded hover:bg-secondary text-primary">
                      <CheckIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => { setEditing(false); setEditValue(nickname); }} className="p-1 rounded hover:bg-secondary text-text-secondary">
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold">{nickname}</h1>
                    {isOwner && (
                      <button
                        onClick={() => { setEditing(true); setEditValue(nickname); }}
                        className="p-1 rounded hover:bg-secondary text-text-secondary hover:text-foreground transition-colors"
                        title="修改昵称"
                      >
                        <EditIcon className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
                <p className="text-sm text-text-secondary">@{username}</p>
              </div>
              <FollowButton nickname={nickname} />
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

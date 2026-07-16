'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';

interface FollowButtonProps {
  nickname: string;
  userId?: string;
}

const FOLLOWS_KEY = 'wcz-follows';

function getFollows(): Set<string> {
  try {
    const raw = localStorage.getItem(FOLLOWS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveFollows(follows: Set<string>) {
  try {
    localStorage.setItem(FOLLOWS_KEY, JSON.stringify([...follows]));
  } catch {
    // ignore
  }
}

export default function FollowButton({ nickname, userId }: FollowButtonProps) {
  const { user } = useAuth();
  const [following, setFollowing] = useState(false);
  const [followerCount] = useState(Math.floor(Math.random() * 200) + 10);

  useEffect(() => {
    const follows = getFollows();
    setFollowing(follows.has(nickname));
  }, [nickname]);

  const handleFollow = async () => {
    const follows = getFollows();
    const newFollowing = !following;

    if (newFollowing) {
      follows.add(nickname);
    } else {
      follows.delete(nickname);
    }

    setFollowing(newFollowing);
    saveFollows(follows);

    // Call API (fire and forget)
    if (user) {
      try {
        await fetch('/api/follow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            followerId: user.id,
            followingId: userId || nickname,
            action: newFollowing ? 'follow' : 'unfollow',
          }),
        });
      } catch {
        // ignore
      }
    }
  };

  const isSelf = user?.nickname === nickname;
  if (isSelf) return null;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleFollow}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          following
            ? 'bg-secondary text-text-secondary hover:bg-red-50 hover:text-red-500'
            : 'bg-primary text-white hover:bg-primary-hover'
        }`}
      >
        {following ? '已关注' : '+ 关注'}
      </button>
      <span className="text-sm text-text-secondary">
        {followerCount} 粉丝
      </span>
    </div>
  );
}

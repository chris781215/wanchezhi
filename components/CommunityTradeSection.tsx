'use client';

import { useAuth } from '@/lib/auth-context';
import { Post, Community, BADGE_LEVELS } from '@/types';
import { getBadgeLevel } from '@/lib/utils';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

// Icons
const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const TagIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

interface CommunityTradeSectionProps {
  community: Community;
  tradePosts: Post[];
}

const TRADE_MIN_POINTS = 100; // 赛车手 Lv.3

export default function CommunityTradeSection({ community, tradePosts }: CommunityTradeSectionProps) {
  const { user } = useAuth();

  const userPoints = user?.points ?? 0;
  const currentLevel = user ? getBadgeLevel(userPoints) : null;
  const currentLevelName = currentLevel?.current?.name || '新手上路';
  const canTrade = userPoints >= TRADE_MIN_POINTS;

  const targetLevel = BADGE_LEVELS.find(l => l.minPoints === TRADE_MIN_POINTS);

  return (
    <div>
      {/* Permission status banner */}
      {!user ? (
        <div className="mb-4 p-4 bg-gray-50 border border-border rounded-lg flex items-center gap-3">
          <LockIcon className="w-5 h-5 text-text-secondary shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">登录后即可参与交易</p>
            <p className="text-xs text-text-secondary mt-0.5">赛车手(Lv.3)可发布交易帖，闲置配件、整车均可</p>
          </div>
          <Link href="/auth/login" className="px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover transition-colors shrink-0">
            登录
          </Link>
        </div>
      ) : !canTrade ? (
        <div className="mb-4 p-4 rounded-lg border-2 bg-orange-50 border-orange-200">
          <div className="flex items-start gap-3">
            <LockIcon className="w-5 h-5 shrink-0 mt-0.5 text-orange-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">🏷️ 交易权限未解锁</p>
              <p className="text-xs text-text-secondary mt-1">
                还需 <span className="font-bold text-foreground">{TRADE_MIN_POINTS - userPoints}</span> 积分即可解锁交易发帖权限
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-text-secondary">当前</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-border rounded-full text-xs font-medium">
                  {currentLevel?.current?.icon} {currentLevelName}
                </span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-text-secondary" />
                <span className="text-xs text-text-secondary">目标</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-border rounded-full text-xs font-medium">
                  {targetLevel?.icon || '👑'} {targetLevel?.name || '车神'}
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all bg-orange-400"
                  style={{ width: `${Math.min((userPoints / TRADE_MIN_POINTS) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-text-secondary mt-1">
                {userPoints} / {TRADE_MIN_POINTS} 积分
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600">✅</span>
            <span className="text-sm font-medium text-emerald-700">交易权限已解锁</span>
          </div>
          <Link
            href={`/submit?community=${community.slug}&type=trade`}
            className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            <TagIcon className="w-3.5 h-3.5" />
            发布交易
          </Link>
        </div>
      )}

      {/* Trade posts list */}
      {tradePosts.length > 0 ? (
        <div className="space-y-3">
          {tradePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <p className="text-2xl mb-2">🏪</p>
          <p className="text-text-secondary mb-1">交易区暂无帖子</p>
          <p className="text-xs text-text-secondary">
            {canTrade ? '成为第一个发布交易帖的人吧！' : `积累 ${TRADE_MIN_POINTS} 积分解锁交易权限`}
          </p>
        </div>
      )}
    </div>
  );
}

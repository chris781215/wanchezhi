'use client';

import { getBadgeLevel } from '@/lib/utils';
import { useState } from 'react';

interface AvatarProps {
  nickname: string;
  points: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function Avatar({ nickname, points, size = 'md' }: AvatarProps) {
  const badge = getBadgeLevel(points);
  const levelName = badge.current.name;

  // Determine frame style based on level
  const frameClass = (() => {
    switch (levelName) {
      case '赛车手':
        return 'ring-2 ring-gray-400';
      case '车神':
        return 'ring-2 ring-amber-400 ring-offset-1 ring-offset-white';
      case '传奇':
        return 'ring-2 ring-transparent bg-clip-padding';
      default:
        return '';
    }
  })();

  // Size classes
  const sizeClasses = {
    xs: 'w-5 h-5 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
  };

  const badgeSizeClasses = {
    xs: 'w-3 h-3 text-[6px]',
    sm: 'w-3.5 h-3.5 text-[7px]',
    md: 'w-4 h-4 text-[8px]',
    lg: 'w-5 h-5 text-[10px]',
  };

  const badgeOffset = {
    xs: '-bottom-0.5 -right-0.5',
    sm: '-bottom-0.5 -right-0.5',
    md: '-bottom-0.5 -right-0.5',
    lg: '-bottom-1 -right-1',
  };

  const hasFrame = levelName === '赛车手' || levelName === '车神' || levelName === '传奇';
  const hasBadge = levelName !== '新手上路';

  return (
    <div className="relative inline-block shrink-0">
      {/* Avatar container with optional frame */}
      <div
        className={`
          ${sizeClasses[size]} rounded-full flex items-center justify-center
          bg-gradient-to-br from-primary/20 to-primary/40
          ${hasFrame ? frameClass : ''}
          ${levelName === '传奇' ? 'avatar-frame-legend' : ''}
        `}
      >
        <span className="font-bold text-primary">
          {nickname[0]}
        </span>
      </div>

      {/* Level badge (corner) */}
      {hasBadge && (
        <div
          className={`
            absolute ${badgeOffset[size]}
            ${badgeSizeClasses[size]} rounded-full
            bg-white border border-border shadow-sm
            flex items-center justify-center
            leading-none
          `}
        >
          {badge.current.icon}
        </div>
      )}

      {/* Legend frame glow effect (CSS animation) */}
      {levelName === '传奇' && (
        <div className="absolute inset-0 rounded-full avatar-frame-glow pointer-events-none" />
      )}
    </div>
  );
}

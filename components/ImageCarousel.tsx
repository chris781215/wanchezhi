'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import BrandLogo from '@/components/BrandLogo';

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
const UpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);
const CommentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

interface HeroCarouselProps {
  posts: Post[];
}

export default function HeroCarousel({ posts }: HeroCarouselProps) {
  const heroPosts = [...posts]
    .filter((p) => p.type === 'IMAGE' && p.images && p.images.length > 0)
    .sort((a, b) => b.voteScore - a.voteScore)
    .slice(0, 8);

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = heroPosts.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next, total]);

  if (total === 0) return null;

  const post = heroPosts[current];
  const imgCount = post.images?.length || 0;

  return (
    <div
      className="relative rounded-xl overflow-hidden mb-4 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Link href={`/w/${post.community?.slug || 'all'}/post/${post.id}`} className="block relative">
        {/* Image - fixed height container, image centered at natural ratio */}
        <div className="w-full h-64 sm:h-80 md:h-96 bg-secondary relative flex items-center justify-center">
          {imgCount > 0 && (
            <img
              src={post.images![0]}
              alt={post.title}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            {post.community && <BrandLogo brand={post.community.brand} size="sm" />}
            <span className="text-white/90 text-xs font-medium">w/{post.community?.displayName}</span>
            <span className="text-white/40">·</span>
            <span className="text-white/70 text-xs">{post.author?.nickname}</span>
          </div>
          <h2 className="text-white font-bold text-lg sm:text-xl leading-tight mb-2 line-clamp-2">
            {post.title}
          </h2>
          <div className="flex items-center gap-4 text-white/70 text-xs">
            <span className="flex items-center gap-1">
              <UpIcon className="w-3.5 h-3.5" />
              <span className="font-bold text-white/90">{post.voteScore}</span> 赞
            </span>
            <span className="flex items-center gap-1">
              <CommentIcon className="w-3.5 h-3.5" />
              <span>{post.commentCount} 评论</span>
            </span>
            {imgCount > 1 && <span>📷 {imgCount} 张图片</span>}
          </div>
        </div>
      </Link>

      {/* Arrows */}
      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev(); }}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); next(); }}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {heroPosts.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(idx); }}
              className={`carousel-dot h-1.5 rounded-full transition-all ${idx === current ? 'bg-white w-5' : 'bg-white/40 hover:bg-white/70 w-1.5'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

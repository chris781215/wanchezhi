'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { useState, useEffect } from 'react';
import BrandLogo from '@/components/BrandLogo';
import Avatar from '@/components/Avatar';
import { useAuth } from '@/lib/auth-context';

// Inline SVG icons
const HeartIcon = ({ className, fill }: { className?: string; fill?: string }) => (
  <svg className={className} fill={fill || 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={fill ? 0 : 2}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);
const BrokenHeartIcon = ({ className, fill }: { className?: string; fill?: string }) => (
  <svg className={className} fill={fill || 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={fill ? 0 : 2}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    <path d="M13.5 5.5L11 10l3 2-2.5 4" stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinecap="round"/>
  </svg>
);
const CommentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);
const BookmarkIcon = ({ className, fill }: { className?: string; fill?: string }) => (
  <svg className={className} fill={fill || 'none'} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);
const ShareIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);
const TagIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

interface PostCardProps {
  post: Post;
  rank?: number;
}

export default function PostCard({ post, rank }: PostCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [vote, setVote] = useState(post.userVote || 0);
  const [score, setScore] = useState(post.voteScore);
  const [bookmarked, setBookmarked] = useState(post.userBookmarked || false);
  const [bookmarkCount, setBookmarkCount] = useState(post.bookmarkCount || 0);

  // Load persisted vote and bookmark state from API
  useEffect(() => {
    if (!user) return;
    fetch(`/api/votes?targetId=${post.id}&targetType=post&userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVote(data.data.userVote || 0);
          setScore(data.data.score || 0);
        }
      })
      .catch(() => {});
    fetch(`/api/bookmarks?postId=${post.id}&userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBookmarked(data.data.bookmarked || false);
          setBookmarkCount(data.data.count || 0);
        }
      })
      .catch(() => {});
  }, [post.id, user]);

  const handleVote = async (e: React.MouseEvent, value: number) => {
    e.stopPropagation();
    if (!user) return;
    const newValue = vote === value ? 0 : value;
    // Optimistic update
    const oldDiff = vote > 0 ? 3 : vote < 0 ? -1 : 0;
    const newDiff = newValue > 0 ? 3 : newValue < 0 ? -1 : 0;
    setScore(score - oldDiff + newDiff);
    setVote(newValue);
    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, targetId: post.id, targetType: 'post', value: newValue }),
      });
      const data = await res.json();
      if (data.success) {
        setScore(data.data.score);
        setVote(data.data.userVote);
      }
    } catch {
      // revert on error
      setScore(score + oldDiff - newDiff);
      setVote(vote);
    }
  };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    const newBookmarked = !bookmarked;
    // Optimistic update
    setBookmarked(newBookmarked);
    setBookmarkCount(bookmarkCount + (newBookmarked ? 1 : -1));
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, postId: post.id, action: newBookmarked ? 'add' : 'remove' }),
      });
      const data = await res.json();
      if (data.success) {
        setBookmarked(data.data.bookmarked);
        setBookmarkCount(data.data.count);
      }
    } catch {
      // revert on error
      setBookmarked(bookmarked);
      setBookmarkCount(bookmarkCount);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/w/${post.community?.slug || 'all'}/post/${post.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('链接已复制');
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    router.push(`/w/${post.community?.slug || 'all'}/post/${post.id}`);
  };

  const hasImages = post.type === 'IMAGE' && post.images && post.images.length > 0;

  return (
    <article onClick={handleClick} className="bg-white border border-border rounded-lg hover:border-primary/30 transition-colors cursor-pointer">
      <div>
        {/* Content */}
        <div className="p-3 min-w-0 text-center">
          {/* Meta info */}
          <div className="flex items-center justify-center gap-3 text-base text-text-secondary mb-2 flex-wrap">
            {post.community && (
              <>
                <BrandLogo brand={post.community.brand} size="md" />
                <Link href={`/w/${post.community.slug}`} className="font-bold text-xl text-foreground hover:text-primary" onClick={(e) => e.stopPropagation()}>
                  w/{post.community.displayName}
                </Link>
              </>
            )}
            <span className="text-text-secondary/60">·</span>
            {post.author && (
              <>
                <Link href={`/u/${post.author.username}`} onClick={(e) => e.stopPropagation()}>
                  <Avatar nickname={post.author.nickname} points={post.author.points} size="md" />
                </Link>
                <Link href={`/u/${post.author.username}`} className="hover:text-primary font-medium text-xl" onClick={(e) => e.stopPropagation()}>
                  {post.author.nickname}
                </Link>
              </>
            )}
            <span className="text-text-secondary/60">·</span>
            <span>{formatRelativeTime(post.createdAt)}</span>
          </div>

          {/* Trade tag + Price */}
          {post.type === 'TRADE' && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 border border-orange-200">
                <TagIcon className="w-3 h-3" />
                交易
              </span>
              {post.price && (
                <span className="text-lg font-bold text-orange-600">
                  ¥{Number(post.price).toLocaleString()}
                </span>
              )}
            </div>
          )}

          {/* Content text */}
          {post.content && (
            <p className="text-base text-foreground mb-3 whitespace-pre-wrap leading-relaxed">
              {post.content.replace(/[#*`\[\]]/g, '')}
            </p>
          )}

          {/* Images */}
          {hasImages && (
            <div className={`mb-3 justify-center ${post.images!.length === 1 ? 'flex' : 'flex flex-wrap gap-1.5'}`}>
              {post.images!.length === 1 ? (
                /* Single image: show large, vertical images stretch tall */
                <div className="rounded-lg overflow-hidden bg-secondary max-w-full">
                  <img
                    src={post.images![0]}
                    alt=""
                    className="max-w-full h-auto max-h-[500px] object-contain"
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      const ratio = img.naturalHeight / img.naturalWidth;
                      if (ratio > 1.3) {
                        img.className = 'w-full max-h-[600px] object-contain';
                      }
                    }}
                  />
                </div>
              ) : (
                /* Multiple images: grid layout */
                <>
                  {post.images!.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="rounded-md overflow-hidden bg-secondary shrink-0" style={{ width: post.images!.length === 2 ? '48%' : '32%' }}>
                      <img src={img} alt="" className="w-full h-28 object-cover" />
                    </div>
                  ))}
                  {post.images!.length > 4 && (
                    <div className="h-28 w-1/4 rounded-md bg-black/50 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      +{post.images!.length - 4}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Link preview */}
          {post.type === 'LINK' && post.url && (
            <div className="inline-flex items-center gap-1 text-sm text-primary mb-3">
              {post.url.replace(/^https?:\/\//, '').slice(0, 50)}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            {/* Mobile vote */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => handleVote(e, 1)}
                className={`vote-btn ${vote > 0 ? 'text-upvote' : ''}`}
              >
                <HeartIcon className="w-5 h-5" fill={vote > 0 ? 'currentColor' : 'none'} />
              </button>
              <span className={`font-bold ${vote > 0 ? 'text-upvote' : vote < 0 ? 'text-downvote' : ''}`}>
                {score}
              </span>
              <button
                onClick={(e) => handleVote(e, -1)}
                className={`vote-btn ${vote < 0 ? 'text-downvote' : ''}`}
              >
                <BrokenHeartIcon className="w-5 h-5" fill={vote < 0 ? 'currentColor' : 'none'} />
              </button>
            </div>

            <Link href={`/w/${post.community?.slug || 'all'}/post/${post.id}#comments`} className="flex items-center gap-1 hover:text-foreground" onClick={(e) => e.stopPropagation()}>
              <CommentIcon className="w-4 h-4" />
              <span>{post.commentCount} 评论</span>
            </Link>

            <button
              onClick={handleBookmark}
              className={`flex items-center gap-1 hover:text-foreground ${bookmarked ? 'text-primary' : ''}`}
            >
              <BookmarkIcon className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
              <span>{bookmarkCount}</span>
            </button>

            <button onClick={handleShare} className="flex items-center gap-1 hover:text-foreground">
              <ShareIcon className="w-4 h-4" />
              <span className="hidden sm:inline">分享</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

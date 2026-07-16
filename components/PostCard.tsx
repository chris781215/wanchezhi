'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';
import { formatRelativeTime, truncateText } from '@/lib/utils';
import { useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import Avatar from '@/components/Avatar';

// Inline SVG icons
const UpIcon = ({ className, fill }: { className?: string; fill?: string }) => (
  <svg className={className} fill={fill || 'none'} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);
const DownIcon = ({ className, fill }: { className?: string; fill?: string }) => (
  <svg className={className} fill={fill || 'none'} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
  const [vote, setVote] = useState(post.userVote || 0);
  const [score, setScore] = useState(post.voteScore);
  const [bookmarked, setBookmarked] = useState(post.userBookmarked || false);

  const handleVote = (e: React.MouseEvent, value: number) => {
    e.stopPropagation();
    if (vote === value) {
      setScore(score - (value > 0 ? 3 : -1));
      setVote(0);
    } else {
      const diff = value > 0 ? 3 : -1;
      const oldDiff = vote > 0 ? 3 : vote < 0 ? -1 : 0;
      setScore(score - oldDiff + diff);
      setVote(value);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
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
      <div className="flex">
        {/* Vote column */}
        <div className="hidden sm:flex flex-col items-center py-3 px-2 justify-between">
          {/* Up arrow (top) */}
          <button
            onClick={(e) => handleVote(e, 1)}
            className={`vote-btn rounded hover:bg-secondary transition-all ${
              vote > 0
                ? 'text-upvote'
                : rank !== undefined && rank < 3
                  ? 'text-amber-500 hot-vote-glow'
                  : 'text-text-secondary'
            }`}
          >
            <UpIcon className="w-6 h-6" fill={vote > 0 ? 'currentColor' : 'none'} />
          </button>
          {/* Score (center) */}
          <span className={`text-xs font-bold ${vote > 0 ? 'text-upvote' : vote < 0 ? 'text-downvote' : 'text-foreground'}`}>
            {score}
          </span>
          {/* Down arrow (bottom) */}
          <button
            onClick={(e) => handleVote(e, -1)}
            className={`vote-btn rounded hover:bg-secondary ${vote < 0 ? 'text-downvote' : 'text-text-secondary'}`}
          >
            <DownIcon className="w-6 h-6" fill={vote < 0 ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 min-w-0">
          {/* Meta info */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-2">
            {post.community && (
              <>
                <BrandLogo brand={post.community.brand} size="sm" />
                <Link href={`/w/${post.community.slug}`} className="font-bold text-foreground hover:text-primary" onClick={(e) => e.stopPropagation()}>
                  w/{post.community.displayName}
                </Link>
              </>
            )}
            <span className="text-text-secondary/60">·</span>
            {post.author && (
              <>
                <Link href={`/u/${post.author.username}`} onClick={(e) => e.stopPropagation()}>
                  <Avatar nickname={post.author.nickname} points={post.author.points} size="xs" />
                </Link>
                <Link href={`/u/${post.author.username}`} className="hover:text-primary font-medium" onClick={(e) => e.stopPropagation()}>
                  {post.author.nickname}
                </Link>
              </>
            )}
            <span className="text-text-secondary/60">·</span>
            <span>{formatRelativeTime(post.createdAt)}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold mb-2 line-clamp-2">
            {post.type === 'TRADE' && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold mr-1.5 align-middle bg-orange-100 text-orange-700 border border-orange-200">
                <TagIcon className="w-3 h-3" />
                交易
              </span>
            )}
            {post.title}
          </h3>

          {/* Price tag for trade posts */}
          {post.type === 'TRADE' && post.price && (
            <div className="flex items-center gap-1 mb-3">
              <span className="text-lg font-bold text-orange-600">
                ¥{Number(post.price).toLocaleString()}
              </span>
            </div>
          )}

          {/* Content preview */}
          {post.content && (
            <p className="text-sm text-text-secondary mb-3 line-clamp-3">
              {truncateText(post.content.replace(/[#*`\[\]]/g, ''), 200)}
            </p>
          )}

          {/* Image thumbnails */}
          {hasImages && (
            <div className="flex gap-1.5 mb-3">
              {post.images!.slice(0, 3).map((img, idx) => (
                <div key={idx} className="w-20 h-16 rounded-md overflow-hidden bg-secondary shrink-0">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              {post.images!.length > 3 && (
                <div className="w-20 h-16 rounded-md bg-black/50 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  +{post.images!.length - 3}
                </div>
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
          <div className="flex items-center gap-4 text-xs text-text-secondary">
            {/* Mobile vote */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={(e) => handleVote(e, 1)}
                className={`vote-btn ${vote > 0 ? 'text-upvote' : ''}`}
              >
                <UpIcon className="w-5 h-5" fill={vote > 0 ? 'currentColor' : 'none'} />
              </button>
              <span className={`font-bold ${vote > 0 ? 'text-upvote' : vote < 0 ? 'text-downvote' : ''}`}>
                {score}
              </span>
              <button
                onClick={(e) => handleVote(e, -1)}
                className={`vote-btn ${vote < 0 ? 'text-downvote' : ''}`}
              >
                <DownIcon className="w-5 h-5" fill={vote < 0 ? 'currentColor' : 'none'} />
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
              <span>{post.bookmarkCount}</span>
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

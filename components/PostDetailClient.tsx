'use client';

import { useState } from 'react';
import { mockPosts, mockComments } from '@/lib/mock-data';
import CommentTree from '@/components/CommentTree';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);
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

export default function PostDetailClient({ postId }: { postId: string }) {
  const post = mockPosts.find((p) => p.id === postId);
  const comments = mockComments.filter((c) => c.postId === postId);
  const router = useRouter();

  const [vote, setVote] = useState(0);
  const [score, setScore] = useState(post?.voteScore || 0);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [submitting, setSubmitting] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const handleVote = (value: number) => {
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

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post?.title, url });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('链接已复制');
    }
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText, postId: postId }),
      });
      const data = await res.json();
      if (data.success) {
        setCommentText('');
        setCommentList([...commentList, data.data]);
      }
    } catch (err) {
      console.error('Submit comment error:', err);
    }
    setSubmitting(false);
  };

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">帖子不存在</h1>
        <Link href="/" className="text-primary hover:underline">返回首页</Link>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Sticky top bar with close button */}
      <div className="sticky top-12 z-40 flex items-center justify-between mb-3 -mx-3 md:-mx-4 px-3 md:px-4 py-2 bg-secondary/95 backdrop-blur-sm">
        <button
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push('/');
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <CloseIcon className="w-4 h-4" />
          <span>关闭</span>
        </button>
      </div>

      {/* Post content */}
      <article className="bg-white border border-border rounded-lg overflow-hidden mb-4">
        <div className="p-4">
          {/* Community & author info */}
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
            {post.community && (
              <>
                <BrandLogo brand={post.community.brand} size="sm" />
                <Link href={`/w/${post.community.slug}`} className="font-bold text-foreground hover:text-primary shrink-0">
                  w/{post.community.displayName}
                </Link>
              </>
            )}
            <span className="shrink-0 text-text-secondary/60">·</span>
            {post.author && (
              <>
                <Link href={`/u/${post.author?.username}`}>
                  <Avatar nickname={post.author.nickname} points={post.author.points} size="sm" />
                </Link>
                <Link href={`/u/${post.author?.username}`} className="font-bold text-foreground hover:text-primary shrink-0">
                  {post.author?.nickname}
                </Link>
              </>
            )}
            <span className="shrink-0 text-text-secondary/60">·</span>
            <span className="shrink-0">{formatRelativeTime(post.createdAt)}</span>
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold mb-4">
            {post.type === 'TRADE' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold mr-2 align-middle bg-orange-100 text-orange-700 border border-orange-200">
                🏷️ 交易帖
              </span>
            )}
            {post.title}
          </h1>

          {/* Trade info block */}
          {post.type === 'TRADE' && (
            <div className="mb-4 p-4 rounded-lg border-2 bg-orange-50 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-secondary mb-1">交易帖</p>
                  <p className="text-sm font-bold text-orange-700">闲置物品 / 整车出售</p>
                </div>
                {post.price && (
                  <div className="text-right">
                    <p className="text-xs text-text-secondary mb-1">价格</p>
                    <p className="text-2xl font-bold text-orange-600">
                      ¥{Number(post.price).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          {post.content && (
            <div className="prose prose-sm max-w-none mb-4 whitespace-pre-wrap">
              {post.content}
            </div>
          )}

          {/* Images carousel */}
          {post.type === 'IMAGE' && post.images && post.images.length > 0 && (() => {
            const imgs = post.images!;
            return (
              <div className="relative rounded-lg overflow-hidden mb-4 group bg-secondary">
                <div className="w-full h-64 sm:h-80 md:h-96 relative flex items-center justify-center">
                  <img src={imgs[imgIndex]} alt={`图片 ${imgIndex + 1}`} className="max-w-full max-h-full object-contain" />
                </div>
                {/* Arrows */}
                {imgs.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIndex((imgIndex - 1 + imgs.length) % imgs.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setImgIndex((imgIndex + 1) % imgs.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </>
                )}
                {/* Counter */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 rounded text-white text-xs font-medium">
                  {imgIndex + 1} / {imgs.length}
                </div>
                {/* Dots */}
                {imgs.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {imgs.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`carousel-dot h-1.5 rounded-full transition-all ${idx === imgIndex ? 'bg-white w-5' : 'bg-white/40 hover:bg-white/70 w-1.5'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Link preview */}
          {post.type === 'LINK' && post.url && (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm text-primary hover:bg-secondary/80 mb-4"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              {post.url.replace(/^https?:\/\//, '').slice(0, 60)}
            </a>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-3 border-t border-border text-sm text-text-secondary">
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleVote(1)}
                className={`vote-btn rounded hover:bg-secondary ${vote > 0 ? 'text-upvote' : ''}`}
              >
                <UpIcon className="w-6 h-6" fill={vote > 0 ? 'currentColor' : 'none'} />
              </button>
              <span className={`font-bold px-1 ${vote > 0 ? 'text-upvote' : vote < 0 ? 'text-downvote' : ''}`}>
                {score}
              </span>
              <button
                onClick={() => handleVote(-1)}
                className={`vote-btn rounded hover:bg-secondary ${vote < 0 ? 'text-downvote' : ''}`}
              >
                <DownIcon className="w-6 h-6" fill={vote < 0 ? 'currentColor' : 'none'} />
              </button>
            </div>

            <span className="flex items-center gap-1">
              <CommentIcon className="w-4 h-4" />
              {post.commentCount} 评论
            </span>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-1 hover:text-foreground ${bookmarked ? 'text-primary' : ''}`}
            >
              <BookmarkIcon className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
              {bookmarked ? '已收藏' : '收藏'}
            </button>

            <button onClick={handleShare} className="flex items-center gap-1 hover:text-foreground">
              <ShareIcon className="w-4 h-4" />
              分享
            </button>
          </div>
        </div>
      </article>

      {/* Comment input */}
      <div className="bg-white border border-border rounded-lg p-4 mb-4">
        <textarea
          placeholder="写下你的评论..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full p-3 text-sm border border-border rounded-lg focus:outline-none focus:border-primary resize-none"
          rows={4}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmitComment}
            disabled={submitting || !commentText.trim()}
            className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover disabled:opacity-50"
          >
            {submitting ? '提交中...' : '发表评论'}
          </button>
        </div>
      </div>

      {/* Comments */}
      <div id="comments" className="bg-white border border-border rounded-lg p-4">
        <h2 className="font-semibold mb-4">评论 ({commentList.length})</h2>
        <CommentTree comments={commentList} />
      </div>
    </div>
  );
}

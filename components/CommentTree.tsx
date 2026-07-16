'use client';

import { Comment } from '@/types';
import { formatRelativeTime, getBadgeLevel } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

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
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const ReplyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
  </svg>
);

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  allComments: Comment[];
}

function CommentItem({ comment, depth = 0, allComments }: CommentItemProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [vote, setVote] = useState(comment.userVote || 0);
  const [score, setScore] = useState(comment.voteScore);
  const [showReply, setShowReply] = useState(false);

  const children = allComments.filter((c) => c.parentId === comment.id);

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

  return (
    <div className={`${depth > 0 ? 'ml-4 pl-3 border-l-2 border-border' : ''}`}>
      <div className="py-2">
        {/* Comment header */}
        <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
          <Link href={`/u/${comment.author?.username}`} className="flex items-center gap-1 font-medium text-foreground hover:text-primary">
            {comment.author?.nickname || '匿名'}
            {comment.author && (
              <span className="text-[10px] leading-none">{getBadgeLevel(comment.author.points).current.icon}</span>
            )}
          </Link>
          <span>·</span>
          <span>{formatRelativeTime(comment.createdAt)}</span>
          {children.length > 0 && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-1 hover:text-foreground"
            >
              {collapsed ? <ChevronRightIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}
              <span>{children.length} 条回复</span>
            </button>
          )}
        </div>

        {/* Comment content */}
        {!collapsed && (
          <>
            <p className="text-sm mb-2 whitespace-pre-wrap">{comment.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <button
                onClick={() => handleVote(1)}
                className={`vote-btn ${vote > 0 ? 'text-upvote' : ''}`}
              >
                <UpIcon className="w-4 h-4" fill={vote > 0 ? 'currentColor' : 'none'} />
              </button>
              <span className={`font-bold ${vote > 0 ? 'text-upvote' : vote < 0 ? 'text-downvote' : ''}`}>
                {score}
              </span>
              <button
                onClick={() => handleVote(-1)}
                className={`vote-btn ${vote < 0 ? 'text-downvote' : ''}`}
              >
                <DownIcon className="w-4 h-4" fill={vote < 0 ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => setShowReply(!showReply)}
                className="flex items-center gap-1 hover:text-foreground ml-2"
              >
                <ReplyIcon className="w-3 h-3" />
                <span>回复</span>
              </button>
            </div>

            {/* Reply input */}
            {showReply && (
              <div className="mt-2">
                <textarea
                  placeholder="写下你的回复..."
                  className="w-full p-2 text-sm border border-border rounded-lg focus:outline-none focus:border-primary resize-none"
                  rows={3}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setShowReply(false)}
                    className="px-3 py-1 text-xs text-text-secondary hover:text-foreground"
                  >
                    取消
                  </button>
                  <button className="px-3 py-1 text-xs bg-primary text-white rounded-full hover:bg-primary-hover">
                    回复
                  </button>
                </div>
              </div>
            )}

            {/* Children */}
            {children.length > 0 && (
              <div className="mt-1">
                {children.map((child) => (
                  <CommentItem
                    key={child.id}
                    comment={child}
                    depth={depth + 1}
                    allComments={allComments}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface CommentTreeProps {
  comments: Comment[];
}

export default function CommentTree({ comments }: CommentTreeProps) {
  const rootComments = comments.filter((c) => !c.parentId);

  return (
    <div className="space-y-1">
      {rootComments.length === 0 ? (
        <p className="text-center text-text-secondary py-8">暂无评论，来发表第一条评论吧</p>
      ) : (
        rootComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} allComments={comments} />
        ))
      )}
    </div>
  );
}
